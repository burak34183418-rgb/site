from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Collections
categories_collection = db['categories']
products_collection = db['products']
contact_forms_collection = db['contact_forms']
admin_users_collection = db['admin_users']

async def init_db():
    """Initialize database with indexes and default data"""
    # Create indexes
    await products_collection.create_index("category_id")
    await products_collection.create_index("is_active")
    await categories_collection.create_index("slug", unique=True)
    await admin_users_collection.create_index("username", unique=True)
    await admin_users_collection.create_index("email", unique=True)
    
    # Check if default admin exists
    admin_exists = await admin_users_collection.find_one({"username": "admin"})
    if not admin_exists:
        from passlib.context import CryptContext
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        
        default_admin = {
            "id": "admin-default",
            "username": "admin",
            "email": "admin@goldvakum.com",
            "hashed_password": pwd_context.hash("admin123"),  # Default password
            "is_active": True,
        }
        await admin_users_collection.insert_one(default_admin)
        print("✅ Default admin created: username=admin, password=admin123")
