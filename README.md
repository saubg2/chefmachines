# ChefMachines (chefmachines.com) 🍳⚡

> Commercial Food Preparation & Commercial Kitchen Services Platform.
> Powering 500+ commercial kitchens, cafes, QSR chains, and 5-star hotel banquet operations across India.

---

## 🌟 The 4 Pillars of ChefMachines
1. **Commercial Equipment Sales**: Commercial reach-in freezers, blast chillers, touchscreen combi ovens, contact bun warmers, automatic oil-filtration fryers, espresso machines, and Middleby Celfrost systems.
2. **Turnkey Kitchen Solutions**: End-to-end design, 3D workflow CAD layouts, MEP electrical & plumbing schematics, custom SS-304 food-grade fabrication, and trial commissioning.
3. **Barista & Manpower Training Academy**: Certified on-site and academy training on equipment operation, coffee extraction chemistry, combi recipe programming, and daily preventative maintenance.
4. **Smart Kitchen Care & 24/7 AMC**: Rapid 4-hour metro service SLA, stocked spare parts across 12 cities, and emergency breakdown hotlines.

---

## 🚀 Key Interactive Features
- **Commercial Kitchen Set-up Wizard (`/wizard`)**: Step-by-step interactive configurator for Burger Joints, Artisanal Cafes, Pizzerias, and Cloud Kitchens. Dynamically computes recommended equipment lists, connected electrical load in kW (single-phase vs 3-phase), kitchen exhaust airflow in CFM, and generates instant quotation reference codes (`CM-WZ-XXXX`).
- **Commercial Kitchen Calculators (`/calculators`)**:
  - *Walk-in Cold Room & Freezer Sizer*: Calculates room volume, compressor HP, cooling BTU/hr, and PUF panel thickness.
  - *Espresso Machine Peak Throughput Calculator*: Sizing group heads, steam boilers, and daily coffee bean usage based on rush volumes.
  - *Exhaust Hood CFM & Duct Sizer*: Computes ventilation airflow CFM, makeup air, and round duct diameter.
  - *Fryer Oil Filtration ROI Calculator*: Demonstrates annual cash savings and payback period from motorized oil filtration.
- **Middleby Celfrost Live Scraper**: Built-in scraper targeting Middleby Celfrost catalog APIs (`ProductByCategory`, `ProductDetails`, `HeaderMenuCategory`) to keep commercial equipment specs synchronized.
- **Native CMS Administration Dashboard (`/admin`)**:
  - Manage products, models, categories, and featured status.
  - Monitor inbound RFQ leads and setup wizard submissions with stage tracking (`New`, `Contacted`, `In Proposal`, `Closed`).
  - Run the Middleby Celfrost sync engine with real-time logs.

---

## 🛠️ Architecture & Tech Stack
- **Backend**: Python 3.11 + FastAPI (Async REST APIs, SQLAlchemy ORM, Pydantic validation, SQLite/PostgreSQL support, httpx scraper).
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons + React Router.
- **Design Aesthetic**: Flowing, vibrant culinary flame & amber glow palette (`#FF5722`, `#FFA000`, `#0B0F17`, `#151F2E`), custom SVG logo, and responsive mobile drawers.
- **Deployment**: Production-ready multi-stage `Dockerfile` and `railway.json` for single-service zero-CORS deployment on **Railway**.

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/saubg2/chefmachines.git
cd chefmachines
```

### 2. Backend Setup (FastAPI)
```bash
python3 -m venv backend/venv
source backend/venv/bin/activate
pip install -r backend/requirements.txt

# Run backend API server
uvicorn backend.app.main:app --reload --port 8000
```
Interactive API documentation available at `http://localhost:8000/docs`.

### 3. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Access the flowing customer portal at `http://localhost:5173`.

---

## 🚢 Railway Deployment

ChefMachines is configured for 1-click single-service deployment on **Railway**:

1. Log into **Railway.app** and click **New Project** → **Deploy from GitHub repo**.
2. Select `saubg2/chefmachines`.
3. Railway automatically detects the root `Dockerfile` and builds both the React frontend and Python FastAPI backend into a single container.
4. Add custom domain `chefmachines.com` in Railway service settings.
5. All incoming web traffic on `/` serves the high-performance React SPA, while `/api/*` routes are handled by FastAPI!
