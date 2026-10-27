import json
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from pydantic import BaseModel
from ..database import get_db
from ..models import Product, Category, TrainingModule, BlogPost, Lead
from ..schemas import ProductCreate, ProductOut, TrainingModuleCreate, TrainingModuleOut, BlogPostCreate, BlogPostOut, LeadOut
from ..scraper import sync_middleby_catalog

router = APIRouter(prefix="/api/admin", tags=["CMS & Admin"])

@router.get("/stats")
def get_admin_stats(db: Session = Depends(get_db)):
    products_count = db.query(Product).count()
    categories_count = db.query(Category).count()
    training_count = db.query(TrainingModule).count()
    blogs_count = db.query(BlogPost).count()
    leads_count = db.query(Lead).count()
    new_leads = db.query(Lead).filter(Lead.status == "new").count()

    recent_leads = db.query(Lead).order_by(Lead.created_at.desc()).limit(5).all()

    return {
        "products_count": products_count,
        "categories_count": categories_count,
        "training_count": training_count,
        "blogs_count": blogs_count,
        "leads_count": leads_count,
        "new_leads_count": new_leads,
        "recent_leads": recent_leads
    }

# PRODUCT MANAGEMENT
@router.post("/products", response_model=ProductOut)
def admin_create_product(prod: ProductCreate, db: Session = Depends(get_db)):
    existing = db.query(Product).filter(Product.slug == prod.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Product slug already exists")

    new_prod = Product(
        name=prod.name,
        slug=prod.slug,
        model=prod.model,
        category_slug=prod.category_slug,
        brand=prod.brand or "ChefMachines",
        description=prod.description,
        features=json.dumps(prod.features) if prod.features else "[]",
        specs=json.dumps(prod.specs) if prod.specs else "{}",
        price_estimate=prod.price_estimate or 0.0,
        is_rfq_only=prod.is_rfq_only,
        image_url=prod.image_url,
        additional_images=json.dumps(prod.additional_images) if prod.additional_images else "[]",
        brochure_url=prod.brochure_url,
        is_featured=prod.is_featured or False,
        is_active=prod.is_active if prod.is_active is not None else True
    )
    db.add(new_prod)
    db.commit()
    db.refresh(new_prod)

    # Format return
    return {
        "id": new_prod.id,
        "name": new_prod.name,
        "slug": new_prod.slug,
        "model": new_prod.model,
        "category_slug": new_prod.category_slug,
        "brand": new_prod.brand,
        "description": new_prod.description,
        "features": json.loads(new_prod.features) if new_prod.features else [],
        "specs": json.loads(new_prod.specs) if new_prod.specs else {},
        "price_estimate": new_prod.price_estimate,
        "is_rfq_only": new_prod.is_rfq_only,
        "image_url": new_prod.image_url,
        "additional_images": json.loads(new_prod.additional_images) if new_prod.additional_images else [],
        "brochure_url": new_prod.brochure_url,
        "is_featured": new_prod.is_featured,
        "is_active": new_prod.is_active,
        "created_at": new_prod.created_at
    }

@router.put("/products/{id}", response_model=ProductOut)
def admin_update_product(id: int, prod: ProductCreate, db: Session = Depends(get_db)):
    target = db.query(Product).filter(Product.id == id).first()
    if not target:
        raise HTTPException(status_code=404, detail="Product not found")

    target.name = prod.name
    target.slug = prod.slug
    target.model = prod.model
    target.category_slug = prod.category_slug
    target.brand = prod.brand
    target.description = prod.description
    target.features = json.dumps(prod.features) if prod.features else "[]"
    target.specs = json.dumps(prod.specs) if prod.specs else "{}"
    target.price_estimate = prod.price_estimate
    target.is_rfq_only = prod.is_rfq_only
    target.image_url = prod.image_url
    target.additional_images = json.dumps(prod.additional_images) if prod.additional_images else "[]"
    target.brochure_url = prod.brochure_url
    target.is_featured = prod.is_featured
    target.is_active = prod.is_active

    db.commit()
    db.refresh(target)

    return {
        "id": target.id,
        "name": target.name,
        "slug": target.slug,
        "model": target.model,
        "category_slug": target.category_slug,
        "brand": target.brand,
        "description": target.description,
        "features": json.loads(target.features) if target.features else [],
        "specs": json.loads(target.specs) if target.specs else {},
        "price_estimate": target.price_estimate,
        "is_rfq_only": target.is_rfq_only,
        "image_url": target.image_url,
        "additional_images": json.loads(target.additional_images) if target.additional_images else [],
        "brochure_url": target.brochure_url,
        "is_featured": target.is_featured,
        "is_active": target.is_active,
        "created_at": target.created_at
    }

@router.delete("/products/{id}")
def admin_delete_product(id: int, db: Session = Depends(get_db)):
    p = db.query(Product).filter(Product.id == id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(p)
    db.commit()
    return {"success": True, "message": f"Product '{p.name}' deleted"}

# SCRAPER TRIGGER
class ScrapeTriggerRequest(BaseModel):
    max_categories: int = 10
    max_products_per_cat: int = 5

@router.post("/scrape-middleby")
def trigger_middleby_scrape(req: ScrapeTriggerRequest, db: Session = Depends(get_db)):
    try:
        stats = sync_middleby_catalog(db, max_categories=req.max_categories, max_products_per_category=req.max_products_per_cat)
        return {
            "status": "success",
            "message": "Middleby Celfrost catalog sync completed successfully",
            "stats": stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scraper error: {str(e)}")

# TRAINING MANAGEMENT
@router.post("/training", response_model=TrainingModuleOut)
def admin_create_training(tm: TrainingModuleCreate, db: Session = Depends(get_db)):
    new_tm = TrainingModule(
        title=tm.title,
        slug=tm.slug,
        level=tm.level,
        category=tm.category,
        duration=tm.duration,
        description=tm.description,
        syllabus=json.dumps(tm.syllabus) if tm.syllabus else "[]",
        certification=tm.certification,
        badge=tm.badge,
        image_url=tm.image_url,
        is_featured=tm.is_featured,
        is_active=tm.is_active
    )
    db.add(new_tm)
    db.commit()
    db.refresh(new_tm)
    return {
        "id": new_tm.id,
        "title": new_tm.title,
        "slug": new_tm.slug,
        "level": new_tm.level,
        "category": new_tm.category,
        "duration": new_tm.duration,
        "description": new_tm.description,
        "syllabus": json.loads(new_tm.syllabus) if new_tm.syllabus else [],
        "certification": new_tm.certification,
        "badge": new_tm.badge,
        "image_url": new_tm.image_url,
        "is_featured": new_tm.is_featured,
        "is_active": new_tm.is_active
    }

# BLOG MANAGEMENT
@router.post("/blogs", response_model=BlogPostOut)
def admin_create_blog(bp: BlogPostCreate, db: Session = Depends(get_db)):
    new_bp = BlogPost(
        title=bp.title,
        slug=bp.slug,
        excerpt=bp.excerpt,
        content=bp.content,
        category=bp.category,
        author=bp.author,
        read_time=bp.read_time,
        cover_image=bp.cover_image,
        is_published=bp.is_published
    )
    db.add(new_bp)
    db.commit()
    db.refresh(new_bp)
    return new_bp

# LEADS MANAGEMENT
@router.get("/leads", response_model=List[LeadOut])
def admin_list_leads(db: Session = Depends(get_db)):
    return db.query(Lead).order_by(Lead.created_at.desc()).all()

class LeadStatusUpdate(BaseModel):
    status: str # new, contacted, in_proposal, completed

@router.put("/leads/{id}/status")
def admin_update_lead_status(id: int, update: LeadStatusUpdate, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    lead.status = update.status
    db.commit()
    return {"success": True, "lead_id": lead.id, "new_status": lead.status}

# PHOTO & MEDIA UPLOADS TO PERSISTENT VOLUME
import os
import uuid
import re
import shutil
from fastapi import UploadFile, File
from ..database import UPLOADS_DIR

@router.post("/upload-image")
async def admin_upload_image(file: UploadFile = File(...)):
    """
    Uploads equipment photos to the persistent volume ($DATA_DIR/uploads)
    and returns a public accessible URL.
    """
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type '{file.content_type}'. Allowed formats: JPG, PNG, WEBP, GIF, SVG."
        )

    # Sanitize extension and base filename
    original_name = file.filename or "equipment.png"
    ext = os.path.splitext(original_name)[1].lower()
    if not ext:
        ext = ".png"

    clean_base = re.sub(r'[^a-zA-Z0-9_-]', '_', os.path.splitext(original_name)[0])[:30]
    unique_filename = f"{clean_base}_{uuid.uuid4().hex[:8]}{ext}"

    dest_path = os.path.join(UPLOADS_DIR, unique_filename)
    try:
        with open(dest_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save image to persistent volume: {str(e)}")

    return {
        "success": True,
        "filename": unique_filename,
        "image_url": f"/uploads/{unique_filename}"
    }
