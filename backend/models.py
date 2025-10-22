from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict
from datetime import datetime
import uuid

# Category Model
class CategoryBase(BaseModel):
    name: Dict[str, str]  # Multi-language names {tr: '', en: '', ar: '', ru: ''}
    description: Dict[str, str]  # Multi-language descriptions
    slug: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    image: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "id": "cat-123",
                "name": {"tr": "Buhar Jeneratörü", "en": "Steam Generator"},
                "description": {"tr": "Profesyonel istim makinaları", "en": "Professional steam machines"},
                "slug": "steam-generator",
                "image": "/uploads/category-image.jpg"
            }
        }

# Product Model
class ProductBase(BaseModel):
    category_id: str
    name: Dict[str, str]  # Multi-language names
    description: Dict[str, str]  # Multi-language descriptions
    specs: Dict[str, str]  # Technical specifications
    features: Dict[str, List[str]]  # Multi-language features list
    price: Optional[str] = "Fiyat için iletişime geçin"
    is_active: bool = True

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    category_id: Optional[str] = None
    name: Optional[Dict[str, str]] = None
    description: Optional[Dict[str, str]] = None
    specs: Optional[Dict[str, str]] = None
    features: Optional[Dict[str, List[str]]] = None
    price: Optional[str] = None
    is_active: Optional[bool] = None
    images: Optional[List[str]] = None

class Product(ProductBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    images: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "id": "prod-123",
                "category_id": "cat-123",
                "name": {"tr": "GOLD 3.5 KW Buhar Jeneratörü", "en": "GOLD 3.5 KW Steam Generator"},
                "description": {"tr": "Kompakt ve güçlü", "en": "Compact and powerful"},
                "specs": {"power": "3.5 KW", "voltage": "220V"},
                "features": {"tr": ["Paslanmaz çelik"], "en": ["Stainless steel"]},
                "images": ["/uploads/product1.jpg"],
                "price": "Fiyat için iletişime geçin"
            }
        }

# Contact Form Model
class ContactFormBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    product_id: Optional[str] = None
    message: str

class ContactFormCreate(ContactFormBase):
    pass

class ContactForm(ContactFormBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_read: bool = False

# Admin User Model
class AdminUserBase(BaseModel):
    username: str
    email: EmailStr

class AdminUserCreate(AdminUserBase):
    password: str

class AdminUser(AdminUserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    hashed_password: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
