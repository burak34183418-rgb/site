from fastapi import FastAPI, APIRouter
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path

# Import routes
from routes import products, categories, contact, auth as auth_routes
from database import init_db

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="GOLD Vakum Sistemleri API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "GOLD Vakum Sistemleri API", "version": "1.0.0"}

# Include all route modules
api_router.include_router(auth_routes.router)
api_router.include_router(categories.router)
api_router.include_router(products.router)
api_router.include_router(contact.router)

# Include the router in the main app
app.include_router(api_router)

# Mount uploads directory
uploads_dir = Path("/app/backend/uploads")
uploads_dir.mkdir(exist_ok=True)
app.mount("/api/uploads", StaticFiles(directory=str(uploads_dir)), name="uploads")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("🚀 Starting GOLD Vakum Sistemleri API...")
    await init_db()
    logger.info("✅ Database initialized successfully")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("👋 Shutting down GOLD Vakum Sistemleri API...")