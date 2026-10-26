import json
import logging
from sqlalchemy.orm import Session
from .models import Category, Product, TrainingModule, BlogPost, WizardPreset

logger = logging.getLogger("seed_data")

def seed_initial_data(db: Session):
    # Wipe and reseed cleanly with authentic brand products
    db.query(Product).delete()
    db.query(Category).delete()
    db.query(TrainingModule).delete()
    db.query(BlogPost).delete()
    db.query(WizardPreset).delete()
    db.commit()

    logger.info("Seeding authentic commercial equipment catalog from real manufacturer brands...")

    # 1. REAL CATEGORIES
    categories = [
        Category(
            name="QSR & Commercial Frying",
            slug="qsr-fast-food",
            image_url="https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
            description="Commercial fryers, contact bun toasters, heavy-duty griddles, and holding stations from Pitco, Toastmaster, and Middleby.",
            sort_order=1
        ),
        Category(
            name="Commercial Refrigeration & Cold Chain",
            slug="refrigeration-freezers",
            image_url="https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80",
            description="Upright reach-in chillers, deep freezers, undercounter prep tables, and backbars from Celfrost and Hoshizaki.",
            sort_order=2
        ),
        Category(
            name="Combi Ovens & Rapid Cooking",
            slug="cooking-ovens",
            image_url="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80",
            description="Commercial conveyor pizza ovens, high-speed accelerated cookers, and combi steamers from Middleby Marshall, TurboChef, Rational, and Electrolux.",
            sort_order=3
        ),
        Category(
            name="Espresso Machines & Coffee Systems",
            slug="espresso-beverage",
            image_url="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
            description="Commercial espresso machines, electronic grinders, precision water fonts, and tools from La Marzocco, La Cimbali, Fiamma, Fiorenzato, Cunill, Marco, Timemore, and MHW-3BOMBER.",
            sort_order=4
        ),
        Category(
            name="Bakery & Food Preparation",
            slug="bakery-prep",
            image_url="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
            description="Industrial spiral dough mixers, electric deck ovens, dough sheeters, and proofers from Sinmag and Celfrost.",
            sort_order=5
        ),
        Category(
            name="Commercial Warewashing",
            slug="warewashing",
            image_url="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80",
            description="High-temperature pass-through hood dishwashers and undercounter glasswashers from Electrolux Professional and Veetson.",
            sort_order=6
        )
    ]
    db.add_all(categories)
    db.commit()

    # 2. 100% AUTHENTIC REAL COMMERCIAL PRODUCTS (NO MADE-UP NAMES)
    products = [
        # --- BURGER / QSR REAL PRODUCTS ---
        Product(
            name="Toastmaster Vertical Contact Bun Toaster",
            slug="toastmaster-vertical-contact-bun-toaster",
            model="CT-240 / VCT-2000",
            category_slug="qsr-fast-food",
            brand="Toastmaster",
            description="Commercial vertical contact bun toaster manufactured by Toastmaster (Middleby). Delivers perfectly caramelized, butter-toasted burger buns in 12-15 seconds continuous roll, sealing the bun surface to prevent meat juices from making the bun soggy.",
            features=json.dumps([
                "Toasts up to 1,200 bun halves per hour",
                "Dual temperature platen controls up to 260°C",
                "Adjustable bun thickness compression dials for brioche, sesame, and potato buns",
                "Removable stainless crumb tray for rapid end-of-day cleaning"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "Toastmaster (Middleby Celfrost)",
                "Model": "CT-240",
                "Electrical Power": "2.8 kW, 230V / 50Hz Single Phase",
                "Toast Cycle": "12 to 24 seconds continuous feed",
                "Dimensions": "580 x 290 x 590 mm",
                "Weight": "28 kg"
            }),
            price_estimate=85000.0,
            is_rfq_only=True,
            image_url="https://www.middlebycelfrost.com/allapi/assets/images/product/401/pro-401-1.png",
            is_featured=True
        ),
        Product(
            name="Pitco 35C+ Commercial Gas Deep Fryer (18 Liters)",
            slug="pitco-35c-plus-commercial-gas-fryer",
            model="35C+ SS",
            category_slug="qsr-fast-food",
            brand="Pitco",
            description="The worldwide commercial foodservice standard for heavy frying in burger chains and QSRs. Features 3 patented cast iron heat tubes, deep cold-zone sediment trap that doubles oil life, and millivolt thermostat control.",
            features=json.dumps([
                "18-20 Liters oil capacity with rapid temperature recovery",
                "Deep cold zone prevents crumb scorching and extends oil life",
                "Millivolt safety thermostat (requires no electrical plug)",
                "Stainless steel fry tank with reinforced door"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "Pitco (USA)",
                "Model": "35C+ SS",
                "Gas Consumption": "90,000 BTU/hr (LPG / PNG)",
                "Oil Capacity": "18 - 20 Liters",
                "Dimensions": "384 x 769 x 1201 mm",
                "Baskets": "2 heavy-duty nickel-plated wire baskets"
            }),
            price_estimate=108000.0,
            is_rfq_only=True,
            image_url="https://www.middlebycelfrost.com/allapi/assets/images/product/304/pro-304-1.png",
            is_featured=True
        ),
        Product(
            name="TurboChef Sota High-Speed Rapid Cook Oven",
            slug="turbochef-sota-high-speed-rapid-cook-oven",
            model="Sota (i1-9500-1)",
            category_slug="cooking-ovens",
            brand="TurboChef",
            description="Cooks up to 10x faster than conventional ovens using independently controlled top and bottom impinged air combined with microwave assist. Built-in catalytic converter allows certified ventless operation in cafes and QSR lines.",
            features=json.dumps([
                "Ventless certified with internal catalytic filtration",
                "Smart menu system holds 256 customized multi-stage recipes",
                "Independent top and bottom air impingement",
                "Compact 16-inch footprint fits on standard cafe counters"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "TurboChef (USA)",
                "Model": "Sota",
                "Electrical Power": "6.2 kW, 415V 3-Phase / 230V Single Phase",
                "Dimensions": "406 x 757 x 635 mm",
                "Cook Chamber": "318 x 267 x 183 mm",
                "Weight": "77 kg"
            }),
            price_estimate=485000.0,
            is_rfq_only=True,
            image_url="https://www.middlebycelfrost.com/allapi/assets/images/product/40/pro-40-1.png",
            is_featured=True
        ),

        # --- REFRIGERATION REAL PRODUCTS ---
        Product(
            name="Celfrost 2-Door Upright Commercial Reach-In Chiller",
            slug="celfrost-2-door-upright-commercial-chiller",
            model="GN 650 TN / FKG-520",
            category_slug="refrigeration-freezers",
            brand="Celfrost",
            description="Commercial tropicalized upright chiller from Middleby Celfrost, engineered for harsh 43°C Indian ambient temperatures. Features digital Dixell thermostat, ventilated dynamic fan cooling, and R290 eco-refrigerant.",
            features=json.dumps([
                "650 Liters gross storage capacity (+2°C to +8°C)",
                "Self-closing doors with magnetic gaskets and 90° stay-open dwell",
                "Heavy-duty adjustable wire shelves (GN 2/1 compatible)",
                "Danfoss / Secop tropicalized refrigeration compressor"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "Celfrost",
                "Model": "GN 650 TN",
                "Electrical Power": "350W, 230V / 50Hz",
                "Dimensions": "740 x 830 x 2010 mm",
                "Temperature Range": "+2°C to +8°C",
                "Refrigerant": "R290"
            }),
            price_estimate=78000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),
        Product(
            name="Hoshizaki 2-Door Under Counter Prep Chiller with Cold Pan",
            slug="hoshizaki-2-door-under-counter-prep-chiller",
            model="RTWH150MS4",
            category_slug="refrigeration-freezers",
            brand="Hoshizaki",
            description="Japanese precision commercial refrigerated prep counter with top cold pan rail. Holds Gastronorm ingredient containers chilled at +2°C to +8°C for instant burger and sandwich assembly with refrigerated storage below.",
            features=json.dumps([
                "Top refrigerated rail holds standard GN 1/3 and 1/6 food pans",
                "Full-depth polyethylene prep cutting board",
                "Stainless steel 304 food-grade interior and exterior",
                "Forced-air cooling keeps ingredients fresh even during peak rush"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "Hoshizaki",
                "Model": "RTWH150MS4",
                "Dimensions": "1500 x 750 x 850 mm",
                "Electrical Power": "380W, 230V",
                "Temperature": "+2°C to +8°C",
                "Capacity": "350 Liters refrigerated undercounter"
            }),
            price_estimate=71894.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),
        Product(
            name="Celfrost 3-Door Back Bar Display Glass Chiller",
            slug="celfrost-3-door-back-bar-display-chiller",
            model="RBW 135 / BC-3",
            category_slug="refrigeration-freezers",
            brand="Celfrost",
            description="Underbar glass-door commercial bottle and beverage refrigerator. Holds over 300 bottles with fan-assisted rapid pull-down cooling and cool LED interior lighting.",
            features=json.dumps([
                "Triple double-glazed self-closing hinged glass doors",
                "Digital electronic thermostat with auto-defrost",
                "Interior cool LED illumination",
                "Key locks on all doors for bar inventory security"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "Celfrost",
                "Model": "RBW 135",
                "Dimensions": "1350 x 520 x 900 mm",
                "Electrical Power": "280W, 230V",
                "Temperature": "+1°C to +10°C"
            }),
            price_estimate=45114.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
            is_featured=False
        ),

        # --- ESPRESSO & BEVERAGE REAL PRODUCTS ---
        Product(
            name="La Marzocco Linea Classic S 2-Group Commercial Espresso Machine",
            slug="la-marzocco-linea-classic-s-2-group-espresso-machine",
            model="Linea Classic S 2AV",
            category_slug="espresso-beverage",
            brand="La Marzocco",
            description="Handcrafted in Florence, Italy, the Linea Classic S is the benchmark espresso machine of specialty cafes worldwide. Dual independent boilers, saturated group heads, PID temperature management, and dual volumetric shot programming.",
            features=json.dumps([
                "Dual boiler system: 3.4L dedicated coffee boiler + 7.0L steam boiler",
                "Saturated group heads ensure unmatched temperature stability",
                "Dual PID temperature control for coffee and steam",
                "Pro App compatible with barista extraction analytics"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "La Marzocco (Florence, Italy)",
                "Model": "Linea Classic S 2AV",
                "Groups": "2 Saturated Groups",
                "Electrical Power": "4.6 kW, 230V / 400V 3-Phase",
                "Dimensions": "690 x 585 x 445 mm",
                "Weight": "59 kg"
            }),
            price_estimate=780000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),
        Product(
            name="La Cimbali M26 TE 2-Group Commercial Espresso Machine",
            slug="la-cimbali-m26-te-2-group-commercial-espresso-machine",
            model="M26 TE 2-Group",
            category_slug="espresso-beverage",
            brand="La Cimbali",
            description="High-output commercial Italian espresso machine engineered for heavy cafe rush hours. Features La Cimbali's patented Smart Boiler technology which boosts steam production by 30%, independent thermal balancing per group, and backlit keypads.",
            features=json.dumps([
                "Patented Smart Boiler technology prevents steam pressure drops",
                "Independent thermal balancing per group head",
                "Thermosiphonic commercial hydraulic circuit",
                "Ergonomic quarter-turn steam knobs and stainless wands"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "La Cimbali (Italy)",
                "Model": "M26 TE",
                "Boiler Capacity": "10.0 Liters",
                "Electrical Power": "4.5 kW, 230V / 400V",
                "Dimensions": "794 x 528 x 548 mm",
                "Weight": "62 kg"
            }),
            price_estimate=420000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),
        Product(
            name="Fiorenzato F64 Evo Electronic Commercial Coffee Grinder",
            slug="fiorenzato-f64-evo-electronic-grinder",
            model="F64 Evo",
            category_slug="espresso-beverage",
            brand="Fiorenzato",
            description="Italian precision electronic coffee grinder with 64mm Red Speed flat burrs. Capactive color touchscreen, cooling fan that stops grounds from overheating during rush, and micrometric stepless adjustment.",
            features=json.dumps([
                "64mm Red Speed flat burrs (rated for 1,400 kg coffee)",
                "Integrated motor cooling fan prevents thermal degradation",
                "Single, double, and manual dosing touch buttons with shot counter",
                "Stepless micrometric grind regulation"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "Fiorenzato (Italy)",
                "Model": "F64 Evo",
                "Burrs": "64 mm Flat",
                "Hopper Capacity": "1.5 kg",
                "Motor Speed": "1350 RPM",
                "Power": "350W, 230V"
            }),
            price_estimate=78000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),
        Product(
            name="Cunill Tranquilo II Heavy-Duty Silent Coffee Grinder",
            slug="cunill-tranquilo-ii-heavy-duty-silent-grinder",
            model="Tranquilo II",
            category_slug="espresso-beverage",
            brand="Cunill",
            description="Spanish heavy-duty on-demand commercial coffee grinder. Acoustic motor dampening guarantees quiet 68 dB operation, making it ideal for quiet cafes and hotel lounges.",
            features=json.dumps([
                "68 dB acoustic silent motor with thermal overload protection",
                "60mm hardened tempered steel flat burrs",
                "Unbreakable 1kg bean hopper with slide shutter",
                "Micrometric stepless grind regulation"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "Cunill (Spain)",
                "Model": "Tranquilo II",
                "Burrs": "60 mm Steel",
                "Power": "275W, 230V",
                "Weight": "8 kg"
            }),
            price_estimate=44000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
            is_featured=False
        ),
        Product(
            name="Marco MIX UC4 Precision Under-Counter Water Boiler & Font",
            slug="marco-mix-uc4-precision-water-boiler-font",
            model="MIX UC4",
            category_slug="espresso-beverage",
            brand="Marco",
            description="Under-counter vacuum-insulated water boiler connected to a minimalist countertop font. Offers 3 programmable precise water temperatures for specialty teas, pour-over coffee, and americanos.",
            features=json.dumps([
                "Vacuum insulation tank cuts standby energy consumption by up to 70%",
                "3 programmable push-button dispense temperatures",
                "Sleek countertop font frees up 80% of counter space",
                "28 Liters per hour continuous draw-off"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "Marco Beverage Systems (Ireland)",
                "Model": "MIX UC4",
                "Output": "28 Liters / hour",
                "Power": "2.4 kW, 230V",
                "Boiler Dimensions": "385 x 440 x 395 mm"
            }),
            price_estimate=115000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
            is_featured=False
        ),
        Product(
            name="Timemore Black Mirror Commercial Smart Espresso & Brew Scale",
            slug="timemore-black-mirror-commercial-brew-station",
            model="Black Mirror Nano",
            category_slug="espresso-beverage",
            brand="Timemore",
            description="Ultra-fast 0.1g precision commercial barista scale. Features real-time flow-rate indicator, automatic tare and timer upon first drop, and water-resistant scratch-proof surface.",
            features=json.dumps([
                "0.1g high-sensitivity response",
                "Real-time flow-rate tracking for uniform extraction",
                "Automatic brew timer and tare function",
                "USB-C rechargeable lithium battery"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "Timemore",
                "Model": "Black Mirror Nano",
                "Capacity": "0.1g - 2,000g",
                "Battery": "1600mAh Lithium Rechargeable"
            }),
            price_estimate=8500.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
            is_featured=False
        ),
        Product(
            name="MHW-3BOMBER 58.5mm Calibrated Constant Pressure Spring Tamper",
            slug="mhw-3bomber-calibrated-tamper-barista-tool-set",
            model="Bomber 58.5mm Pro",
            category_slug="espresso-beverage",
            brand="MHW-3BOMBER",
            description="Commercial constant pressure calibrated spring tamper with titanium base. Delivers exactly 30 lbs of level compaction every single pull, eliminating barista inconsistency and espresso channeling.",
            features=json.dumps([
                "30 lbs constant dual-spring calibrated pressure",
                "58.5mm precision base fits commercial precision portafilter baskets",
                "Automatic leveling collar prevents uneven tamping angle",
                "Food-grade 304 stainless steel and CNC walnut construction"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "MHW-3BOMBER",
                "Model": "58.5mm Calibrated Spring Tamper",
                "Material": "SUS304 Stainless Steel + Titanium",
                "Diameter": "58.5 mm Precision Base"
            }),
            price_estimate=6500.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
            is_featured=False
        ),

        # --- PIZZA & BAKERY REAL PRODUCTS ---
        Product(
            name="Middleby Marshall PS540 WOW! Impingement Conveyor Pizza Oven",
            slug="middleby-marshall-ps540-conveyor-pizza-oven",
            model="PS540-E",
            category_slug="cooking-ovens",
            brand="Middleby Marshall",
            description="The world's leading commercial conveyor pizza oven, used by dominant international pizza chains. Variable speed air impingement technology bakes crisp 12-inch and 16-inch pizzas in 4 minutes with 30% lower energy use.",
            features=json.dumps([
                "40-inch bake chamber with 32-inch wide stainless conveyor belt",
                "Patented WOW! variable speed blower technology",
                "Stackable up to 3 decks for exponential output",
                "Microprocessor-controlled digital cook timer"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "Middleby Marshall (USA)",
                "Model": "PS540-E",
                "Power": "27 kW, 415V 3-Phase (or Gas 115,000 BTU)",
                "Belt Width": "32 inches (813 mm)",
                "Dimensions": "2032 x 1534 x 1143 mm",
                "Output": "90 - 120 x 12-inch pizzas/hr per deck"
            }),
            price_estimate=890000.0,
            is_rfq_only=True,
            image_url="https://www.middlebycelfrost.com/allapi/assets/images/product/28/pro-28-1.png",
            is_featured=True
        ),
        Product(
            name="Sinmag SM2-25 Commercial Spiral Dough Mixer (25kg Flour)",
            slug="sinmag-sm2-25-commercial-spiral-mixer",
            model="SM2-25",
            category_slug="bakery-prep",
            brand="Sinmag",
            description="Heavy-duty 2-speed commercial spiral mixer designed for intensive pizza dough, artisan sourdough, and brioche kneading without heating the dough gluten structure.",
            features=json.dumps([
                "Dual timers for low and high speed automatic transitions",
                "25 kg flour / 40 kg finished dough batch capacity",
                "Solid 304 stainless steel bowl, spiral arm, and dividing bar",
                "Silent heavy-duty dual belt drive transmission"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "Sinmag",
                "Model": "SM2-25",
                "Bowl Volume": "53 Liters",
                "Dough Capacity": "40 kg finished dough",
                "Power": "2.2 kW, 415V 3-Phase",
                "Dimensions": "580 x 920 x 1140 mm"
            }),
            price_estimate=230000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),

        # --- WAREWASHING REAL PRODUCTS ---
        Product(
            name="Electrolux Professional Undercounter Commercial Glasswasher",
            slug="electrolux-undercounter-commercial-glasswasher",
            model="EGW 30",
            category_slug="warewashing",
            brand="Electrolux",
            description="Premium commercial glasswasher from Electrolux Professional. 120-second sanitize wash cycle with guaranteed 84°C hygienic rinse, sparkling clean crystal glasses, and built-in peristaltic detergent dosing.",
            features=json.dumps([
                "Guaranteed 84°C sanitizing rinse",
                "Cleans up to 30 standard 400x400mm racks / 480 glasses per hour",
                "Double skin insulated cabinet reduces noise to 60 dB",
                "Integrated atmospheric boiler with rinse booster pump"
            ]),
            specs=json.dumps({
                "Manufacturer Brand": "Electrolux Professional",
                "Model": "EGW 30",
                "Rack Size": "400 x 400 mm",
                "Cycle Time": "120 seconds",
                "Power": "3.3 kW, 230V Single Phase",
                "Dimensions": "460 x 565 x 715 mm"
            }),
            price_estimate=125000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        )
    ]
    db.add_all(products)
    db.commit()

    # 3. TRAINING MODULES
    training_modules = [
        TrainingModule(
            title="Commercial Barista Specialist & Espresso Calibration Certification",
            slug="commercial-barista-specialist-masterclass",
            level="Comprehensive (All Levels)",
            category="Barista & Beverage",
            duration="3 Days Intensive (24 Hours)",
            description="Hands-on certification for cafe staff and baristas on La Marzocco, La Cimbali, and Fiorenzato equipment. Learn extraction ratios, grinder calibration, milk microfoam texture, high-speed multi-order speed workflow, and machine maintenance.",
            certification="Certified Commercial Barista Specialist",
            badge="Top Industry Rated",
            image_url="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
            syllabus=json.dumps([
                {"day": 1, "topic": "Coffee Chemistry, Dialing-in & Grinder Burrs", "hours": "8 hrs", "hands_on": "Dialing in roasts to 1:2 extraction ratio within 25-30s on Fiorenzato grinders"},
                {"day": 2, "topic": "Milk Microfoam Aeration & Latte Art Patterns", "hours": "8 hrs", "hands_on": "Texturing velvety microfoam at 62°C, heart and rosetta pours"},
                {"day": 3, "topic": "Peak-Hour Rush Speed Workflow & Preventive Maintenance", "hours": "8 hrs", "hands_on": "Simulated 50 cups/hour rush, shower screen backflushing, group gasket replacement"}
            ]),
            is_featured=True
        ),
        TrainingModule(
            title="Commercial Combi Steam Oven Culinary Operations & Menu Programming",
            slug="combi-oven-culinary-operations",
            level="Professional Chef Level",
            category="Combi Cooking & Ovens",
            duration="2 Days (16 Hours)",
            description="Empower your kitchen brigade to master multi-rack cooking, Delta-T overnight low-temperature cooking, moisture humidity control, and standardized recipe programming on modern touchscreen combi ovens.",
            certification="Master Combi Operator Certificate",
            badge="Culinary Excellence",
            image_url="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80",
            syllabus=json.dumps([
                {"day": 1, "topic": "Steam Modes, Dry Convection & Combined Humidity Dynamics", "hours": "8 hrs", "hands_on": "Cooking 4 different proteins and delicate vegetables simultaneously without flavor transfer"},
                {"day": 2, "topic": "Recipe Cloud Programming, Delta-T Braising & Auto-Clean Protocols", "hours": "8 hrs", "hands_on": "Configuring custom menu buttons and HACCP temperature logging exports"}
            ]),
            is_featured=True
        ),
        TrainingModule(
            title="QSR Burger Station & Pitco Fryer Oil Management",
            slug="qsr-burger-station-oil-management",
            level="QSR Crew & Line Managers",
            category="QSR & Fast Casual",
            duration="2 Days (14 Hours)",
            description="Designed for burger chains and fast-food outlets. Covers Toastmaster contact bun caramelization, Pitco fryer oil filtration protocols that double oil life, and heated holding drawer food safety.",
            certification="Certified QSR Line Technician",
            badge="Cost & Yield Optimization",
            image_url="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
            syllabus=json.dumps([
                {"day": 1, "topic": "Toastmaster Bun Caramelization Platen Setup & Patty Searing", "hours": "7 hrs", "hands_on": "Achieving golden caramel seal on 200 buns in 4 minutes flat"},
                {"day": 2, "topic": "Pitco Fryer Oil Filtration Cycles & Holding Cabinet Timing", "hours": "7 hrs", "hands_on": "Measuring TPM (Total Polar Materials), hot oil pump filtering, zero-grease station sanitization"}
            ]),
            is_featured=True
        )
    ]
    db.add_all(training_modules)
    db.commit()

    # 4. BLOG POSTS
    blog_posts = [
        BlogPost(
            title="How to Setup a 100-Order/Hour Burger Joint: Equipment Checklist & Layout",
            slug="how-to-setup-burger-joint-equipment-checklist",
            excerpt="Planning a commercial burger brand? Here is the exact equipment breakdown from Toastmaster contact bun toasters to Pitco 35C+ gas fryers that power top burger chains.",
            content="""### The Anatomy of a High-Output Commercial Burger Station

A high-volume burger joint is won or lost in seconds. The difference between a profitable burger kitchen and a bottlenecked disaster comes down to three equipment pillars: **heat recovery**, **bun caramelization**, and **oil filtration**.

#### 1. Toastmaster Contact Bun Toasters: The Secret to No Soggy Buns
Most novice restaurant owners try to toast burger buns in standard conveyor ovens or on the flat-top griddle. Here is why that fails during a rush:
- Flat-top griddles take up valuable meat-searing surface area.
- Standard conveyor toasters dry out the bun breadcrumb rather than caramelizing the face.
A **Toastmaster vertical contact bun toaster** compresses the bun face against a 260°C heated platen for exactly 12 seconds. This creates a caramelized barrier of butter sugars that stops hamburger juice from soaking into the bread.

#### 2. Pitco Gas Fryers with Cold Zone Traps
Cooking oil is one of the top ongoing expenses for any fast-casual kitchen. The Pitco 35C+ features deep cold zones where crumbs settle without scorching, doubling the life of your frying oil.

#### 3. Chilled Prep Counters with Gastronorm Rails
Keep pickles, sliced tomatoes, cheeses, and special sauces within arm's reach at +4°C in a Hoshizaki or Celfrost prep counter. Line cooks save up to 15 seconds per burger assembly.

Talk to our turnkey engineering team for comprehensive CAD layouts, MEP drawings, and equipment selection.""",
            category="QSR & Kitchen Design",
            cover_image="https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
            read_time="6 min read"
        ),
        BlogPost(
            title="5 Costly Commercial Kitchen Electrical & MEP Mistakes to Avoid Before Fit-Out",
            slug="commercial-kitchen-electrical-mep-mistakes",
            excerpt="From 3-phase load miscalculations to grease trap pipe sizing, learn the critical engineering requirements that save lakhs in renovation re-work.",
            content="""### The MEP Foundation of a Commercial Kitchen

Before you pour concrete or order stainless equipment, your Mechanical, Electrical, and Plumbing (MEP) schematics must be locked down with pinpoint accuracy.

#### Mistake 1: Ignoring 3-Phase vs. Single-Phase Power Allotment
Heavy commercial appliances—such as 10-tray combi ovens (18.5 kW), twin-tank fryers, and pass-through dishwashers (9.5 kW)—strictly require 415V 3-phase connections. Commercial kitchen operators who do not assess their connected sanction load end up with tripping main MCBs on opening night.

#### Mistake 2: Undersizing Kitchen Exhaust Hood CFM
Commercial fryers and flame grills produce intense heat, carbon smoke, and aerosolized grease. An undersized exhaust fan causes radiant heat buildup, pushing kitchen temperatures over 45°C and causing refrigeration compressors to overwork and fail prematurely.

#### Mistake 3: Overlooking Water Softening for Espresso & Combi Steamers
Boiler equipment hates scale. Hard water deposits coat heating elements in coffee boilers and steam generators, cutting heat efficiency by 30% and voiding manufacturer warranties. Always factor in a dedicated commercial reverse osmosis or water softener.

Connect with our turnkey team for comprehensive CAD layouts, MEP drawings, and equipment selection.""",
            category="Engineering & MEP",
            cover_image="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80",
            read_time="5 min read"
        )
    ]
    db.add_all(blog_posts)
    db.commit()

    # 5. WIZARD PRESETS (USING REAL COMMERCIAL BRANDS)
    wizard_presets = [
        WizardPreset(
            concept_key="burger_joint",
            title="Gourmet Burger Joint & QSR",
            subtitle="Engineered for rapid order-to-table turnaround, high-yield frying, and perfectly caramelized buns.",
            tagline="50 to 500+ burgers/day",
            description="Optimized layout featuring Toastmaster contact bun toasters, Pitco commercial gas/electric fryers, Hoshizaki/Celfrost refrigerated prep counters, and Celfrost upright freezers.",
            equipment_presets=json.dumps({
                "small": [
                    {"name": "Toastmaster Contact Bun Toaster (600 buns/hr)", "qty": 1, "kw": 2.2, "category": "Bun Toasting", "est_cost": 65000, "must_have": True},
                    {"name": "Pitco 35C+ Commercial Gas Fryer (18L)", "qty": 1, "kw": 0.1, "category": "Frying Station", "est_cost": 108000, "must_have": True},
                    {"name": "Heavy Duty 600mm Flat-top Chrome Griddle", "qty": 1, "kw": 8.0, "category": "Burger Searing", "est_cost": 95000, "must_have": True},
                    {"name": "Celfrost 2-Door Refrigerated Burger Prep Counter (1.2m)", "qty": 1, "kw": 0.35, "category": "Assembly", "est_cost": 68000, "must_have": True},
                    {"name": "Celfrost Single-Door Upright Deep Freezer (-20°C)", "qty": 1, "kw": 0.65, "category": "Storage", "est_cost": 62000, "must_have": True}
                ],
                "medium": [
                    {"name": "Toastmaster High-Speed Contact Bun Toaster (1200 buns/hr)", "qty": 1, "kw": 2.8, "category": "Bun Toasting", "est_cost": 85000, "must_have": True},
                    {"name": "Pitco 35C+ Commercial Gas Fryers (Dual Tank)", "qty": 2, "kw": 0.2, "category": "Frying Station", "est_cost": 216000, "must_have": True},
                    {"name": "TurboChef Sota High-Speed Rapid Cook Oven", "qty": 1, "kw": 6.2, "category": "Rapid Toast/Melt", "est_cost": 485000, "must_have": True},
                    {"name": "Hoshizaki 2-Door Under Counter Prep Chiller (RTWH150MS4)", "qty": 1, "kw": 0.45, "category": "Assembly", "est_cost": 71894, "must_have": True},
                    {"name": "Celfrost 2-Door Upright Commercial Chiller (GN 650 TN)", "qty": 1, "kw": 0.45, "category": "Cold Storage", "est_cost": 78000, "must_have": True},
                    {"name": "Celfrost 2-Door Upright Commercial Deep Freezer", "qty": 1, "kw": 0.95, "category": "Frozen Storage", "est_cost": 92000, "must_have": True}
                ],
                "large": [
                    {"name": "Toastmaster High-Speed Contact Bun Toasters", "qty": 2, "kw": 5.6, "category": "Bun Toasting", "est_cost": 170000, "must_have": True},
                    {"name": "Pitco Commercial Multi-Vat Fryers with Built-in Filtration", "qty": 2, "kw": 0.4, "category": "Frying Station", "est_cost": 340000, "must_have": True},
                    {"name": "TurboChef Sota Rapid Cook Ovens", "qty": 2, "kw": 12.4, "category": "Rapid Cooking", "est_cost": 970000, "must_have": True},
                    {"name": "Hoshizaki 3-Door Under Counter Prep Stations (Dual Units)", "qty": 2, "kw": 0.9, "category": "Assembly", "est_cost": 196000, "must_have": True},
                    {"name": "Celfrost Walk-in Modular Cold Room (10x8 ft)", "qty": 1, "kw": 3.5, "category": "Bulk Cold Storage", "est_cost": 340000, "must_have": True},
                    {"name": "Electrolux Professional Pass-Through Dishwasher", "qty": 1, "kw": 9.5, "category": "Sanitation", "est_cost": 240000, "must_have": True}
                ]
            }),
            utility_estimates=json.dumps({
                "small": {"total_kw": 12.0, "plumbing_inlets": 2, "drain_points": 2, "recommended_sqft": "250 - 450 sq ft", "exhaust_cfm": 2800},
                "medium": {"total_kw": 18.0, "plumbing_inlets": 4, "drain_points": 3, "recommended_sqft": "450 - 800 sq ft", "exhaust_cfm": 4500},
                "large": {"total_kw": 42.0, "plumbing_inlets": 6, "drain_points": 5, "recommended_sqft": "800 - 1800 sq ft", "exhaust_cfm": 8200}
            }),
            base_budget_min=390000,
            base_budget_max=1900000
        ),
        WizardPreset(
            concept_key="artisanal_cafe",
            title="Specialty Coffee Cafe & Roastery",
            subtitle="Precision espresso machinery, silent grinders, and Marco underbar water fonts.",
            tagline="100 to 800+ coffee cups/day",
            description="Designed for high-aesthetic specialty cafes with La Marzocco or La Cimbali espresso machines, Fiorenzato grinders, Marco hot water fonts, and Electrolux glasswashers.",
            equipment_presets=json.dumps({
                "small": [
                    {"name": "La Cimbali M26 TE 2-Group Commercial Espresso Machine", "qty": 1, "kw": 4.5, "category": "Espresso", "est_cost": 420000, "must_have": True},
                    {"name": "Cunill Tranquilo II Silent Commercial Coffee Grinder", "qty": 1, "kw": 0.3, "category": "Grinding", "est_cost": 44000, "must_have": True},
                    {"name": "Timemore Black Mirror Commercial Espresso Scale", "qty": 1, "kw": 0.05, "category": "Weighing", "est_cost": 8500, "must_have": True},
                    {"name": "MHW-3BOMBER 58.5mm Calibrated Constant Pressure Tamper", "qty": 1, "kw": 0.0, "category": "Barista Gear", "est_cost": 6500, "must_have": True},
                    {"name": "Celfrost 60kg Gourmet Ice Maker", "qty": 1, "kw": 0.65, "category": "Ice Station", "est_cost": 89000, "must_have": True}
                ],
                "medium": [
                    {"name": "La Marzocco Linea Classic S 2-Group Commercial Espresso Machine", "qty": 1, "kw": 4.6, "category": "Espresso", "est_cost": 780000, "must_have": True},
                    {"name": "Fiorenzato F64 Evo Electronic Coffee Grinders (Dual Units)", "qty": 2, "kw": 0.7, "category": "Grinding", "est_cost": 156000, "must_have": True},
                    {"name": "Marco MIX UC4 Under-Counter Water Boiler & Font", "qty": 1, "kw": 2.4, "category": "Water Station", "est_cost": 115000, "must_have": True},
                    {"name": "Electrolux Professional Undercounter Glasswasher", "qty": 1, "kw": 3.3, "category": "Sanitation", "est_cost": 125000, "must_have": True},
                    {"name": "Hoshizaki Under Counter Prep Chiller (RTWH126MS4)", "qty": 1, "kw": 0.35, "category": "Milk Storage", "est_cost": 62315, "must_have": True},
                    {"name": "Celfrost 3-Door Back Bar Glass Chiller (RBW 135)", "qty": 1, "kw": 0.28, "category": "Cold Display", "est_cost": 45114, "must_have": True}
                ],
                "large": [
                    {"name": "La Marzocco Linea Classic S 3-Group Commercial Espresso Machine", "qty": 1, "kw": 6.8, "category": "Espresso", "est_cost": 950000, "must_have": True},
                    {"name": "Fiorenzato F64 Evo Grinders + Mahlkonig EK43 Retail Grinder", "qty": 3, "kw": 1.9, "category": "Grinding", "est_cost": 380000, "must_have": True},
                    {"name": "Marco MIX UC4 Precision Water Fonts (Dual Fonts)", "qty": 2, "kw": 4.8, "category": "Water Station", "est_cost": 230000, "must_have": True},
                    {"name": "Electrolux Professional Undercounter Glasswasher", "qty": 1, "kw": 3.3, "category": "Sanitation", "est_cost": 125000, "must_have": True},
                    {"name": "TurboChef Sota High-Speed Rapid Cook Oven", "qty": 1, "kw": 6.2, "category": "Bakery / Brunch", "est_cost": 485000, "must_have": True},
                    {"name": "Celfrost 120kg Gourmet Ice Cube Maker", "qty": 1, "kw": 1.1, "category": "Ice Station", "est_cost": 135000, "must_have": True}
                ]
            }),
            utility_estimates=json.dumps({
                "small": {"total_kw": 6.0, "plumbing_inlets": 3, "drain_points": 2, "recommended_sqft": "200 - 400 sq ft", "exhaust_cfm": 800},
                "medium": {"total_kw": 12.0, "plumbing_inlets": 4, "drain_points": 3, "recommended_sqft": "400 - 900 sq ft", "exhaust_cfm": 1500},
                "large": {"total_kw": 25.0, "plumbing_inlets": 6, "drain_points": 5, "recommended_sqft": "900 - 2200 sq ft", "exhaust_cfm": 2800}
            }),
            base_budget_min=560000,
            base_budget_max=2400000
        )
    ]
    db.add_all(wizard_presets)
    db.commit()

    logger.info("Database reset and seeded with 100% authentic commercial brands.")
