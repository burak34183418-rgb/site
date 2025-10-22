from fastapi import APIRouter, HTTPException, Depends
from typing import List
import uuid
from datetime import datetime

from models import ContactForm, ContactFormCreate
from database import contact_forms_collection
from auth import get_current_admin

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("/", response_model=ContactForm)
async def create_contact_form(contact: ContactFormCreate):
    """Submit a contact form (Public)"""
    contact_data = contact.dict()
    contact_data["id"] = str(uuid.uuid4())
    contact_data["created_at"] = datetime.utcnow()
    contact_data["is_read"] = False
    
    await contact_forms_collection.insert_one(contact_data)
    return ContactForm(**contact_data)

@router.get("/", response_model=List[ContactForm])
async def get_contact_forms(admin: dict = Depends(get_current_admin), is_read: bool = None):
    """Get all contact forms (Admin only)"""
    query = {}
    if is_read is not None:
        query["is_read"] = is_read
    
    contacts = await contact_forms_collection.find(query).sort("created_at", -1).to_list(1000)
    return [ContactForm(**contact) for contact in contacts]

@router.put("/{contact_id}/mark-read")
async def mark_contact_read(contact_id: str, admin: dict = Depends(get_current_admin)):
    """Mark a contact form as read (Admin only)"""
    result = await contact_forms_collection.update_one(
        {"id": contact_id},
        {"$set": {"is_read": True}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact form not found")
    return {"message": "Contact form marked as read"}

@router.delete("/{contact_id}")
async def delete_contact_form(contact_id: str, admin: dict = Depends(get_current_admin)):
    """Delete a contact form (Admin only)"""
    result = await contact_forms_collection.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact form not found")
    return {"message": "Contact form deleted successfully"}
