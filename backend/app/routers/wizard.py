import json
import random
import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from ..database import get_db
from ..models import WizardPreset, Lead

router = APIRouter(prefix="/api/wizard", tags=["Setup Wizard"])

class WizardCalculateRequest(BaseModel):
    concept_key: str
    scale: str = "medium" # small, medium, large
    selected_equipment_names: Optional[List[str]] = None
    custom_capacity_orders_per_day: Optional[int] = None

class WizardSubmitRequest(BaseModel):
    concept_key: str
    scale: str
    selected_equipment: List[Dict[str, Any]]
    calculations: Dict[str, Any]
    full_name: str
    email: str
    phone: str
    city: str
    business_name: Optional[str] = None
    notes: Optional[str] = None

@router.get("/presets")
def get_wizard_presets(db: Session = Depends(get_db)):
    presets = db.query(WizardPreset).all()
    results = []
    for p in presets:
        results.append({
            "id": p.id,
            "concept_key": p.concept_key,
            "title": p.title,
            "subtitle": p.subtitle,
            "tagline": p.tagline,
            "description": p.description,
            "equipment_presets": json.loads(p.equipment_presets) if p.equipment_presets else {},
            "utility_estimates": json.loads(p.utility_estimates) if p.utility_estimates else {},
            "base_budget_min": p.base_budget_min,
            "base_budget_max": p.base_budget_max
        })
    return results

@router.post("/calculate")
def calculate_wizard_setup(req: WizardCalculateRequest, db: Session = Depends(get_db)):
    preset = db.query(WizardPreset).filter(WizardPreset.concept_key == req.concept_key).first()
    if not preset:
        raise HTTPException(status_code=404, detail="Preset concept not found")

    equipment_data = json.loads(preset.equipment_presets) if preset.equipment_presets else {}
    utility_data = json.loads(preset.utility_estimates) if preset.utility_estimates else {}

    tier = req.scale if req.scale in equipment_data else "medium"
    items = equipment_data.get(tier, [])

    # Filter if user specifically selected a subset
    if req.selected_equipment_names:
        selected_items = [i for i in items if i.get("name") in req.selected_equipment_names]
    else:
        selected_items = items

    total_cost = sum(i.get("est_cost", 0) * i.get("qty", 1) for i in selected_items)
    total_kw = round(sum(i.get("kw", 0) * i.get("qty", 1) for i in selected_items), 1)

    tier_utility = utility_data.get(tier, {})
    exhaust_cfm = tier_utility.get("exhaust_cfm", int(total_kw * 120))
    rec_sqft = tier_utility.get("recommended_sqft", "400 - 800 sq ft")
    plumbing = tier_utility.get("plumbing_inlets", 4)
    drains = tier_utility.get("drain_points", 3)

    phase_recommendation = "3-Phase 415V (50Hz)" if total_kw > 10 else "Single-Phase 230V / 3-Phase Optional"

    return {
        "concept_key": req.concept_key,
        "scale": tier,
        "item_count": len(selected_items),
        "selected_equipment": selected_items,
        "summary": {
            "total_estimated_budget_inr": total_cost,
            "total_electrical_kw": total_kw,
            "power_phase_recommendation": phase_recommendation,
            "exhaust_hood_cfm": exhaust_cfm,
            "recommended_kitchen_sqft": rec_sqft,
            "plumbing_points": plumbing,
            "drainage_points": drains
        }
    }

@router.post("/submit")
def submit_wizard_quote(req: WizardSubmitRequest, db: Session = Depends(get_db)):
    quote_ref = f"CM-WZ-{datetime.datetime.now().strftime('%y%m%d')}-{random.randint(1000, 9999)}"

    lead = Lead(
        full_name=req.full_name,
        email=req.email,
        phone=req.phone,
        city=req.city,
        business_name=req.business_name or f"{req.full_name}'s {req.concept_key.replace('_', ' ').title()}",
        business_type=req.concept_key,
        inquiry_type="wizard_setup",
        message=f"Setup Wizard submission for {req.concept_key.title()} ({req.scale} scale). Notes: {req.notes or 'None'}",
        equipment_interest=json.dumps(req.selected_equipment),
        estimated_budget=str(req.calculations.get("total_estimated_budget_inr", 0)),
        status="new"
    )
    db.add(lead)
    db.commit()

    return {
        "success": True,
        "quote_reference": quote_ref,
        "message": f"Setup configuration submitted successfully. Your reference code is {quote_ref}. A ChefMachines commercial kitchen consultant has been assigned to your project.",
        "lead_id": lead.id
    }
