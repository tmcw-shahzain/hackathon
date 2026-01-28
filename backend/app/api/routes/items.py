from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.item import Item, ItemCreate
from app.core.cosmos import container
import uuid

router = APIRouter()

@router.get("/items", response_model=List[Item])
async def get_items():
    items = list(container.read_all_items())
    return [Item(**item) for item in items]

@router.post("/items", response_model=Item)
async def create_item(item: ItemCreate):
    item_id = str(uuid.uuid4())
    item_data = {"id": item_id, **item.dict()}
    container.create_item(body=item_data)
    return Item(id=item_id, **item.dict())

@router.get("/items/{item_id}", response_model=Item)
async def get_item(item_id: str):
    try:
        item = container.read_item(item=item_id, partition_key=item_id)
        return Item(**item)
    except Exception:
        raise HTTPException(status_code=404, detail="Item not found")
