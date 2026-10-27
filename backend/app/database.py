import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

logger = logging.getLogger("database")

# 1. Determine Persistent Data Directory
# Priority:
# a) Explicit DATA_DIR environment variable
# b) /data if it exists (Railway persistent volume mount)
# c) Local development directory: ./backend/app/data
DATA_DIR = os.getenv("DATA_DIR")
if not DATA_DIR:
    if os.path.exists("/data") and os.access("/data", os.W_OK):
        DATA_DIR = "/data"
    else:
        DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "data"))

os.makedirs(DATA_DIR, exist_ok=True)

# 2. Determine Persistent Uploads Directory for Equipment Photos
UPLOADS_DIR = os.getenv("UPLOADS_DIR", os.path.join(DATA_DIR, "uploads"))
os.makedirs(UPLOADS_DIR, exist_ok=True)

# 3. Determine Database URL
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    db_file = os.path.join(DATA_DIR, "chefmachines.db")
    DATABASE_URL = f"sqlite:///{db_file}"

# Fix for Heroku/Railway Postgres URL format
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# SQLite specific connect_args
connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

logger.info(f"Database initialized with URL: {DATABASE_URL}")
logger.info(f"Uploads directory configured at: {UPLOADS_DIR}")

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
