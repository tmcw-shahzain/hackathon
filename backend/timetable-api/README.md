# FastAPI Timetable API

A modern timetable management system built with FastAPI.

## Getting Started

### Prerequisites
- Python 3.8 or higher
- pip or poetry

### Installation

1. Install dependencies:
```bash
pip install -e .
```

For development dependencies:
```bash
pip install -e ".[dev]"
```

### Running the Server

Start the development server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Project Structure

```
timetable-api/
├── app/
│   ├── __init__.py
│   ├── main.py           # Main FastAPI application
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   └── schemas/          # Pydantic schemas
├── tests/                # Test files
├── pyproject.toml        # Project configuration
└── README.md            # This file
```

## Development

### Code Quality

Format code with Black:
```bash
black .
```

Run linting:
```bash
flake8 .
```

Run type checking:
```bash
mypy .
```

### Testing

Run tests:
```bash
pytest
```

With coverage:
```bash
pytest --cov=app
```

## License

MIT
