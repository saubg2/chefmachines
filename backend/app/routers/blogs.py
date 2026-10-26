from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import BlogPost
from ..schemas import BlogPostOut

router = APIRouter(prefix="/api/blogs", tags=["Blogs & Resources"])

@router.get("", response_model=List[BlogPostOut])
def list_blogs(
    category: Optional[str] = None,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    query = db.query(BlogPost).filter(BlogPost.is_published == True)
    if category:
        query = query.filter(BlogPost.category == category)
    posts = query.order_by(BlogPost.created_at.desc()).offset(skip).limit(limit).all()
    return posts

@router.get("/{slug}", response_model=BlogPostOut)
def get_blog(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.slug == slug, BlogPost.is_published == True).first()
    if not post:
        raise HTTPException(status_code=404, detail="Article not found")
    return post
