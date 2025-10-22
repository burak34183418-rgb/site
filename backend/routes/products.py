from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from typing import List, Optional
from datetime import datetime
import uuid
import shutil
from pathlib import Path

from models import Product, ProductCreate, ProductUpdate
from database import products_collection, categories_collection
from auth import get_current_admin

router = APIRouter(prefix="/products", tags=["Products"])

# Upload directory
UPLOAD_DIR = Path("/app/backend/uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.get("/", response_model=List[Product])
async def get_products(category_id: Optional[str] = None, is_active: Optional[bool] = True):
    """Get all products, optionally filtered by category"""
    query = {}
    if category_id:
        query["category_id"] = category_id
    if is_active is not None:
        query["is_active"] = is_active
    
    products = await products_collection.find(query).to_list(1000)
    return [Product(**product) for product in products]

@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a single product by ID"""
    product = await products_collection.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)

@router.post("/", response_model=Product)
async def create_product(product: ProductCreate, admin: dict = Depends(get_current_admin)):
    """Create a new product (Admin only)"""
    # Verify category exists
    category = await categories_collection.find_one({"id": product.category_id})
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    # Create product
    product_data = product.dict()
    product_data["id"] = str(uuid.uuid4())
    product_data["images"] = []
    product_data["created_at"] = datetime.utcnow()
    product_data["updated_at"] = datetime.utcnow()
    
    await products_collection.insert_one(product_data)
    return Product(**product_data)

@router.put("/{product_id}", response_model=Product)
async def update_product(product_id: str, product_update: ProductUpdate, admin: dict = Depends(get_current_admin)):
    """Update a product (Admin only)"""
    existing_product = await products_collection.find_one({"id": product_id})
    if not existing_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Update only provided fields
    update_data = {k: v for k, v in product_update.dict(exclude_unset=True).items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    if update_data:
        await products_collection.update_one({"id": product_id}, {"$set": update_data})
    
    updated_product = await products_collection.find_one({"id": product_id})
    return Product(**updated_product)

@router.delete("/{product_id}")
async def delete_product(product_id: str, admin: dict = Depends(get_current_admin)):
    """Delete a product (Admin only)"""
    result = await products_collection.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

@router.post("/{product_id}/images")
async def upload_product_image(product_id: str, file: UploadFile = File(...), admin: dict = Depends(get_current_admin)):
    """Upload an image for a product (Admin only)"""
    # Check if product exists
    product = await products_collection.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Only images allowed.")
    
    # Save file
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{product_id}_{uuid.uuid4()}.{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Update product with new image
    image_url = f"/api/uploads/{unique_filename}"
    await products_collection.update_one(
        {"id": product_id},
        {"$push": {"images": image_url}, "$set": {"updated_at": datetime.utcnow()}}
    )
    
    return {"message": "Image uploaded successfully", "image_url": image_url}

@router.delete("/{product_id}/images/{image_index}")
async def delete_product_image(product_id: str, image_index: int, admin: dict = Depends(get_current_admin)):
    """Delete a specific image from a product (Admin only)"""
    product = await products_collection.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if image_index >= len(product.get("images", [])):
        raise HTTPException(status_code=404, detail="Image not found")
    
    # Remove image from database
    images = product.get("images", [])
    images.pop(image_index)
    
    await products_collection.update_one(
        {"id": product_id},
        {"$set": {"images": images, "updated_at": datetime.utcnow()}}
    )
    
    return {"message": "Image deleted successfully"}
