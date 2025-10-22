from fastapi import APIRouter, HTTPException, Depends
from typing import List
import uuid
from datetime import datetime

from models import Category, CategoryCreate
from database import categories_collection
from auth import get_current_admin

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.get("/", response_model=List[Category])
async def get_categories():
    """Get all categories"""
    categories = await categories_collection.find().to_list(100)
    return [Category(**cat) for cat in categories]

@router.get("/{category_id}", response_model=Category)
async def get_category(category_id: str):
    """Get a single category by ID"""
    category = await categories_collection.find_one({"id": category_id})
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return Category(**category)

@router.post("/", response_model=Category)
async def create_category(category: CategoryCreate, admin: dict = Depends(get_current_admin)):
    """Create a new category (Admin only)"""
    # Check if slug already exists
    existing = await categories_collection.find_one({"slug": category.slug})
    if existing:
        raise HTTPException(status_code=400, detail="Category with this slug already exists")
    
    category_data = category.dict()
    category_data["id"] = str(uuid.uuid4())
    category_data["created_at"] = datetime.utcnow()
    
    await categories_collection.insert_one(category_data)
    return Category(**category_data)

@router.put("/{category_id}", response_model=Category)
async def update_category(category_id: str, category_update: CategoryCreate, admin: dict = Depends(get_current_admin)):
    """Update a category (Admin only)"""
    existing = await categories_collection.find_one({"id": category_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Category not found")
    
    update_data = category_update.dict()
    await categories_collection.update_one({"id": category_id}, {"$set": update_data})
    
    updated = await categories_collection.find_one({"id": category_id})
    return Category(**updated)

@router.delete("/{category_id}")
async def delete_category(category_id: str, admin: dict = Depends(get_current_admin)):
    """Delete a category (Admin only)"""
    result = await categories_collection.delete_one({"id": category_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category deleted successfully"}
