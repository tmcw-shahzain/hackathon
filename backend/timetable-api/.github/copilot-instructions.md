# FastAPI Timetable Project - Copilot Instructions

## Project Overview
This is a FastAPI-based timetable management system built with modern Python tooling.

## Project Structure
```
timetable-api/
├── app/
│   ├── main.py           # Main FastAPI application
│   ├── __init__.py
│   ├── models/           # Data models (for future use)
│   ├── routes/           # API routes (for future use)
│   └── schemas/          # Pydantic schemas (for future use)
├── tests/
│   ├── test_main.py      # Tests for main app
│   └── __init__.py
├── venv/                 # Virtual environment (gitignored)
├── pyproject.toml        # Project configuration
├── README.md            # Project documentation
└── .gitignore           # Git ignore rules
```

## Development Workflow

### Activation
Before any development work, activate the virtual environment:
```powershell
.\venv\Scripts\Activate.ps1
```

### Running the Server
Start the development server with auto-reload:
- Use the VS Code task "Run FastAPI Server"
- Or run: `uvicorn app.main:app --reload`
- API available at: http://localhost:8000
- Swagger docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Running Tests
```powershell
python -m pytest tests/ -v
python -m pytest tests/ -v --cov=app
```

### Code Quality
- Format: `black .`
- Lint: `flake8 .`
- Type check: `mypy .`

## Dependencies
- **fastapi**: Web framework
- **uvicorn**: ASGI server
- **pydantic**: Data validation
- **pytest**: Testing framework
- **black**: Code formatter
- **flake8**: Linter
- **mypy**: Type checker

## Key Endpoints
- `GET /`: Welcome message
- `GET /health`: Health check

## Adding New Features
1. Create route handlers in `app/routes/` (create if needed)
2. Define models in `app/models/` (create if needed)
3. Define schemas in `app/schemas/` (create if needed)
4. Add tests in `tests/test_*.py`
5. Run tests to verify
