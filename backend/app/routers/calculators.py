import math
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix="/api/calculators", tags=["Calculators"])

# 1. COLD ROOM CALCULATOR
class ColdRoomInput(BaseModel):
    length_ft: float
    width_ft: float
    height_ft: float
    target_temp: str = "chiller" # chiller (2-8 C) or freezer (-18 to -22 C)
    ambient_temp_c: float = 38.0
    turnover_kg_day: float = 400.0

@router.post("/cold-room")
def calculate_cold_room(data: ColdRoomInput):
    volume_cuft = round(data.length_ft * data.width_ft * data.height_ft, 1)
    volume_cum = round(volume_cuft * 0.0283168, 2)

    is_freezer = data.target_temp == "freezer"

    # Rule of thumb refrigeration load BTU/hr
    # Chiller ~ 10-14 BTU/cuft, Freezer ~ 18-24 BTU/cuft adjusted for ambient
    ambient_factor = 1.0 + max(0.0, (data.ambient_temp_c - 32) * 0.02)
    base_btu_per_cuft = (22 if is_freezer else 12) * ambient_factor
    cooling_load_btu = round(volume_cuft * base_btu_per_cuft + (data.turnover_kg_day * (80 if is_freezer else 35)), 0)

    # Conversion to Horsepower (1 HP ~ 9,000 to 10,000 BTU/hr for low temp, 12,000 for med temp)
    hp_divisor = 8500 if is_freezer else 11000
    compressor_hp = round(max(1.0, cooling_load_btu / hp_divisor), 1)

    puf_panel_thickness_mm = 120 if is_freezer else 80
    est_daily_kwh = round((compressor_hp * 0.746 * 16) * 1.15, 1) # 16 hrs run-time
    pallet_capacity = max(1, int(volume_cum / 2.2))

    return {
        "volume_cuft": volume_cuft,
        "volume_cum": volume_cum,
        "cooling_capacity_btu_hr": int(cooling_load_btu),
        "cooling_capacity_watts": int(cooling_load_btu * 0.293),
        "recommended_compressor_hp": compressor_hp,
        "puf_insulation_panel_mm": puf_panel_thickness_mm,
        "est_daily_power_kwh": est_daily_kwh,
        "approx_pallet_capacity": pallet_capacity,
        "refrigerant_recommendation": "R404A / R452A / R290",
        "door_recommendation": "Heavy-duty flush-mount heated gasket door with internal safety release"
    }

# 2. COFFEE & ESPRESSO THROUGHPUT CALCULATOR
class CoffeeThroughputInput(BaseModel):
    daily_cups: int = 250
    rush_hours: int = 2
    rush_percentage: float = 35.0 # % cups served in rush
    takeaway_percentage: float = 40.0

@router.post("/coffee-throughput")
def calculate_coffee_throughput(data: CoffeeThroughputInput):
    rush_cups = round(data.daily_cups * (data.rush_percentage / 100.0))
    cups_per_hour_peak = round(rush_cups / max(1, data.rush_hours))

    if cups_per_hour_peak <= 60:
        recommended_groups = 1
        machine_model = "ChefMachines 1-Group Commercial Compact Dual Boiler"
        boiler_size = "4 - 6 Liters"
    elif cups_per_hour_peak <= 160:
        recommended_groups = 2
        machine_model = "ChefMachines BaristaCraft Pro 2-Group Dual Boiler"
        boiler_size = "11 - 14 Liters"
    else:
        recommended_groups = 3
        machine_model = "ChefMachines BaristaCraft Elite 3-Group Multi-Boiler"
        boiler_size = "17 - 21 Liters (Multi-Boiler System)"

    # Grinder capacity
    coffee_beans_kg_day = round((data.daily_cups * 18.0) / 1000.0, 2) # 18g double shot
    water_liters_day = round(data.daily_cups * 0.25, 1)

    return {
        "daily_cups": data.daily_cups,
        "peak_hourly_cups": cups_per_hour_peak,
        "recommended_group_heads": recommended_groups,
        "recommended_machine_tier": machine_model,
        "minimum_steam_boiler_liters": boiler_size,
        "daily_coffee_beans_kg": coffee_beans_kg_day,
        "daily_brewing_water_liters": water_liters_day,
        "recommended_grinder_spec": "64mm flat burrs" if cups_per_hour_peak < 100 else "75mm or 83mm titanium burrs with on-demand cooling",
        "pitcher_rinser_recommended": True
    }

