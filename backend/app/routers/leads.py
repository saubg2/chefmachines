import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Lead
from ..schemas import LeadCreate, LeadOut

router = APIRouter(prefix="/api/leads", tags=["Leads & RFQ"])

@router.post("", response_model=LeadOut)
def create_lead(lead_in: LeadCreate, db: Session = Depends(get_db)):
    equip_str = ""
    if lead_in.equipment_interest:
        if isinstance(lead_in.equipment_interest, (list, dict)):
            equip_str = json.dumps(lead_in.equipment_interest)
        else:
            equip_str = str(lead_in.equipment_interest)

    lead = Lead(
        full_name=lead_in.full_name,
        email=lead_in.email,
        phone=lead_in.phone,
        city=lead_in.city,
        business_name=lead_in.business_name,
        business_type=lead_in.business_type,
        inquiry_type=lead_in.inquiry_type or "rfq",
        message=lead_in.message,
        equipment_interest=equip_str,
        estimated_budget=lead_in.estimated_budget,
        status="new"
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead
