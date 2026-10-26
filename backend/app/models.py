import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Float
from .database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False, unique=True)
    slug = Column(String(150), nullable=False, unique=True, index=True)
    image_url = Column(String(500), nullable=True)
    description = Column(Text, nullable=True)
    sort_order = Column(Integer, default=0)

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False, unique=True, index=True)
    model = Column(String(150), nullable=True, index=True)
    category_slug = Column(String(150), nullable=False, index=True)
    brand = Column(String(150), default="ChefMachines")
    description = Column(Text, nullable=True)
    features = Column(Text, nullable=True) # JSON list string
    specs = Column(Text, nullable=True) # JSON dict string (dimensions, power, capacity, etc.)
    price_estimate = Column(Float, default=0.0)
    is_rfq_only = Column(Boolean, default=True)
    image_url = Column(String(500), nullable=True)
    additional_images = Column(Text, nullable=True) # JSON list
    brochure_url = Column(String(500), nullable=True)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class TrainingModule(Base):
    __tablename__ = "training_modules"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False, unique=True, index=True)
    level = Column(String(50), default="Intermediate") # Beginner, Intermediate, Advanced, Master
    category = Column(String(100), default="Barista & Beverage") # Barista, Combi Cooking, Bakery, Hygiene & HACCP, Tech Maintenance
    duration = Column(String(50), default="3 Days (18 Hours)")
    description = Column(Text, nullable=False)
    syllabus = Column(Text, nullable=True) # JSON list of modules / chapters
    certification = Column(String(200), default="ChefMachines Certified Commercial Specialist")
    badge = Column(String(100), default="Industry Recognized")
    image_url = Column(String(500), nullable=True)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False, unique=True, index=True)
    excerpt = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String(100), default="Kitchen Setup & Strategy")
    author = Column(String(100), default="ChefMachines Engineering Team")
    read_time = Column(String(30), default="5 min read")
    cover_image = Column(String(500), nullable=True)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class WizardPreset(Base):
    __tablename__ = "wizard_presets"

    id = Column(Integer, primary_key=True, index=True)
    concept_key = Column(String(100), nullable=False, unique=True, index=True)
    title = Column(String(200), nullable=False)
    subtitle = Column(String(300), nullable=True)
    description = Column(Text, nullable=True)
    tagline = Column(String(200), nullable=True)
    equipment_presets = Column(Text, nullable=False) # JSON list of equipment items for each size tier
    utility_estimates = Column(Text, nullable=True) # JSON load calculations
    base_budget_min = Column(Float, default=500000)
    base_budget_max = Column(Float, default=2500000)

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(150), nullable=False)
    email = Column(String(150), nullable=False)
    phone = Column(String(50), nullable=False)
    city = Column(String(100), nullable=True)
    business_name = Column(String(150), nullable=True)
    business_type = Column(String(100), nullable=True)
    inquiry_type = Column(String(100), default="general") # rfq, wizard, training, turnkey, consultation
    message = Column(Text, nullable=True)
    equipment_interest = Column(Text, nullable=True) # JSON list or string
    estimated_budget = Column(String(100), nullable=True)
    status = Column(String(50), default="new") # new, contacted, in_proposal, completed
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
