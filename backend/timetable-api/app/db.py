from motor.motor_asyncio import AsyncIOMotorClient
import app.config as config

# MongoDB connection string from environment/config
MONGODB_URL = config.settings.mongodb_url

# Global client and db objects
mongodb_client: AsyncIOMotorClient = None
mongodb_db = None

def get_db():
    return mongodb_db
