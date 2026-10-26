from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

# Category Schemas
class CategoryBase(BaseModel):
    name: str
    slug: str
    image_url: Optional[str] = None
    description: Optional[str] = None
    sort_order: Optional[int] = 0

class CategoryCreate(CategoryBase):
    pass

class CategoryOut(CategoryBase):
    id: int
    product_count: Optional[int] = 0

    class Config:
        from_attributes = True

# Product Schemas
class ProductBase(BaseModel):
    name: str
    slug: str
    model: Optional[str] = None
    category_slug: str
    brand: Optional[str] = "ChefMachines"
    description: Optional[str] = None
    features: Optional[List[str]] = []
    specs: Optional[Dict[str, Any]] = {}
    price_estimate: Optional[float] = 0.0
    is_rfq_only: Optional[bool] = True
    image_url: Optional[str] = None
    additional_images: Optional[List[str]] = []
    brochure_url: Optional[str] = None
    is_featured: Optional[bool] = False
    is_active: Optional[bool] = True

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Training Module Schemas
class TrainingModuleBase(BaseModel):
    title: str
    slug: str
    level: str = "Intermediate"
    category: str = "Barista & Beverage"
    duration: str = "3 Days (18 Hours)"
    description: str
    syllabus: Optional[List[Dict[str, Any]]] = []
    certification: Optional[str] = "ChefMachines Certified Commercial Specialist"
    badge: Optional[str] = "Industry Recognized"
    image_url: Optional[str] = None
    is_featured: Optional[bool] = False
    is_active: Optional[bool] = True

class TrainingModuleCreate(TrainingModuleBase):
    pass

class TrainingModuleOut(TrainingModuleBase):
    id: int

    class Config:
        from_attributes = True

# Blog Post Schemas
class BlogPostBase(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    category: str = "Kitchen Setup & Strategy"
    author: str = "ChefMachines Engineering Team"
    read_time: str = "5 min read"
    cover_image: Optional[str] = None
    is_published: Optional[bool] = True

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostOut(BlogPostBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Lead / RFQ Schemas
class LeadCreate(BaseModel):
    full_name: str
    email: str
    phone: str
    city: Optional[str] = None
    business_name: Optional[str] = None
    business_type: Optional[str] = None
    inquiry_type: Optional[str] = "rfq"
    message: Optional[str] = None
    equipment_interest: Optional[Any] = None
    estimated_budget: Optional[str] = None

class LeadOut(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    city: Optional[str] = None
    business_name: Optional[str] = None
    business_type: Optional[str] = None
    inquiry_type: str
    message: Optional[str] = None
    equipment_interest: Optional[str] = None
    estimated_budget: Optional[str] = None
    status: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Calculator Schemas
class ColdRoomCalcInput(BaseModel):
    room_length_ft: float
    room_width_ft: float
    room_height_ft: float
    temperature_type: str = "chiller" # chiller (2 to 8 C) or freezer (-18 to -22 C)
    daily_turnover_kg: float = 300.0
    ambient_temp_c: float = 38.0

class CoffeeCalcInput(BaseModel):
    daily_cups: int = 250
    peak_hour_percentage: float = 35.0 # % of cups served in 2 morning peak hours
    drink_types: Optional[List[str]] = ["espresso", "cappuccino", "latte"]
    water_hardness_ppm: Optional[int] = 120

class HoodVentCalcInput(BaseModel):
    hood_length_ft: float
    hood_width_ft: float
    hood_type: str = "wall_canopy" # wall_canopy, island, double_island
    cooking_duty: str = "heavy" # light, medium, heavy, extra_heavy (solid fuel/charcoal)