# 3. KITCHEN EXHAUST HOOD CFM CALCULATOR
class ExhaustHoodInput(BaseModel):
    hood_length_ft: float = 8.0
    hood_width_ft: float = 4.0
    hood_type: str = "wall_canopy" # wall_canopy, island
    cooking_duty: str = "heavy" # light, medium, heavy (fryers/griddles), extra_heavy (solid fuel/charcoal)

@router.post("/exhaust-cfm")
def calculate_exhaust_cfm(data: ExhaustHoodInput):
    area_sqft = data.hood_length_ft * data.hood_width_ft

    # Standard commercial CFM multipliers per linear foot of hood perimeter or area
    # Wall canopy: Light=150-200, Medium=200-300, Heavy=300-400 CFM/linear foot
    duty_rates = {
        "light": 180,
        "medium": 280,
        "heavy": 380,
        "extra_heavy": 500
    }
    rate_per_ft = duty_rates.get(data.cooking_duty, 380)

    # Island hoods require ~30% higher capture velocity
    multiplier = 1.35 if data.hood_type == "island" else 1.0
    exhaust_cfm = round(data.hood_length_ft * rate_per_ft * multiplier)

    # Makeup air is typically 80% to 85% of exhaust airflow
    makeup_air_cfm = round(exhaust_cfm * 0.82)

    # Duct size estimation (based on standard velocity 1500 - 1800 FPM)
    duct_area_sqft = exhaust_cfm / 1600.0
    duct_diameter_inches = round(math.sqrt((4 * duct_area_sqft * 144) / math.pi), 1)

    return {
        "hood_area_sqft": round(area_sqft, 1),
        "recommended_exhaust_cfm": exhaust_cfm,
        "recommended_makeup_air_cfm": makeup_air_cfm,
        "estimated_duct_diameter_inches": duct_diameter_inches,
        "recommended_fan_static_pressure_wg": "1.5 to 2.2 in WG",
        "grease_filter_baffles_recommended": max(2, math.ceil(data.hood_length_ft / 1.6)),
        "fire_suppression_compatible": True
    }

# 4. OIL FILTRATION & FRYER ROI CALCULATOR
class FryerRoiInput(BaseModel):
    fryer_count: int = 2
    oil_capacity_per_fryer_liters: float = 28.0
    current_oil_cost_per_liter_inr: float = 140.0
    current_oil_changes_per_month: int = 8
    filtration_adoption: bool = True

@router.post("/fryer-oil-roi")
def calculate_fryer_roi(data: FryerRoiInput):
    total_oil_liters_per_change = data.fryer_count * data.oil_capacity_per_fryer_liters
    monthly_oil_liters_used = total_oil_liters_per_change * data.current_oil_changes_per_month
    current_monthly_spend_inr = monthly_oil_liters_used * data.current_oil_cost_per_liter_inr
    current_annual_spend_inr = current_monthly_spend_inr * 12

    # Built-in automatic filtration extends oil life by 45% - 55%
    savings_percentage = 48.0
    annual_savings_inr = round(current_annual_spend_inr * (savings_percentage / 100.0))
    monthly_savings_inr = round(annual_savings_inr / 12)

    # Upgrade cost difference for motorized filtration model ~ 75,000 INR per fryer
    upgrade_cost_total = data.fryer_count * 75000
    payback_period_months = round(upgrade_cost_total / max(1, monthly_savings_inr), 1)

    return {
        "current_monthly_oil_spend_inr": round(current_monthly_spend_inr),
        "current_annual_oil_spend_inr": round(current_annual_spend_inr),
        "projected_annual_oil_savings_inr": annual_savings_inr,
        "projected_monthly_savings_inr": monthly_savings_inr,
        "estimated_payback_period_months": payback_period_months,
        "oil_waste_reduction_liters_per_year": round(monthly_oil_liters_used * 12 * 0.48)
    }
