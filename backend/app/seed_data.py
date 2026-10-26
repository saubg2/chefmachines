import json
import logging
from sqlalchemy.orm import Session
from .models import Category, Product, TrainingModule, BlogPost, WizardPreset

logger = logging.getLogger("seed_data")

def seed_initial_data(db: Session):
    # Check if already seeded
    if db.query(Product).count() > 0:
        logger.info("Database already seeded with products.")
        return

    logger.info("Seeding initial database with comprehensive ChefMachines commercial catalog...")

    # 1. CATEGORIES
    categories = [
        Category(
            name="QSR & Fast Food Specialists",
            slug="qsr-fast-food",
            image_url="https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
            description="High-output fryers, contact bun warmers, burger griddles, holding cabinets, and condiment dispensers designed for speed.",
            sort_order=1
        ),
        Category(
            name="Commercial Refrigeration & Freezers",
            slug="refrigeration-freezers",
            image_url="https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80",
            description="Upright reach-in chillers, deep freezers, blast chillers, prep tables, and walk-in cold rooms engineered for 43°C ambient climates.",
            sort_order=2
        ),
        Category(
            name="Combi Ovens & Heavy Cooking",
            slug="cooking-ovens",
            image_url="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80",
            description="State-of-the-art touchscreen combi steamers, conveyor pizza ovens, high-speed accelerated cookers, and heavy induction ranges.",
            sort_order=3
        ),
        Category(
            name="Espresso & Beverage Stations",
            slug="espresso-beverage",
            image_url="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
            description="Dual boiler commercial espresso machines, on-demand precision grinders, gourmet ice machines, and commercial blenders.",
            sort_order=4
        ),
        Category(
            name="Bakery & Food Preparation",
            slug="bakery-prep",
            image_url="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
            description="Planetary mixers, spiral dough kneaders, dough sheeters, proofing cabinets, and high-precision food processors.",
            sort_order=5
        ),
        Category(
            name="Warewashing & Hygiene Systems",
            slug="warewashing",
            image_url="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80",
            description="High-temperature hood type dishwashers, undercounter glasswashers, and sanitize-cycle pot washers with water softeners.",
            sort_order=6
        )
    ]
    db.add_all(categories)
    db.commit()

    # 2. PRODUCTS
    products = [
        # QSR Burger Joint Equipment
        Product(
            name="ChefMachines TurboBake High-Speed Contact Bun Warmer",
            slug="turbobake-high-speed-contact-bun-warmer",
            model="CM-BW-1200",
            category_slug="qsr-fast-food",
            brand="ChefMachines ProSeries",
            description="Ultra-rapid vertical contact bun toaster engineered for burger joints and QSRs. Delivers perfectly caramelized buns in 12 seconds with dual-platen digital temperature control, preventing soggy burgers and sealing in juices.",
            features=json.dumps([
                "1,200 buns per hour throughput capacity",
                "Adjustable compression platen for brioche, sesame, and potato buns",
                "Non-stick PTFE release sheets included",
                "Digital PID temperature control up to 260°C",
                "Removable stainless crumb tray for rapid sanitization"
            ]),
            specs=json.dumps({
                "Power": "2.8 kW, 230V Single Phase",
                "Dimensions": "580 x 290 x 590 mm",
                "Toast Cycle": "12 to 24 seconds adjustable",
                "Capacity": "Up to 1,200 bun halves/hr",
                "Net Weight": "28 kg",
                "Certifications": "CE, NSF, Commercial Safety Grade"
            }),
            price_estimate=85000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),
        Product(
            name="ChefMachines Twin-Well Commercial Electric Deep Fryer with Filtration",
            slug="twin-well-commercial-fryer-filtration",
            model="CM-DF-28L-AUTO",
            category_slug="qsr-fast-food",
            brand="ChefMachines ProSeries",
            description="Heavy-duty 28-liter split-vat commercial deep fryer with built-in motorized oil filtration system. Extends cooking oil lifespan by up to 50%, maintaining crisp French fries, chicken tenders, and patties with rapid temperature recovery.",
            features=json.dumps([
                "Dual 14L + 14L independently controlled oil tanks",
                "Integrated 5-minute automated oil filtration cycle",
                "Cold zone sediment trap prevents carbonization",
                "High-precision computerized melt cycle & cook timers",
                "Heavy-gauge 304 food-grade stainless steel fabrication"
            ]),
            specs=json.dumps({
                "Power": "18 kW (3-Phase 415V)",
                "Capacity": "28 Liters (14L + 14L)",
                "Oil Temp Range": "60°C - 200°C with safety cutoff",
                "Dimensions": "400 x 800 x 1150 mm",
                "Basket Configuration": "4 half-size stainless fry baskets",
                "Filtration Pump": "1/3 HP motorized internal pump"
            }),
            price_estimate=195000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),
        Product(
            name="ChefMachines Quad-Port Heated Condiment & Sauce Dispenser",
            slug="quad-port-heated-condiment-dispenser",
            model="CM-CD-4X",
            category_slug="qsr-fast-food",
            brand="ChefMachines ProSeries",
            description="Precision stainless steel portion-control condiment pump station. Includes warming wells for melted cheese, BBQ sauce, and ambient pumps for ketchup and mustard. Delivers consistent 15ml-30ml metered dispense per pump.",
            features=json.dumps([
                "4 heavy-duty stainless steel metered pump nozzles",
                "Independent dual dry-well temperature heating zones",
                "Accepts standard deep 1/6 Gastronorm stainless pans",
                "Drip-free silicone check valves"
            ]),
            specs=json.dumps({
                "Power": "800W, 230V Single Phase",
                "Capacity": "4 x 3.5L Gastronorm canisters",
                "Dimensions": "520 x 360 x 420 mm",
                "Dispense Volume": "15ml, 20ml, 30ml adjustable stroke"
            }),
            price_estimate=48000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80",
            is_featured=False
        ),
        Product(
            name="ChefMachines ChromeMax Heavy Duty Burger Griddle & Clamshell",
            slug="chromemax-heavy-duty-burger-griddle",
            model="CM-CG-900",
            category_slug="qsr-fast-food",
            brand="ChefMachines ProSeries",
            description="Mirror-finish 20mm hard chrome plate flat-top griddle with upper pneumatic clamshell press option. Slashes patty cook times from 4 minutes to 90 seconds while sealing in moisture and drastically lowering kitchen radiant heat.",
            features=json.dumps([
                "Mirror hard-chrome cooking plate prevents food sticking",
                "Even surface heat distribution within ±2°C",
                "Removable dual grease troughs with 5L capacity",
                "3 independent thermostat heat zones across 900mm width"
            ]),
            specs=json.dumps({
                "Power": "12 kW, 415V 3-Phase (or Gas 75,000 BTU)",
                "Cooking Surface": "900 x 600 mm",
                "Plate Thickness": "20mm machined carbon steel with hard chrome",
                "Dimensions": "900 x 800 x 450 mm"
            }),
            price_estimate=165000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),

        # Commercial Refrigeration
        Product(
            name="ChefMachines ArcticPro 2-Door Commercial Upright Deep Freezer",
            slug="arcticpro-2-door-commercial-deep-freezer",
            model="CM-UF-1200L",
            category_slug="refrigeration-freezers",
            brand="ChefMachines ArcticPro",
            description="Tropicalized commercial upright freezer engineered specifically for demanding commercial kitchens operating up to 43°C ambient temperature. Features ventilated dynamic air cooling, auto-defrost, and digital temperature control down to -22°C.",
            features=json.dumps([
                "High-ambient tropicalized Danfoss/Secop compressor",
                "Digital Dixell temperature controller with high/low alarms",
                "Self-closing doors with magnetic 90° dwell stay-open feature",
                "Heavy-duty adjustable PVC-coated wire shelves (GN 2/1 compatible)",
                "R290 Eco-friendly high efficiency refrigerant"
            ]),
            specs=json.dumps({
                "Volume": "1,200 Liters (Gross)",
                "Temperature Range": "-18°C to -22°C",
                "Power": "950W, 230V 50Hz",
                "Dimensions": "1340 x 810 x 2010 mm",
                "Shelves": "6 heavy-duty GN 2/1 shelves",
                "Insulation": "70mm high-density cyclopentane foam"
            }),
            price_estimate=145000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),
        Product(
            name="ChefMachines 3-Door Refrigerated Burger Prep Counter with GN Pans",
            slug="refrigerated-burger-prep-counter-3-door",
            model="CM-PC-1800",
            category_slug="refrigeration-freezers",
            brand="ChefMachines ArcticPro",
            description="The ultimate speed-line assembly station for burger joints, delis, and sandwich bars. Includes chilled top ingredient rail for 8 x 1/3 GN pans with insulated night cover, plus a full-length food-grade polyethylene cutting board and refrigerated under-storage.",
            features=json.dumps([
                "Holds 8 x 1/3 GN pans kept chilled at +2°C to +8°C",
                "Full-depth 350mm high-density cutting board",
                "Undercounter refrigerated storage for 450L bulk reserves",
                "Fan-assisted cooling maintains ingredients even with open lids during rush"
            ]),
            specs=json.dumps({
                "Length": "1800 mm",
                "Dimensions": "1800 x 700 x 1050 mm",
                "Volume": "450 Liters refrigerated undercounter",
                "Power": "420W, 230V",
                "Temperature": "+2°C to +8°C"
            }),
            price_estimate=115000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80",
            is_featured=False
        ),
        Product(
            name="ChefMachines 10-Tray Commercial Blast Chiller & Shock Freezer",
            slug="10-tray-commercial-blast-chiller",
            model="CM-BC-10T",
            category_slug="refrigeration-freezers",
            brand="ChefMachines ArcticPro",
            description="Essential for commercial HACCP compliance, cloud kitchens, and central commissaries. Rapidly pulls core food temperature from +90°C down to +3°C in under 90 minutes (chilling) or -18°C in under 240 minutes (freezing), locking in moisture and preventing bacterial growth.",
            features=json.dumps([
                "Core temperature multipoint probe included",
                "Blast chill capacity: 45 kg per cycle (+90°C to +3°C in 90 min)",
                "Shock freeze capacity: 30 kg per cycle (+90°C to -18°C in 240 min)",
                "Pre-programmed soft & hard chill cycles for delicate pastries or dense meats"
            ]),
            specs=json.dumps({
                "Capacity": "10 Trays GN 1/1 or 600x400 Bakery Sheets",
                "Power": "2.2 kW, 415V 3-Phase",
                "Refrigerant": "R452A / R404A",
                "Dimensions": "800 x 830 x 1650 mm"
            }),
            price_estimate=285000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),

        # Combi Ovens & Cooking
        Product(
            name="ChefMachines MasterTouch 10-Tray Combi Steam Oven",
            slug="mastertouch-10-tray-combi-steam-oven",
            model="CM-CS-101E",
            category_slug="cooking-ovens",
            brand="ChefMachines CookTech",
            description="Premium Android-powered 10-inch capacitive touchscreen commercial combi oven. Features boilerless direct steam injection, 3-speed reversible fans, automated wash cycles, and multi-timer rack cooking. Replaces steamers, convection ovens, and braising pans in a single footprint.",
            features=json.dumps([
                "10-inch high-resolution touchscreen with custom picture recipe storage",
                "Delta-T cooking and low-temperature overnight slow roasting",
                "4 automatic self-cleaning wash programs with integrated chemical tablets",
                "Core needle temperature probe with 4 reading zones",
                "Triple-glazed low-emissivity glass door reduces exterior heat loss"
            ]),
            specs=json.dumps({
                "Capacity": "10 x GN 1/1 pans (68mm rack pitch)",
                "Meals per Day": "120 - 250 meals",
                "Power": "18.5 kW, 415V 3-Phase",
                "Steam System": "Direct injection instant steam generator",
                "Dimensions": "875 x 795 x 1060 mm",
                "Water Connection": "3/4 inch treated soft water"
            }),
            price_estimate=520000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),
        Product(
            name="ChefMachines SpeedFire 32-Inch Commercial Conveyor Pizza Oven",
            slug="speedfire-32-inch-commercial-conveyor-pizza-oven",
            model="CM-PO-3280",
            category_slug="cooking-ovens",
            brand="ChefMachines CookTech",
            description="High-velocity impinged air conveyor oven for high-volume pizzerias, burger joints (for toasted melts), and cafes. Delivers perfectly baked 12-inch or 16-inch pizzas with crisp crusts and bubbling cheese in just 4.5 minutes continuous flow.",
            features=json.dumps([
                "32-inch wide stainless steel wire mesh conveyor belt",
                "Reversible belt direction with digital bake timer (2 to 30 mins)",
                "Microprocessor-controlled impingement fingers top and bottom",
                "Stackable up to 3 decks for exponential output without added floor space"
            ]),
            specs=json.dumps({
                "Output": "80-100 x 12-inch pizzas per hour",
                "Power": "24 kW, 415V 3-Phase (Gas option 110,000 BTU)",
                "Dimensions": "2050 x 1280 x 1120 mm",
                "Bake Chamber Length": "1000 mm"
            }),
            price_estimate=475000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
            is_featured=False
        ),

        # Espresso & Beverage
        Product(
            name="ChefMachines BaristaCraft Dual-Boiler 2-Group Commercial Espresso Machine",
            slug="baristacraft-dual-boiler-2-group-espresso-machine",
            model="CM-EM-2G-PRO",
            category_slug="espresso-beverage",
            brand="ChefMachines CafeCraft",
            description="The workhorse of specialty coffee shops and cafes. Independent insulated coffee boilers for each saturated group head, independent steam boiler, PID digital temperature stability within ±0.2°C, and cool-touch multi-directional steam wands.",
            features=json.dumps([
                "Dual independent 0.9L coffee boilers + 11.5L heavy copper steam boiler",
                "PID temperature control per group with OLED display",
                "Volumetric touch pads with 4 programmable doses per group",
                "Cool-touch double-walled steam wands with ergonomic lever actuation",
                "Integrated barista work LED lights and cup warmer tray"
            ]),
            specs=json.dumps({
                "Groups": "2 Saturated Group Heads",
                "Peak Hourly Capacity": "180 - 240 espresso shots/hr",
                "Power": "4.5 kW, 230V / 400V",
                "Boiler Capacity": "11.5 Liters steam + 2x 0.9L coffee",
                "Dimensions": "820 x 560 x 540 mm",
                "Net Weight": "72 kg"
            }),
            price_estimate=340000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),
        Product(
            name="ChefMachines FrostFlow 120kg Gourmet Ice Cube Maker",
            slug="frostflow-120kg-gourmet-ice-cube-maker",
            model="CM-ICE-120G",
            category_slug="espresso-beverage",
            brand="ChefMachines CafeCraft",
            description="Automated spray-system crystal clear gourmet ice maker for busy cafes, cocktail bars, and hotels. Produces hard, slow-melting thimble-shaped ice cubes that keep beverages cold without diluting flavor.",
            features=json.dumps([
                "120 kg daily ice production with 55 kg insulated storage bin",
                "Self-contained air-cooled condenser with washable dust filter",
                "Agion antimicrobial interior lining prevents slime and mold",
                "R290 ecological refrigerant"
            ]),
            specs=json.dumps({
                "Production Capacity": "120 kg / 24 hours",
                "Bin Storage": "55 kg",
                "Ice Type": "Crystal Clear Gourmet Thimble (20g)",
                "Power": "1.1 kW, 230V",
                "Dimensions": "740 x 600 x 1020 mm"
            }),
            price_estimate=135000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
            is_featured=False
        ),

        # Bakery & Prep
        Product(
            name="ChefMachines SpiralMax 25kg Industrial Dough Kneader",
            slug="spiralmax-25kg-industrial-dough-kneader",
            model="CM-SK-25",
            category_slug="bakery-prep",
            brand="ChefMachines BakeryPro",
            description="Two-speed commercial spiral mixer designed for intensive pizza dough, artisan sourdough, and brioche kneading without heating the dough gluten structure. Heavy stainless steel safety guard with auto shut-off.",
            features=json.dumps([
                "Dual timers for low and high speed automatic transitions",
                "25 kg flour / 40 kg dough batch capacity",
                "Solid 304 stainless steel bowl, spiral arm, and dividing bar",
                "Silent heavy-duty dual belt drive transmission"
            ]),
            specs=json.dumps({
                "Bowl Volume": "53 Liters",
                "Dough Capacity": "40 kg finished dough",
                "Power": "2.2 kW, 415V 3-Phase",
                "Dimensions": "580 x 920 x 1140 mm",
                "Weight": "165 kg"
            }),
            price_estimate=175000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
            is_featured=True
        ),

        # Warewashing
        Product(
            name="ChefMachines AquaSan 60-Rack Pass-Through Hood Dishwasher",
            slug="aquasan-60-rack-pass-through-hood-dishwasher",
            model="CM-DW-60H",
            category_slug="warewashing",
            brand="ChefMachines AquaSan",
            description="High-throughput commercial hood-type dishwasher with 60-second, 90-second, and 120-second wash cycles. Features guaranteed 85°C hygienic rinse with integrated atmospheric boiler and rinse pump, sanitizing up to 1,200 plates per hour.",
            features=json.dumps([
                "Cleans up to 60 standard 500x500mm racks / 1,200 plates per hour",
                "Automatic hood start mechanism",
                "Deep-drawn seamless wash tank with double filtration filters",
                "Built-in peristaltic detergent and rinse aid dosing dispensers"
            ]),
            specs=json.dumps({
                "Capacity": "60 racks/hr",
                "Rinse Temperature": "85°C (HACCP compliant sanitization)",
                "Power": "9.5 kW, 415V 3-Phase",
                "Water Consumption": "2.4 Liters per cycle",
                "Dimensions": "650 x 755 x 1500 mm (closed) / 1950 mm (open)"
            }),
            price_estimate=240000.0,
            is_rfq_only=True,
            image_url="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80",
            is_featured=False
        )
    ]
    db.add_all(products)
    db.commit()

    # 3. TRAINING MODULES
    training_modules = [
        TrainingModule(
            title="Commercial Barista Specialist & Espresso Calibration Masterclass",
            slug="commercial-barista-specialist-masterclass",
            level="Comprehensive (All Levels)",
            category="Barista & Beverage",
            duration="3 Days Intensive (24 Hours)",
            description="Complete hands-on certification for cafe staff and baristas. Learn extraction theory, brew ratios, TDS measurement, water chemistry, milk microfoam science, high-speed multi-order workflow, and emergency grinder/machine troubleshooting.",
            certification="ChefMachines Certified Barista Specialist (CBCS)",
            badge="Top Industry Rated",
            image_url="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
            syllabus=json.dumps([
                {"day": 1, "topic": "Coffee Chemistry, Dialing-in & Grinder Burrs", "hours": "8 hrs", "hands_on": "Dialing in 5 roasts to 1:2 extraction ratio within 25-30s"},
                {"day": 2, "topic": "Milk Microfoam Aeration & Latte Art Patterns", "hours": "8 hrs", "hands_on": "Texture velvety microfoam at 62°C, heart, rosetta, and tulip pours"},
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
            certification="ChefMachines Master Combi Operator Certificate",
            badge="Culinary Excellence",
            image_url="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80",
            syllabus=json.dumps([
                {"day": 1, "topic": "Steam Modes, Dry Convection & Combined Humidity Dynamics", "hours": "8 hrs", "hands_on": "Cooking 4 different proteins and delicate vegetables simultaneously without flavor transfer"},
                {"day": 2, "topic": "Recipe Cloud Programming, Delta-T Braising & Auto-Clean Protocols", "hours": "8 hrs", "hands_on": "Configuring 20 custom menu buttons and HACCP temperature logging exports"}
            ]),
            is_featured=True
        ),
        TrainingModule(
            title="High-Output QSR Burger Station & Oil Management Mastery",
            slug="qsr-burger-station-oil-management",
            level="QSR Crew & Line Managers",
            category="QSR & Fast Casual",
            duration="2 Days (14 Hours)",
            description="Designed specifically for burger joints and fast-food franchises. Covers bun contact caramelization, clamshell press timings, double-fryer oil filtration protocols that double oil life, and heated holding drawer food safety.",
            certification="ChefMachines Certified QSR Line Technician",
            badge="Cost & Yield Optimization",
            image_url="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
            syllabus=json.dumps([
                {"day": 1, "topic": "Bun Caramelization Platen Setup & Patty Searing Physics", "hours": "7 hrs", "hands_on": "Achieving golden caramel seal on 200 buns in 4 minutes flat"},
                {"day": 2, "topic": "Automated Oil Filtration Cycles & Holding Cabinet Timing", "hours": "7 hrs", "hands_on": "Measuring TPM (Total Polar Materials), hot oil pump filtering, zero-grease station sanitization"}
            ]),
            is_featured=True
        ),
        TrainingModule(
            title="Commercial Kitchen Cold Chain, HACCP & Preventive Maintenance 101",
            slug="cold-chain-haccp-preventive-maintenance",
            level="Kitchen Supervisors & Technicians",
            category="Maintenance & Safety",
            duration="1 Day (8 Hours)",
            description="Prevent costly food spoilage and sudden equipment breakdowns. Learn daily condenser coil brush-downs, door gasket inspections, defrost cycle scheduling, drainage clearing, and emergency triage for freezers and ice makers.",
            certification="ChefMachines Certified Equipment Caretaker",
            badge="Zero-Breakdown Guarantee",
            image_url="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80",
            syllabus=json.dumps([
                {"day": 1, "topic": "Refrigeration Diagnostics, Condenser Cleaning & Emergency Triage", "hours": "8 hrs", "hands_on": "Hands-on cleaning of condenser fins, testing defrost sensors, thermostat recalibration"}
            ]),
            is_featured=False
        )
    ]
    db.add_all(training_modules)
    db.commit()

    # 4. BLOG POSTS & RESOURCES
    blog_posts = [
        BlogPost(
            title="How to Setup a 100-Order/Hour Burger Joint: Complete Equipment Checklist & Layout",
            slug="how-to-setup-burger-joint-equipment-checklist",
            excerpt="Planning a commercial burger brand? Here is the exact equipment breakdown from high-speed contact bun warmers to twin-tank filtered fryers that power 500+ successful outlets.",
            content="""### The Anatomy of a High-Output Commercial Burger Station

A high-volume burger joint is won or lost in seconds. The difference between a profitable burger kitchen and a bottlenecked disaster comes down to three equipment pillars: **heat recovery**, **bun caramelization**, and **oil filtration**.

#### 1. Contact Bun Warmers: The Secret to No Soggy Buns
Most novice restaurant owners try to toast burger buns in standard conveyor ovens or on the flat-top griddle. Here is why that fails during a rush:
- Flat-top griddles take up valuable meat-searing surface area.
- Standard conveyor toasters dry out the bun breadcrumb rather than caramelizing the face.
A **vertical contact bun toaster** (like the ChefMachines CM-BW-1200) compresses the bun face against a 260°C heated platen for exactly 12 seconds. This creates a caramelized barrier of butter sugars that stops hamburger juice from soaking into the bread.

#### 2. Commercial Fryers with Motorized Oil Filtration
Cooking oil is one of the top ongoing expenses for any fast-casual kitchen. Crumbs that fall off fried chicken or fries settle at the bottom of the vat. If your fryer lacks an internal filtration pump, those crumbs scorch, turning the oil rancid within 3 days.
With automatic 5-minute filtration (running twice daily), commercial kitchens consistently cut their oil purchasing costs by 40% to 50% while serving golden, odorless fries.

#### 3. Chilled Prep Counters with Gastronorm Rails
Keep pickles, sliced tomatoes, cheeses, and special sauces within arm's reach at +4°C. An ergonomic refrigerated burger prep counter prevents line cooks from walking back and forth to reach-in chillers, saving up to 15 seconds per burger assembly.

#### Need a Custom 3D Layout & MEP Plan?
ChefMachines has delivered turnkey equipment for over 500 cafes and QSR chains across the country. Use our **Interactive Setup Wizard** or talk to our engineering team today.""",
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
Heavy commercial appliances—such as 10-tray combi ovens (18.5 kW), twin-tank fryers (18 kW), and pass-through dishwashers (9.5 kW)—strictly require 415V 3-phase connections. Commercial kitchen operators who do not assess their connected sanction load end up with tripping main MCBs on opening night.

#### Mistake 2: Undersizing Kitchen Exhaust Hood CFM
Commercial fryers and flame grills produce intense heat, carbon smoke, and aerosolized grease. An undersized exhaust fan causes radiant heat buildup, pushing kitchen temperatures over 45°C and causing refrigeration compressors to overwork and fail prematurely.

#### Mistake 3: Overlooking Water Softening for Espresso & Combi Steamers
Boiler equipment hates scale. Hard water deposits (calcium and magnesium) coat heating elements in coffee boilers and steam generators, cutting heat efficiency by 30% and voiding manufacturer warranties. Always factor in a dedicated commercial reverse osmosis or twin-tank water softener.

Connect with our turnkey team at ChefMachines for comprehensive CAD layouts, MEP drawings, and equipment selection.""",
            category="Engineering & MEP",
            cover_image="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80",
            read_time="5 min read"
        ),
        BlogPost(
            title="How We Powered 500+ Cafes and QSR Outlets: The ChefMachines Turnkey Methodology",
            slug="how-we-powered-500-cafes-chefmachines-case-study",
            excerpt="An inside look at our 360-degree turnkey approach: from initial conceptual layout and equipment fabrication to barista training and 24/7 AMC uptime.",
            content="""### 360-Degree Turnkey Kitchens: More Than Just Equipment Sales

Opening a commercial food business can be overwhelming when dealing with 15 different vendors—architects, stainless fabricators, equipment importers, barista trainers, and gas pipe fitters.

ChefMachines bridges every gap:
1. **Concept & Kitchen CAD Layout**: We design linear workflows ensuring cross-contamination zones (raw meat vs. ready-to-eat) are strictly isolated.
2. **Heavy-Duty Commercial Equipment Sourcing**: We stock, distribute, and calibrate the world's most reliable foodservice machines.
3. **Stainless Steel Custom Fabrication**: Custom 304 food-grade tabling, splashbacks, sink units, and exhaust canopies.
4. **Staff Training & Barista Academy**: We certify your staff so they operate the machines safely and extract peak flavor.
5. **Preventative AMC Support**: 24-hour service response with stocked spare parts so your kitchen never halts.

Explore our interactive setup wizard today and get an instant equipment list customized to your brand concept.""",
            category="Case Studies & Milestones",
            cover_image="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
            read_time="7 min read"
        )
    ]
    db.add_all(blog_posts)
    db.commit()

    # 5. WIZARD PRESETS
    wizard_presets = [
        WizardPreset(
            concept_key="burger_joint",
            title="Gourmet Burger Joint & Fast Casual",
            subtitle="Engineered for rapid order-to-table turnaround, high-yield frying, and perfectly caramelized buns.",
            tagline="50 to 500+ burgers/day",
            description="Optimized layout featuring contact bun toasters, twin-vat electric fryers with oil filtration, chrome-plate flat top griddles, refrigerated sandwich/burger prep stations, and sauce dispensers.",
            equipment_presets=json.dumps({
                "small": [
                    {"name": "TurboBake Contact Bun Warmer (600 buns/hr)", "qty": 1, "kw": 2.2, "category": "Bun Toasting", "est_cost": 65000, "must_have": True},
                    {"name": "Twin-Well 14L+14L Electric Deep Fryer", "qty": 1, "kw": 12.0, "category": "Frying Station", "est_cost": 125000, "must_have": True},
                    {"name": "Heavy Duty 600mm Flat-top Chrome Griddle", "qty": 1, "kw": 8.0, "category": "Burger Searing", "est_cost": 95000, "must_have": True},
                    {"name": "2-Door Refrigerated Burger Prep Counter (1.2m)", "qty": 1, "kw": 0.35, "category": "Assembly", "est_cost": 85000, "must_have": True},
                    {"name": "Quad-Port Condiment & Sauce Dispenser", "qty": 1, "kw": 0.8, "category": "Sauce Station", "est_cost": 48000, "must_have": True},
                    {"name": "Upright Single-Door Deep Freezer (-20°C)", "qty": 1, "kw": 0.65, "category": "Storage", "est_cost": 75000, "must_have": True}
                ],
                "medium": [
                    {"name": "TurboBake High-Speed Contact Bun Warmer (1200 buns/hr)", "qty": 1, "kw": 2.8, "category": "Bun Toasting", "est_cost": 85000, "must_have": True},
                    {"name": "Twin-Well 28L Commercial Fryer with Built-in Filtration", "qty": 1, "kw": 18.0, "category": "Frying Station", "est_cost": 195000, "must_have": True},
                    {"name": "ChromeMax 900mm Heavy Duty Burger Griddle with Clamshell", "qty": 1, "kw": 12.0, "category": "Burger Searing", "est_cost": 165000, "must_have": True},
                    {"name": "3-Door Refrigerated Burger Prep Counter with GN Rails (1.8m)", "qty": 1, "kw": 0.45, "category": "Assembly", "est_cost": 115000, "must_have": True},
                    {"name": "Quad-Port Heated Condiment Dispenser Station", "qty": 2, "kw": 1.6, "category": "Sauce Station", "est_cost": 96000, "must_have": True},
                    {"name": "ArcticPro 2-Door Upright Deep Freezer (1200L)", "qty": 1, "kw": 0.95, "category": "Frozen Storage", "est_cost": 145000, "must_have": True},
                    {"name": "ArcticPro 2-Door Upright Reach-in Chiller (1200L)", "qty": 1, "kw": 0.75, "category": "Chilled Storage", "est_cost": 125000, "must_have": True},
                    {"name": "Heated Fry Dump & Holding Station with Heat Lamp", "qty": 1, "kw": 1.2, "category": "Holding", "est_cost": 45000, "must_have": True}
                ],
                "large": [
                    {"name": "TurboBake Dual High-Speed Contact Bun Warmers", "qty": 2, "kw": 5.6, "category": "Bun Toasting", "est_cost": 170000, "must_have": True},
                    {"name": "Dual Twin-Well 28L Commercial Fryers with Auto Filtration", "qty": 2, "kw": 36.0, "category": "Frying Station", "est_cost": 390000, "must_have": True},
                    {"name": "ChromeMax 1200mm Dual Clamshell Press Griddle", "qty": 1, "kw": 18.0, "category": "Burger Searing", "est_cost": 240000, "must_have": True},
                    {"name": "Twin 3-Door Refrigerated Prep Lines (3.6m total)", "qty": 2, "kw": 0.9, "category": "Assembly", "est_cost": 230000, "must_have": True},
                    {"name": "Automated Heated Sauce & Cheese Dispensers", "qty": 3, "kw": 2.4, "category": "Sauce Station", "est_cost": 144000, "must_have": True},
                    {"name": "ArcticPro Walk-in Combo Freezer & Chiller Cold Room", "qty": 1, "kw": 4.5, "category": "Cold Storage", "est_cost": 380000, "must_have": True},
                    {"name": "AquaSan Hood Dishwasher System with Sinks", "qty": 1, "kw": 9.5, "category": "Sanitation", "est_cost": 240000, "must_have": True}
                ]
            }),
            utility_estimates=json.dumps({
                "small": {"total_kw": 24.0, "plumbing_inlets": 2, "drain_points": 2, "recommended_sqft": "250 - 450 sq ft", "exhaust_cfm": 2800},
                "medium": {"total_kw": 38.0, "plumbing_inlets": 4, "drain_points": 3, "recommended_sqft": "450 - 800 sq ft", "exhaust_cfm": 4500},
                "large": {"total_kw": 77.0, "plumbing_inlets": 6, "drain_points": 5, "recommended_sqft": "800 - 1800 sq ft", "exhaust_cfm": 8200}
            }),
            base_budget_min=490000,
            base_budget_max=1800000
        ),
        WizardPreset(
            concept_key="artisanal_cafe",
            title="Specialty Coffee Cafe & Roastery",
            subtitle="Precision dual-boiler espresso machinery, silent grind on-demand, ice stations, and brunch prep.",
            tagline="100 to 800+ coffee cups/day",
            description="Designed for high-aesthetic specialty cafes with focus on barista speed, temperature consistency, milk steaming microfoam, and clean under-counter water/ice systems.",
            equipment_presets=json.dumps({
                "small": [
                    {"name": "BaristaCraft 2-Group Dual Boiler Espresso Machine", "qty": 1, "kw": 4.5, "category": "Espresso", "est_cost": 340000, "must_have": True},
                    {"name": "Precision On-Demand Commercial Espresso Grinder", "qty": 1, "kw": 0.5, "category": "Grinding", "est_cost": 65000, "must_have": True},
                    {"name": "Under-Counter Barista Milk Chiller with Pitcher Rinser", "qty": 1, "kw": 0.25, "category": "Barista Station", "est_cost": 55000, "must_have": True},
                    {"name": "FrostFlow 60kg Crystal Clear Gourmet Ice Maker", "qty": 1, "kw": 0.65, "category": "Ice Station", "est_cost": 95000, "must_have": True},
                    {"name": "Countertop Curved Glass Pastry Showcase (0.9m)", "qty": 1, "kw": 0.35, "category": "Display", "est_cost": 65000, "must_have": True}
                ],
                "medium": [
                    {"name": "BaristaCraft 2-Group Custom Volumetric Espresso Machine", "qty": 1, "kw": 4.5, "category": "Espresso", "est_cost": 340000, "must_have": True},
                    {"name": "Twin On-Demand Flat Burr Grinders (House & Single Origin)", "qty": 2, "kw": 1.0, "category": "Grinding", "est_cost": 130000, "must_have": True},
                    {"name": "Commercial Heavy-Duty Sound Enclosure Blender", "qty": 1, "kw": 1.8, "category": "Frappe & Smoothies", "est_cost": 68000, "must_have": True},
                    {"name": "FrostFlow 120kg Gourmet Ice Cube Maker", "qty": 1, "kw": 1.1, "category": "Ice Station", "est_cost": 135000, "must_have": True},
                    {"name": "Under-Counter Glasswasher with Reverse Osmosis System", "qty": 1, "kw": 3.2, "category": "Sanitation", "est_cost": 145000, "must_have": True},
                    {"name": "2-Door Refrigerated Sandwich & Salad Prep Table", "qty": 1, "kw": 0.4, "category": "Brunch Kitchen", "est_cost": 85000, "must_have": True},
                    {"name": "Countertop High-Speed Panini Grill", "qty": 1, "kw": 2.5, "category": "Brunch Kitchen", "est_cost": 45000, "must_have": True}
                ],
                "large": [
                    {"name": "BaristaCraft 3-Group Multi-Boiler Paddle Espresso Machine", "qty": 1, "kw": 6.8, "category": "Espresso", "est_cost": 490000, "must_have": True},
                    {"name": "Trio On-Demand Titanium Burr Grinders + Puqpress Tamper", "qty": 1, "kw": 1.8, "category": "Grinding", "est_cost": 220000, "must_have": True},
                    {"name": "Dual FrostFlow 150kg Ice Cubers with Bin", "qty": 1, "kw": 2.2, "category": "Ice Station", "est_cost": 210000, "must_have": True},
                    {"name": "MasterTouch 6-Tray Combi Oven for Cafe Bakery & Savory", "qty": 1, "kw": 9.5, "category": "Bakery", "est_cost": 360000, "must_have": True},
                    {"name": "ArcticPro 2-Door Upright Chiller & Freezer Units", "qty": 2, "kw": 1.8, "category": "Storage", "est_cost": 270000, "must_have": True},
                    {"name": "AquaSan Commercial Pass-Through Dishwashing Line", "qty": 1, "kw": 9.5, "category": "Sanitation", "est_cost": 240000, "must_have": True}
                ]
            }),
            utility_estimates=json.dumps({
                "small": {"total_kw": 8.5, "plumbing_inlets": 3, "drain_points": 2, "recommended_sqft": "200 - 400 sq ft", "exhaust_cfm": 800},
                "medium": {"total_kw": 16.0, "plumbing_inlets": 4, "drain_points": 3, "recommended_sqft": "400 - 900 sq ft", "exhaust_cfm": 1500},
                "large": {"total_kw": 38.0, "plumbing_inlets": 6, "drain_points": 5, "recommended_sqft": "900 - 2200 sq ft", "exhaust_cfm": 3200}
            }),
            base_budget_min=620000,
            base_budget_max=1950000
        ),
        WizardPreset(
            concept_key="artisan_pizzeria",
            title="Authentic Neapolitan & NY Pizzeria",
            subtitle="Conveyor or stone hearth deck baking, 40kg spiral kneading, and chilled topping prep.",
            tagline="100 to 600+ pizzas/day",
            description="Built around high heat retention ovens, heavy spiral dough mixing, temperature-controlled dough retardation, and prep rails.",
            equipment_presets=json.dumps({
                "small": [
                    {"name": "Twin-Deck Stone Hearth Commercial Pizza Oven (4x12\" per deck)", "qty": 1, "kw": 9.6, "category": "Ovens", "est_cost": 165000, "must_have": True},
                    {"name": "SpiralMax 25kg Industrial Dough Kneader", "qty": 1, "kw": 2.2, "category": "Dough Prep", "est_cost": 175000, "must_have": True},
                    {"name": "2-Door Granite Top Pizza Prep Counter with GN Rail", "qty": 1, "kw": 0.45, "category": "Topping Station", "est_cost": 125000, "must_have": True},
                    {"name": "Upright Single-Door Reach-in Chiller for Dough Balls", "qty": 1, "kw": 0.55, "category": "Fermentation", "est_cost": 78000, "must_have": True}
                ],
                "medium": [
                    {"name": "SpeedFire 32-Inch High-Output Conveyor Pizza Oven", "qty": 1, "kw": 24.0, "category": "Ovens", "est_cost": 475000, "must_have": True},
                    {"name": "SpiralMax 40kg Heavy-Duty Spiral Mixer with Dual Timers", "qty": 1, "kw": 3.0, "category": "Dough Prep", "est_cost": 225000, "must_have": True},
                    {"name": "3-Door Granite Top Pizza Prep Station with 10 GN Pan Well", "qty": 1, "kw": 0.65, "category": "Topping Station", "est_cost": 155000, "must_have": True},
                    {"name": "ArcticPro 2-Door Proofer & Dough Retarder Cabinet", "qty": 1, "kw": 1.2, "category": "Fermentation", "est_cost": 165000, "must_have": True},
                    {"name": "10-Tray Commercial Blast Chiller for Par-baked Crusts", "qty": 1, "kw": 2.2, "category": "Freezing", "est_cost": 285000, "must_have": True}
                ],
                "large": [
                    {"name": "Dual-Stacked SpeedFire 32-Inch Conveyor Ovens (200 pies/hr)", "qty": 2, "kw": 48.0, "category": "Ovens", "est_cost": 920000, "must_have": True},
                    {"name": "SpiralMax 60kg Industrial Mixer + Hydraulic Bowl Tipper", "qty": 1, "kw": 5.5, "category": "Dough Prep", "est_cost": 380000, "must_have": True},
                    {"name": "Automated Pizza Dough Rounder and Divider Machine", "qty": 1, "kw": 1.5, "category": "Dough Prep", "est_cost": 210000, "must_have": True},
                    {"name": "Dual 3-Door Granite Pizza Assembly Stations", "qty": 2, "kw": 1.3, "category": "Topping Station", "est_cost": 310000, "must_have": True},
                    {"name": "AquaSan Hood Dishwasher System with Scrap Sinks", "qty": 1, "kw": 9.5, "category": "Sanitation", "est_cost": 240000, "must_have": True}
                ]
            }),
            utility_estimates=json.dumps({
                "small": {"total_kw": 15.0, "plumbing_inlets": 2, "drain_points": 2, "recommended_sqft": "300 - 500 sq ft", "exhaust_cfm": 2200},
                "medium": {"total_kw": 34.0, "plumbing_inlets": 4, "drain_points": 3, "recommended_sqft": "500 - 1000 sq ft", "exhaust_cfm": 4800},
                "large": {"total_kw": 68.0, "plumbing_inlets": 6, "drain_points": 5, "recommended_sqft": "1000 - 2500 sq ft", "exhaust_cfm": 8500}
            }),
            base_budget_min=540000,
            base_budget_max=2200000
        ),
        WizardPreset(
            concept_key="cloud_kitchen",
            title="Multi-Brand High-Volume Cloud Kitchen",
            subtitle="Compact high-density cooking, combi steamers, rapid blast freezing, and maximum line efficiency.",
            tagline="300 to 1,500+ delivery orders/day",
            description="Designed for 24/7 delivery operations with combi steam ovens, high-capacity fryers, walk-in cold rooms, and heavy exhaust canopy systems.",
            equipment_presets=json.dumps({
                "small": [
                    {"name": "MasterTouch 6-Tray Combi Steam Oven", "qty": 1, "kw": 9.5, "category": "Cooking", "est_cost": 360000, "must_have": True},
                    {"name": "Twin-Well 14L+14L Electric Deep Fryer", "qty": 1, "kw": 12.0, "category": "Frying", "est_cost": 125000, "must_have": True},
                    {"name": "4-Burner Heavy Duty Cooking Range with Oven Base", "qty": 1, "kw": 14.0, "category": "Cooking", "est_cost": 85000, "must_have": True},
                    {"name": "ArcticPro 2-Door Upright Chiller (1200L)", "qty": 1, "kw": 0.75, "category": "Refrigeration", "est_cost": 125000, "must_have": True},
                    {"name": "ArcticPro 2-Door Upright Freezer (1200L)", "qty": 1, "kw": 0.95, "category": "Freezer", "est_cost": 145000, "must_have": True}
                ],
                "medium": [
                    {"name": "MasterTouch 10-Tray Combi Steam Oven", "qty": 1, "kw": 18.5, "category": "Cooking", "est_cost": 520000, "must_have": True},
                    {"name": "Twin-Well 28L Commercial Fryer with Filtration", "qty": 1, "kw": 18.0, "category": "Frying", "est_cost": 195000, "must_have": True},
                    {"name": "10-Tray Commercial Blast Chiller & Shock Freezer", "qty": 1, "kw": 2.2, "category": "Preservation", "est_cost": 285000, "must_have": True},
                    {"name": "Heavy Duty 6-Burner Range + Flat Griddle Station", "qty": 1, "kw": 18.0, "category": "Cooking", "est_cost": 135000, "must_have": True},
                    {"name": "ArcticPro Walk-in Modular Cold Room (10x8 ft)", "qty": 1, "kw": 3.5, "category": "Bulk Cold Storage", "est_cost": 340000, "must_have": True},
                    {"name": "AquaSan Hood Dishwasher System", "qty": 1, "kw": 9.5, "category": "Sanitation", "est_cost": 240000, "must_have": True}
                ],
                "large": [
                    {"name": "Dual MasterTouch 10-Tray Combi Ovens Stacked (20 trays)", "qty": 2, "kw": 37.0, "category": "Cooking", "est_cost": 990000, "must_have": True},
                    {"name": "Dual Twin-Well 28L Auto-Filtration Fryers", "qty": 2, "kw": 36.0, "category": "Frying", "est_cost": 390000, "must_have": True},
                    {"name": "20-Tray Roll-in Blast Chiller / Shock Freezer", "qty": 1, "kw": 4.5, "category": "Preservation", "est_cost": 550000, "must_have": True},
                    {"name": "Twin Walk-in Cold Rooms (Dual Temp Chiller + Freezer)", "qty": 1, "kw": 7.0, "category": "Cold Storage", "est_cost": 650000, "must_have": True},
                    {"name": "AquaSan Flight-Type Conveyor Dishwasher System", "qty": 1, "kw": 18.0, "category": "Sanitation", "est_cost": 580000, "must_have": True}
                ]
            }),
            utility_estimates=json.dumps({
                "small": {"total_kw": 37.0, "plumbing_inlets": 4, "drain_points": 3, "recommended_sqft": "350 - 600 sq ft", "exhaust_cfm": 3500},
                "medium": {"total_kw": 70.0, "plumbing_inlets": 6, "drain_points": 5, "recommended_sqft": "600 - 1400 sq ft", "exhaust_cfm": 6500},
                "large": {"total_kw": 120.0, "plumbing_inlets": 10, "drain_points": 8, "recommended_sqft": "1400 - 3500 sq ft", "exhaust_cfm": 12500}
            }),
            base_budget_min=840000,
            base_budget_max=3200000
        )
    ]
    db.add_all(wizard_presets)
    db.commit()

    logger.info("ChefMachines database seed completed successfully.")
