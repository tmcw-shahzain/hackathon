from motor.motor_asyncio import AsyncIOMotorClient
import app.config as config

mongodb_client: AsyncIOMotorClient = None
mongodb_db = None

def get_db():
    return mongodb_db
