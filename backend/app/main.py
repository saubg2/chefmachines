import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from .database import engine, Base, SessionLocal
from .seed_data import seed_initial_data
from .seed_brands_and_clients import seed_brands_and_equipment
from .routers import products, wizard, calculators, training, blogs, leads, admin

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables and seed default data
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_initial_data(db)
        seed_brands_and_equipment(db)
    finally:
        db.close()
    yield
    # Shutdown

app = FastAPI(
    title="ChefMachines API & CMS",
    description="Commercial Food Preparation & Commercial Kitchen Services Platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8000",
    "https://chefmachines.com",
    "https://www.chefmachines.com",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(products.router)
app.include_router(wizard.router)
app.include_router(calculators.router)
app.include_router(training.router)
app.include_router(blogs.router)
app.include_router(leads.router)
app.include_router(admin.router)

# Health check
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ChefMachines API",
        "pillars": [
            "Commercial Equipment Sales",
            "Turnkey Kitchen Solutions",
            "Barista & Manpower Training Academy",
            "Smart Kitchen Care & 24/7 AMC"
        ]
    }

# Mount Persistent Photo Uploads Directory
from .database import UPLOADS_DIR

if os.path.exists(UPLOADS_DIR):
    app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

# Production SPA static files mounting
FRONTEND_DIST = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../frontend/dist"))

if os.path.exists(FRONTEND_DIST):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file_path = os.path.join(FRONTEND_DIST, full_path)
        if full_path and os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(FRONTEND_DIST, "index.html"))
