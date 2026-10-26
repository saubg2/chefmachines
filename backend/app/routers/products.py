import json
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import Product, Category
from ..schemas import ProductOut, CategoryOut

router = APIRouter(prefix="/api/products", tags=["Products"])

def format_product(p: Product) -> dict:
    return {
        "id": p.id,
        "name": p.name,
        "slug": p.slug,
        "model": p.model,
        "category_slug": p.category_slug,
        "brand": p.brand,
        "description": p.description,
        "features": json.loads(p.features) if p.features else [],
        "specs": json.loads(p.specs) if p.specs else {},
        "price_estimate": p.price_estimate,
        "is_rfq_only": p.is_rfq_only,
        "image_url": p.image_url,
        "additional_images": json.loads(p.additional_images) if p.additional_images else [],
        "brochure_url": p.brochure_url,
        "is_featured": p.is_featured,
        "is_active": p.is_active,
        "created_at": p.created_at
    }

@router.get("", response_model=List[ProductOut])
def list_products(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    query = db.query(Product).filter(Product.is_active == True)
    if category:
        query = query.filter(Product.category_slug == category)
    if featured is not None:
        query = query.filter(Product.is_featured == featured)
    if search:
        search_fmt = f"%{search.lower()}%"
        query = query.filter(
            (Product.name.ilike(search_fmt)) |
            (Product.model.ilike(search_fmt)) |
            (Product.description.ilike(search_fmt)) |
            (Product.brand.ilike(search_fmt))
        )
    products = query.offset(skip).limit(limit).all()
    return [format_product(p) for p in products]

@router.get("/categories", response_model=List[CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    cats = db.query(Category).order_by(Category.sort_order).all()
    res = []
    for c in cats:
        cnt = db.query(Product).filter(Product.category_slug == c.slug, Product.is_active == True).count()
        res.append({
            "id": c.id,
            "name": c.name,
            "slug": c.slug,
            "image_url": c.image_url,
            "description": c.description,
            "sort_order": c.sort_order,
            "product_count": cnt
        })
    return res

@router.get("/{slug}", response_model=ProductOut)
def get_product(slug: str, db: Session = Depends(get_db)):
    prod = db.query(Product).filter(Product.slug == slug).first()
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    return format_product(prod)
