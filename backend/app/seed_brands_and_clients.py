import json
import logging
from sqlalchemy.orm import Session
from .models import Product, Category

logger = logging.getLogger("seed_brands")

def seed_brands_and_equipment(db: Session):
    """
    Seeds equipment for all 13 authorized commercial brands.
    """
    brand_products = [
        # 1. CELFROST
        {
            "name": "Celfrost 2-Door Upright Commercial Reach-In Chiller",
            "slug": "celfrost-2-door-upright-commercial-chiller",
            "model": "GN 650 TN / FKG-520",
            "category_slug": "refrigeration-freezers",
            "brand": "Celfrost",
            "description": "Commercial ventilated dynamic refrigeration engineered by Celfrost for intense 43°C tropical ambient conditions. Features Dixell digital controller, self-closing doors, and energy-efficient R290 hydrocarbon refrigerant.",
            "features": [
                "650 Liters gross storage capacity",
                "Operating temperature: +2°C to +8°C",
                "Self-closing doors with magnetic gaskets",
                "Ventilated dynamic fan cooling"
            ],
            "specs": {
                "Brand": "Celfrost",
                "Model": "GN 650 TN",
                "Dimensions": "740 x 830 x 2010 mm",
                "Power": "350W, 230V / 50Hz",
                "Temperature": "+2°C to +8°C",
                "Shelves": "3 x GN 2/1 adjustable shelves"
            },
            "price_estimate": 78000.0,
            "image_url": "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80",
            "is_featured": True
        },
        {
            "name": "Celfrost 3-Door Back Bar Display Chiller",
            "slug": "celfrost-3-door-back-bar-display-chiller",
            "model": "RBW 135 / BC-3",
            "category_slug": "refrigeration-freezers",
            "brand": "Celfrost",
            "description": "Heavy-duty back-bar commercial glass door refrigerator. Holds up to 300 beer bottles and cocktail mixers with bright LED illumination and fan-assisted rapid pull-down cooling.",
            "features": [
                "Triple double-glazed hinged glass doors",
                "Interior cool LED illumination",
                "Digital Dixell thermostat with auto-defrost",
                "Lockable doors for bar security"
            ],
            "specs": {
                "Brand": "Celfrost",
                "Model": "RBW 135",
                "Dimensions": "1350 x 520 x 900 mm",
                "Power": "280W, 230V",
                "Temperature": "+1°C to +10°C"
            },
            "price_estimate": 58000.0,
            "image_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
            "is_featured": False
        },

        # 2. ELECTROLUX
        {
            "name": "Electrolux Professional Undercounter Commercial Glasswasher",
            "slug": "electrolux-undercounter-commercial-glasswasher",
            "model": "Electrolux EGW",
            "category_slug": "warewashing",
            "brand": "Electrolux",
            "description": "Premium Swedish engineering for high-volume cafes and cocktail bars. 120-second sanitize wash cycle with guaranteed 84°C hygienic rinse, sparkling clean crystal glasses, and built-in peristaltic detergent dosing.",
            "features": [
                "Guaranteed 84°C sanitizing rinse",
                "Cleans up to 30 racks / 480 glasses per hour",
                "Double skin insulated cabinet reduces noise to 60 dB",
                "Integrated atmospheric boiler with rinse pump"
            ],
            "specs": {
                "Brand": "Electrolux Professional",
                "Model": "EGW 30",
                "Rack Size": "400 x 400 mm",
                "Cycle Time": "120 seconds",
                "Power": "3.3 kW, 230V Single Phase",
                "Dimensions": "460 x 565 x 715 mm"
            },
            "price_estimate": 135000.0,
            "image_url": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80",
            "is_featured": True
        },

        # 3. FIORENZATO
        {
            "name": "Fiorenzato F64 Evo On-Demand Electronic Coffee Grinder",
            "slug": "fiorenzato-f64-evo-electronic-grinder",
            "model": "F64 Evo",
            "category_slug": "espresso-beverage",
            "brand": "Fiorenzato",
            "description": "The Italian benchmark for cafe coffee grinders. Features 64mm Red Speed flat burrs, micrometric stepless grind adjustment, capacitive color touchscreen, cooling fan, and shot counter.",
            "features": [
                "64mm high-durability flat burrs",
                "Cooling fan prevents ground coffee thermal overheating",
                "Single, double, and manual dosing touch buttons",
                "Micrometric stepless continuous grind adjustment"
            ],
            "specs": {
                "Brand": "Fiorenzato",
                "Model": "F64 Evo",
                "Burr Diameter": "64 mm Flat",
                "Motor Speed": "1350 RPM",
                "Hopper Capacity": "1.5 kg",
                "Power": "350W, 230V",
                "Net Weight": "13 kg"
            },
            "price_estimate": 78000.0,
            "image_url": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
            "is_featured": True
        },

        # 4. MIDDLEBY MARSHALL
        {
            "name": "Middleby Marshall PS540 WOW! Impingement Conveyor Pizza Oven",
            "slug": "middleby-marshall-ps540-conveyor-pizza-oven",
            "model": "PS540-E",
            "category_slug": "cooking-ovens",
            "brand": "Middleby Marshall",
            "description": "The global gold standard conveyor pizza oven used by top international pizza chains. Patented variable air impingement technology delivers crisp crusts in 4 minutes, with 30% lower energy consumption.",
            "features": [
                "40-inch bake chamber with 32-inch wide stainless conveyor belt",
                "Patented WOW! variable speed blower technology",
                "Stackable up to 3 decks for exponential output",
                "Touchscreen programmable microprocessor controls"
            ],
            "specs": {
                "Brand": "Middleby Marshall",
                "Model": "PS540-E",
                "Power": "27 kW, 415V 3-Phase (or Gas 115,000 BTU)",
                "Belt Width": "32 inches (813 mm)",
                "Dimensions": "2032 x 1534 x 1143 mm",
                "Capacity": "90 - 120 x 12-inch pizzas/hr per deck"
            },
            "price_estimate": 890000.0,
            "image_url": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
            "is_featured": True
        },

        # 5. PITCO
        {
            "name": "Pitco 35C+ SS Single Tank Manual Gas Fryer (3-Burner)",
            "slug": "pitco-35c-plus-commercial-gas-fryer",
            "model": "Pitco 35C+SS",
            "category_slug": "qsr-fast-food",
            "brand": "Pitco",
            "description": "The industry's most dependable commercial gas deep fryer. Long-lasting, heat-retaining stainless steel tank with patented atmospheric cast iron burners and deep cold-zone sediment trap.",
            "features": [
                "18-20 Liters oil capacity",
                "3 patented cast iron alloy heat tubes",
                "Deep cold zone traps sediment and crumbs, extending oil life",
                "Millivolt thermostat requires no electrical plug"
            ],
            "specs": {
                "Brand": "Pitco",
                "Model": "35C+ SS",
                "Oil Capacity": "18 - 20 Liters",
                "Gas Consumption": "90,000 BTU/hr (LPG / PNG)",
                "Dimensions": "384 x 769 x 1201 mm",
                "Baskets": "2 nickel-plated twin wire baskets"
            },
            "price_estimate": 108000.0,
            "image_url": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop&q=80",
            "is_featured": True
        },

        # 6. TURBOCHEF
        {
            "name": "TurboChef Sota High-Speed Rapid Cook Oven",
            "slug": "turbochef-sota-high-speed-rapid-cook-oven",
            "model": "TurboChef Sota",
            "category_slug": "cooking-ovens",
            "brand": "TurboChef",
            "description": "Cuts cooking times by up to 80% without compromising food quality. Combines independently controlled top and bottom impinged air with microwave assist. Compact 16-inch footprint, ventless certified.",
            "features": [
                "Cooks food up to 10x faster than conventional methods",
                "Built-in catalytic converter for ventless operation",
                "Smart menu system stores up to 256 unique recipes",
                "High-contrast color touchscreen display"
            ],
            "specs": {
                "Brand": "TurboChef",
                "Model": "Sota (i1-9500-1)",
                "Power": "6.2 kW, 415V 3-Phase / 230V Single Phase",
                "Dimensions": "406 x 757 x 635 mm",
                "Weight": "77 kg",
                "Certifications": "UL, NSF, CE, Ventless"
            },
            "price_estimate": 485000.0,
            "image_url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80",
            "is_featured": True
        },

        # 7. MARCO
        {
            "name": "Marco MIX UC4 Precision Under-Counter Water Boiler & Font",
            "slug": "marco-mix-uc4-precision-water-boiler-font",
            "model": "Marco MIX UC4",
            "category_slug": "espresso-beverage",
            "brand": "Marco",
            "description": "Industry benchmark for specialty coffee bars and tea programs. Single sleek countertop stainless font connected to an energy-efficient under-counter vacuum-insulated boiler with 3 programmable preset temperatures.",
            "features": [
                "Vacuum-insulated tank saves up to 70% energy",
                "3 programmable temperature settings for tea, pour-over, and americano",
                "Sleek minimalist font saves valuable barista bar space",
                "Push-button volumetric portion dispense"
            ],
            "specs": {
                "Brand": "Marco Beverage Systems",
                "Model": "MIX UC4 + Font",
                "Immediate Draw-off": "4.0 Liters",
                "Hourly Output": "28.0 Liters / hr",
                "Power": "2.4 kW, 230V",
                "Under-Counter Boiler": "385 x 440 x 395 mm"
            },
            "price_estimate": 115000.0,
            "image_url": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
            "is_featured": False
        },

        # 8. TIMEMORE
        {
            "name": "Timemore Black Mirror Commercial Smart Espresso & Brew Station",
            "slug": "timemore-black-mirror-commercial-brew-station",
            "model": "Timemore Pro Series",
            "category_slug": "espresso-beverage",
            "brand": "Timemore",
            "description": "High-precision commercial barista scale and pour-over brewing station. Features 0.1g accuracy, real-time flow-rate indicator, automatic tare and timer, water-resistant silicone matte finish, and USB-C rapid charging.",
            "features": [
                "0.1g ultra-fast weight measurement response",
                "Real-time extraction flow-rate tracking",
                "Auto-timer triggers upon first drip",
                "Water-resistant scratch-proof surface"
            ],
            "specs": {
                "Brand": "Timemore",
                "Model": "Black Mirror Nano / Pro",
                "Battery": "1600mAh Rechargeable Lithium",
                "Measurement Range": "0.1g - 2,000g",
                "Accuracy": "± 0.1g"
            },
            "price_estimate": 8500.0,
            "image_url": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
            "is_featured": False
        },

        # 9. MHW-3BOMBER
        {
            "name": "MHW-3BOMBER Commercial 58.5mm Calibrated Constant Pressure Tamper & Tool Set",
            "slug": "mhw-3bomber-calibrated-tamper-barista-tool-set",
            "model": "Bomber Pro Series",
            "category_slug": "espresso-beverage",
            "brand": "MHW-3BOMBER",
            "description": "Essential specialty coffee toolkit including 30-lb constant pressure calibrated spring tamper, high-precision WDT needle distributor, and Teflon-coated non-stick latte art steaming pitchers. Guarantees zero channeling and identical espresso puck compression.",
            "features": [
                "30 lbs constant pressure dual-spring mechanism",
                "58.5mm CNC-machined titanium base fits commercial VST baskets perfectly",
                "WDT 0.4mm 8-needle clump-breaker",
                "Stainless steel 450ml & 600ml pointed eagle-spout milk pitchers"
            ],
            "specs": {
                "Brand": "MHW-3BOMBER",
                "Model": "Constant Pressure 58.5mm Kit",
                "Material": "SUS304 Food Grade Stainless Steel + Walnut Wood",
                "Diameter": "58.5 mm Precision Fit"
            },
            "price_estimate": 14500.0,
            "image_url": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
            "is_featured": False
        },

        # 10. LA MARZOCCO
        {
            "name": "La Marzocco Linea Classic S 2-Group Commercial Espresso Machine",
            "slug": "la-marzocco-linea-classic-s-2-group-espresso-machine",
            "model": "Linea Classic S 2AV",
            "category_slug": "espresso-beverage",
            "brand": "La Marzocco",
            "description": "Handcrafted in Florence, Italy, the Linea Classic S is the world's most iconic specialty espresso machine. Features dual boilers, saturated group heads, PID temperature control, dual volumetric shot pads, and integrated barista timer displays.",
            "features": [
                "Dual boiler system: dedicated 3.4L coffee boiler + 7.0L steam boiler",
                "Saturated groups ensure unparalleled thermal stability shot after shot",
                "Dual PID temperature control (coffee and steam)",
                "Pro App compatible with barista analytics"
            ],
            "specs": {
                "Brand": "La Marzocco",
                "Model": "Linea Classic S 2AV",
                "Groups": "2 Saturated Groups",
                "Coffee Boiler": "3.4 Liters",
                "Steam Boiler": "7.0 Liters",
                "Power": "4.6 kW, 230V / 400V 3-Phase",
                "Dimensions": "690 x 585 x 445 mm",
                "Weight": "59 kg"
            },
            "price_estimate": 780000.0,
            "image_url": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
            "is_featured": True
        },

        # 11. LA CIMBALI
        {
            "name": "La Cimbali M26 TE 2-Group Commercial Espresso Machine",
            "slug": "la-cimbali-m26-te-2-group-commercial-espresso-machine",
            "model": "La Cimbali M26 TE",
            "category_slug": "espresso-beverage",
            "brand": "La Cimbali",
            "description": "Reliable Italian commercial workhorse with La Cimbali's patented thermal system. Backlit electro-mechanical pushbuttons, TurboSteam Milk4 automatic frothing arm option, and energy-saving smart boiler technology.",
            "features": [
                "Patented smart boiler technology increases steam performance by 30%",
                "Independent thermal balancing per group",
                "TurboSteam Milk4 cold-touch steam wand option",
                "Thermosiphonic hydraulic system"
            ],
            "specs": {
                "Brand": "La Cimbali",
                "Model": "M26 TE 2-Group",
                "Boiler Capacity": "10.0 Liters",
                "Power": "4.2 - 4.9 kW, 230V / 400V",
                "Dimensions": "794 x 528 x 548 mm",
                "Weight": "62 kg"
            },
            "price_estimate": 420000.0,
            "image_url": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
            "is_featured": True
        },

        # 12. FIAMMA
        {
            "name": "Fiamma Compass Dual-Boiler 2-Group Commercial Espresso Machine",
            "slug": "fiamma-compass-dual-boiler-2-group-espresso-machine",
            "model": "Fiamma Compass 2 Multi-Boiler",
            "category_slug": "espresso-beverage",
            "brand": "Fiamma",
            "description": "Portuguese engineered multi-boiler precision espresso machine. Independent coffee boilers with individual digital PID displays, ergonomic quarter-turn steam valves, soft pre-infusion chamber, and barista LED lighting.",
            "features": [
                "Multi-boiler system with independent temperature per group",
                "Programmable pre-infusion pressure curve",
                "Rotary cool-touch high-output steam wands",
                "Volumetric touch keypad with automated cleaning cycles"
            ],
            "specs": {
                "Brand": "Fiamma",
                "Model": "Compass 2 Multi",
                "Steam Boiler": "10.5 Liters",
                "Coffee Boilers": "2 x 0.8 Liters",
                "Power": "5.5 kW, 230V / 400V",
                "Dimensions": "750 x 600 x 590 mm"
            },
            "price_estimate": 365000.0,
            "image_url": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
            "is_featured": False
        },

        # 13. CUNILL
        {
            "name": "Cunill Tranquilo II Heavy-Duty Silent Coffee Grinder",
            "slug": "cunill-tranquilo-ii-heavy-duty-silent-grinder",
            "model": "Cunill Tranquilo II",
            "category_slug": "espresso-beverage",
            "brand": "Cunill",
            "description": "Spanish heavy-duty commercial on-demand espresso grinder. Built with special acoustic motor dampening for whisper-silent operation (68 dB), unbreakable polymer hopper, and 60mm hardened steel burrs.",
            "features": [
                "Silent commercial motor with thermal overload protection",
                "60mm tempered steel flat burrs (rated for 500 kg)",
                "Stepless micrometric regulation with locking pin",
                "Unbreakable 1kg bean hopper with slide shutter"
            ],
            "specs": {
                "Brand": "Cunill",
                "Model": "Tranquilo II",
                "Burrs": "60 mm Steel",
                "Noise Level": "68 dB Silent",
                "Motor Speed": "1300 / 1600 RPM",
                "Power": "275W, 230V",
                "Weight": "8 kg"
            },
            "price_estimate": 44000.0,
            "image_url": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
            "is_featured": False
        }
    ]

    for item in brand_products:
        existing = db.query(Product).filter(Product.slug == item["slug"]).first()
        if existing:
            existing.name = item["name"]
            existing.model = item["model"]
            existing.category_slug = item["category_slug"]
            existing.brand = item["brand"]
            existing.description = item["description"]
            existing.features = json.dumps(item["features"])
            existing.specs = json.dumps(item["specs"])
            existing.price_estimate = item["price_estimate"]
            existing.image_url = item["image_url"]
            existing.is_featured = item["is_featured"]
        else:
            new_p = Product(
                name=item["name"],
                slug=item["slug"],
                model=item["model"],
                category_slug=item["category_slug"],
                brand=item["brand"],
                description=item["description"],
                features=json.dumps(item["features"]),
                specs=json.dumps(item["specs"]),
                price_estimate=item["price_estimate"],
                is_rfq_only=True,
                image_url=item["image_url"],
                is_featured=item["is_featured"],
                is_active=True
            )
            db.add(new_p)
    db.commit()
    logger.info(f"Seeded {len(brand_products)} products across all 13 authorized brands.")
