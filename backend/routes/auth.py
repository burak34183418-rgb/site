from fastapi import APIRouter, HTTPException, status, Depends
from datetime import timedelta

from models import AdminLogin, Token
from auth import authenticate_admin, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_current_admin

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=Token)
async def login(credentials: AdminLogin):
    """Admin login endpoint"""
    admin = await authenticate_admin(credentials.username, credentials.password)
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": admin["username"]},
        expires_delta=access_token_expires
    )
    
    return Token(access_token=access_token, token_type="bearer")

@router.get("/me")
async def get_current_admin_info(admin: dict = Depends(get_current_admin)):
    """Get current admin information"""
    return {
        "id": admin["id"],
        "username": admin["username"],
        "email": admin["email"]
    }
