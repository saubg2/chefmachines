import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from ..database import get_db
from ..models import TrainingModule, Lead
from ..schemas import TrainingModuleOut

router = APIRouter(prefix="/api/training", tags=["Training Academy"])

class TrainingEnrollRequest(BaseModel):
    module_slug: str
    trainee_name: str
    email: str
    phone: str
    organization: Optional[str] = None
    attendee_count: int = 1
    notes: Optional[str] = None

def format_training(t: TrainingModule) -> dict:
    return {
        "id": t.id,
        "title": t.title,
        "slug": t.slug,
        "level": t.level,
        "category": t.category,
        "duration": t.duration,
        "description": t.description,
        "syllabus": json.loads(t.syllabus) if t.syllabus else [],
        "certification": t.certification,
        "badge": t.badge,
        "image_url": t.image_url,
        "is_featured": t.is_featured,
        "is_active": t.is_active
    }

@router.get("", response_model=List[TrainingModuleOut])
def list_training_modules(
    category: Optional[str] = None,
    featured: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    query = db.query(TrainingModule).filter(TrainingModule.is_active == True)
    if category:
        query = query.filter(TrainingModule.category == category)
    if featured is not None:
        query = query.filter(TrainingModule.is_featured == featured)
    modules = query.all()
    return [format_training(m) for m in modules]

@router.get("/{slug}", response_model=TrainingModuleOut)
def get_training_module(slug: str, db: Session = Depends(get_db)):
    m = db.query(TrainingModule).filter(TrainingModule.slug == slug).first()
    if not m:
        raise HTTPException(status_code=404, detail="Training module not found")
    return format_training(m)

@router.post("/enroll")
def enroll_training(req: TrainingEnrollRequest, db: Session = Depends(get_db)):
    module = db.query(TrainingModule).filter(TrainingModule.slug == req.module_slug).first()
    if not module:
        raise HTTPException(status_code=404, detail="Training course not found")

    lead = Lead(
        full_name=req.trainee_name,
        email=req.email,
        phone=req.phone,
        business_name=req.organization or "Independent / Self",
        inquiry_type="training_enrollment",
        message=f"Enrollment request for [{module.title}]. Trainees: {req.attendee_count}. Notes: {req.notes or 'None'}",
        equipment_interest=f"Training: {module.title}",
        status="new"
    )
    db.add(lead)
    db.commit()

    return {
        "success": True,
        "message": f"Enrollment registered for '{module.title}'. Our Academy Coordinator will reach out with the upcoming schedule and batch details.",
        "course_title": module.title,
        "certification": module.certification
    }
