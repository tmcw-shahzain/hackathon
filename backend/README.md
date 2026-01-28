# FastAPI Boilerplate

A clean, production-ready FastAPI boilerplate project.

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── routes/
│   │       ├── health.py
│   │       └── items.py
│   ├── core/
│   │   └── config.py
│   ├── models/
│   │   └── item.py
│   ├── schemas/
│   │   └── item.py
│   └── main.py
├── requirements.txt
└── README.md
```

## Getting Started

### Prerequisites
- Python 3.8+
- pip

### Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Features

## Environment Variables

Create a `.env` file in the root directory:

```
PROJECT_NAME=FastAPI Boilerplate
DATABASE_URL=sqlite:///./test.db
COSMOS_ENDPOINT=your-cosmosdb-endpoint
COSMOS_KEY=your-cosmosdb-key
COSMOS_DATABASE=fastapi_db
COSMOS_CONTAINER=items

## API Endpoints

### Health Check
- `GET /api/health` - Returns server status

### Items
- `GET /api/items` - List all items
- `POST /api/items` - Create a new item
- `GET /api/items/{item_id}` - Get a specific item
