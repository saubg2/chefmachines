import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { api, Product, TrainingModule, BlogPost } from '../services/api';
import { BrandMarquee } from '../components/BrandMarquee';
import { ClientCredibility } from '../components/ClientCredibility';

interface HomeProps {
  onOpenQuoteModal: (equipment?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenQuoteModal }) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [activeConcept, setActiveConcept] = useState('burger_joint');

  // Quick Home Calculator State
  const [calcCups, setCalcCups] = useState(300);
  const [calcRoomLen, setCalcRoomLen] = useState(12);
  const [calcRoomWid, setCalcRoomWid] = useState(10);

  useEffect(() => {
    api.getProducts({ featured: true }).then((data) => setFeaturedProducts(data.slice(0, 6))).catch(console.error);
    api.getTrainingModules().then((data) => setTrainingModules(data.slice(0, 3))).catch(console.error);
    api.getBlogs().then((data) => setRecentBlogs(data.slice(0, 3))).catch(console.error);
  }, []);

  const wizardPreviews = {
    burger_joint: {
      title: "Gourmet Burger Joint & QSR",
      time: "12s Bun Caramelization",
      equipment: ["Toastmaster Vertical Contact Bun Toaster", "Pitco 35C+ Gas Deep Fryers (18L)", "Heavy Duty Chrome Griddle", "Hoshizaki / Celfrost Prep Counter"],
      budget: "₹3.9L - ₹19L",
      kw: "12 - 18 kW (Gas & Electric)",
      orders: "100 - 500 burgers/day"
    },
    artisanal_cafe: {
      title: "Specialty Cafe & Roastery",
      time: "240 Shots / Peak Hour",
      equipment: ["La Marzocco Linea Classic S or La Cimbali M26", "Fiorenzato F64 Evo Precision Grinders", "Marco MIX UC4 Under-counter Boiler", "Electrolux Undercounter Glasswasher"],
      budget: "₹5.6L - ₹24L",
      kw: "6.0 - 12 kW",
      orders: "150 - 800 cups/day"
    },
    artisan_pizzeria: {
      title: "Authentic Neapolitan & NY Pizzeria",
      time: "4.5 Min Continuous Bake",
      equipment: ["Middleby Marshall PS540 Conveyor Oven", "Sinmag SM2-25 Spiral Dough Mixer", "Celfrost Granite Pizza Prep Station", "Celfrost Blast Chiller"],
      budget: "₹5.4L - ₹22L",
      kw: "15 - 34 kW",
      orders: "100 - 600 pizzas/day"
    },
    cloud_kitchen: {
      title: "High-Volume Cloud Kitchen",
      time: "Multi-Brand 24/7 Delivery",
      equipment: ["TurboChef Sota Rapid Ovens", "Pitco Multi-Vat Fryer System", "Celfrost Walk-in Modular Cold Room", "Electrolux Pass-Through Dishwasher"],
      budget: "₹8.4L - ₹32L",
      kw: "37 - 70 kW",
      orders: "300 - 1,500 orders/day"
    }
  };

  const selectedPreview = wizardPreviews[activeConcept as keyof typeof wizardPreviews] || wizardPreviews.burger_joint;

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      {/* 1. HERO SECTION: CRISP, PROFESSIONAL LIGHT DESIGN */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200 mb-4">
              Commercial Food Preparation & Service Solutions
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-slate-900 leading-tight">
              Supplying World-Class Equipment to 500+ Cafes, Chains & Hotels.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Authorized supplier of Pitco, Celfrost, La Marzocco, Electrolux, TurboChef, Middleby Marshall, and Marco. Complete turnkey kitchen design, barista training, and 24/7 AMC uptime.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <Link
                to="/wizard"
                className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm shadow-sm transition"
              >
                Launch Kitchen Setup Wizard
              </Link>
              <Link
                to="/products"
                className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-sm transition"
              >
                Explore Equipment Catalog
              </Link>
            </div>
          </div>

          {/* Key Metric Numbers */}
          <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display">500+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Commercial Outlets Supplied</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display">13+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Authorized Global Brands</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-brand-orange font-display">99.4%</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Operational Equipment Uptime</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-display">&lt; 4 Hours</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Metropolitan AMC Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHORIZED COMMERCIAL BRANDS (CELFROST, PITCO, LA MARZOCCO, ELECTROLUX, ETC.) */}
      <BrandMarquee />

      {/* REAL CLIENT LIST (BURGER FARM, NBC, CLARKS AMER, BROWN SUGAR, CAFE NOLA, ETC.) */}
      <ClientCredibility />

      {/* 2. THE 4 CORE FUNCTIONS */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              End-to-End Service Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              The 4 Pillars of ChefMachines
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
              One unified team handling your equipment procurement, MEP layout engineering, manpower training, and 24/7 care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Function 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-slate-400 transition shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange block mb-1">Pillar 1</span>
                <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
                  Equipment Distribution
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Direct supply of Pitco fryers, Toastmaster bun warmers, Celfrost refrigeration, TurboChef ovens, and La Marzocco espresso machines with factory warranty.
                </p>
              </div>
              <Link to="/products" className="text-xs font-bold text-brand-orange hover:underline inline-flex items-center gap-1">
                Browse Equipment <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Function 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-slate-400 transition shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-1">Pillar 2</span>
                <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
                  Turnkey Kitchen Solutions
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  End-to-end design for burger joints, cafes, bars, and cloud kitchens: 3D CAD workflow layouts, 3-phase electrical & plumbing schematics, and SS-304 custom fabrication.
                </p>
              </div>
              <Link to="/turnkey" className="text-xs font-bold text-amber-600 hover:underline inline-flex items-center gap-1">
                Turnkey Workflow <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Function 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-slate-400 transition shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">Pillar 3</span>
                <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
                  Barista & Manpower Academy
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Certified training on your exact equipment: espresso extraction calibration, combi oven multi-rack cooking, and fryer oil management so staff operate machines cleanly and safely.
                </p>
              </div>
              <Link to="/training" className="text-xs font-bold text-emerald-600 hover:underline inline-flex items-center gap-1">
                View Academy Modules <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Function 4 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-slate-400 transition shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 block mb-1">Pillar 4</span>
                <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
                  Smart Care & 24/7 AMC
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Guaranteed under 4-hour metro service SLA, preventive descaling, condenser cleaning cycles, and stocked spare parts across 12 regional hubs.
                </p>
              </div>
              <button
                onClick={() => onOpenQuoteModal("24/7 Preventive AMC Program")}
                className="text-xs font-bold text-cyan-700 hover:underline inline-flex items-center gap-1 text-left"
              >
                Inquire AMC Plans <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SETUP WIZARD TEASER */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Concept Selector */}
              <div className="lg:col-span-5">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
                  Interactive Planning Tool
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  Kitchen Set-up Wizard
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  Starting a burger joint, cafe, pizzeria, or cloud kitchen? Select your concept and let our wizard dynamically calculate your equipment list, electrical sanction kW, and estimated budget.
                </p>

                {/* Concept Tabs */}
                <div className="mt-5 space-y-2">
                  {[
                    { key: 'burger_joint', name: 'Burger Joint & QSR' },
                    { key: 'artisanal_cafe', name: 'Specialty Cafe & Roastery' },
                    { key: 'artisan_pizzeria', name: 'Artisan Pizzeria' },
                    { key: 'cloud_kitchen', name: 'High-Volume Cloud Kitchen' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveConcept(tab.key)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                        activeConcept === tab.key
                          ? 'bg-brand-orange text-white shadow-sm'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span>{tab.name}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${activeConcept === tab.key ? 'opacity-100' : 'opacity-40'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Blueprint Card */}
              <div className="lg:col-span-7">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-200 gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">Preset Configuration</span>
                      <h4 className="text-base font-bold text-slate-900">{selectedPreview.title}</h4>
                    </div>
                    <span className="text-xs font-semibold text-brand-orange bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                      {selectedPreview.time}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 my-4 text-center text-xs">
                    <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                      <span className="text-[10px] text-slate-500 block">Est. Equipment Budget</span>
                      <strong className="text-slate-900 font-extrabold text-sm">{selectedPreview.budget}</strong>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                      <span className="text-[10px] text-slate-500 block">Connected Power</span>
                      <strong className="text-amber-600 font-extrabold text-sm">{selectedPreview.kw}</strong>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                      <span className="text-[10px] text-slate-500 block">Target Output</span>
                      <strong className="text-emerald-600 font-extrabold text-sm">{selectedPreview.orders}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                      Core Commercial Models Included:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedPreview.equipment.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-500">
                      Includes MEP drawings, sanction load calculation & BOQ
                    </span>
                    <Link
                      to={`/wizard?concept=${activeConcept}`}
                      className="px-5 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs uppercase tracking-wider transition"
                    >
                      Customize Setup & Get BOQ
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL COMMERCIAL EQUIPMENT SHOWCASE */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Heavy Duty Commercial Hardware
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Featured Commercial Models
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Real brands supplied to leading commercial kitchens across India.
              </p>
            </div>
            <div className="mt-3 md:mt-0">
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:underline"
              >
                <span>View Full Equipment Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-slate-400 transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 bg-slate-100 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={p.image_url || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80'}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white text-slate-900 border border-slate-200 shadow-sm">
                      {p.brand}
                    </div>
                    {p.model && (
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-white text-slate-600 border border-slate-200">
                        {p.model}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 hover:text-brand-orange transition">
                      <Link to={`/products/${p.slug}`}>{p.name}</Link>
                    </h3>
                    <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    {p.features && p.features.length > 0 && (
                      <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                        {p.features.slice(0, 2).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">B2B Commercial</span>
                    <span className="text-xs font-bold text-slate-900">Direct Factory RFQ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/products/${p.slug}`}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded-lg transition"
                    >
                      Specs
                    </Link>
                    <button
                      onClick={() => onOpenQuoteModal(p.name)}
                      className="px-3.5 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-xs font-bold text-white rounded-lg transition"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALCULATORS PREVIEW */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Engineering Sizing Suite
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Commercial Sizing Calculators
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Avoid buying undersized units that break down during rush, or oversized units that inflate electricity bills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calculator 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Espresso Machine Sizer</h3>
                  <span className="text-xs text-slate-500">Peak hour cup extraction & boiler sizing</span>
                </div>
                <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded text-slate-700">
                  {calcCups} cups/day
                </span>
              </div>

              <div className="my-5">
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={calcCups}
                  onChange={(e) => setCalcCups(Number(e.target.value))}
                  className="w-full accent-brand-orange cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs mb-4">
                <div>
                  <span className="text-[10px] text-slate-500 block">Peak Load (35% rush)</span>
                  <strong className="text-sm font-bold text-slate-900">
                    {Math.round((calcCups * 0.35) / 2)} cups/hr
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Recommended Machine</span>
                  <strong className="text-sm font-bold text-brand-orange">
                    {calcCups <= 150 ? '1-Group Commercial' : calcCups <= 450 ? '2-Group Dual Boiler (La Marzocco / La Cimbali)' : '3-Group Multi-Boiler'}
                  </strong>
                </div>
              </div>

              <Link to="/calculators" className="text-xs font-bold text-brand-orange hover:underline inline-flex items-center gap-1">
                Open Full Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Calculator 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Cold Room Volume Sizer</h3>
                  <span className="text-xs text-slate-500">Walk-in chiller & freezer compressor sizing</span>
                </div>
                <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded text-slate-700">
                  {calcRoomLen} x {calcRoomWid} ft
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 my-5">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Length: {calcRoomLen} ft</label>
                  <input
                    type="range"
                    min="6"
                    max="30"
                    value={calcRoomLen}
                    onChange={(e) => setCalcRoomLen(Number(e.target.value))}
                    className="w-full accent-brand-orange cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Width: {calcRoomWid} ft</label>
                  <input
                    type="range"
                    min="6"
                    max="25"
                    value={calcRoomWid}
                    onChange={(e) => setCalcRoomWid(Number(e.target.value))}
                    className="w-full accent-brand-orange cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs mb-4">
                <div>
                  <span className="text-[10px] text-slate-500 block">Total Volume (at 8.5ft H)</span>
                  <strong className="text-sm font-bold text-slate-900">
                    {Math.round(calcRoomLen * calcRoomWid * 8.5)} Cu Ft
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Recommended Compressor</span>
                  <strong className="text-sm font-bold text-brand-orange">
                    {Math.max(1.5, Math.round(((calcRoomLen * calcRoomWid * 8.5) / 450) * 10) / 10)} HP Unit
                  </strong>
                </div>
              </div>

              <Link to="/calculators" className="text-xs font-bold text-brand-orange hover:underline inline-flex items-center gap-1">
                Open Full Calculator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRAINING ACADEMY */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
                  Pillar 3: Manpower Training
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  Barista & Kitchen Equipment Training Academy
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  The #1 reason commercial food businesses struggle is untrained staff mismanaging equipment and serving inconsistent recipes. Our certified trainers conduct hands-on training on your exact machines.
                </p>

                <div className="mt-5 space-y-2.5">
                  {trainingModules.map((tm) => (
                    <div key={tm.id} className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 text-xs">
                      <div>
                        <h4 className="font-bold text-slate-900">{tm.title}</h4>
                        <span className="text-slate-500">{tm.duration} • {tm.badge}</span>
                      </div>
                      <Link
                        to="/training"
                        className="px-3 py-1.5 rounded-lg bg-orange-50 text-brand-orange font-bold text-[11px] hover:bg-orange-100 transition"
                      >
                        Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 text-center">
                <h3 className="text-base font-bold text-slate-900 mb-1">On-Site Crew Certification</h3>
                <p className="text-slate-500 text-xs mb-4">
                  Opening an outlet? We dispatch master trainers to your location for complete crew certification.
                </p>
                <button
                  onClick={() => onOpenQuoteModal("On-Site Staff Training Academy Program")}
                  className="w-full py-2.5 rounded-xl bg-brand-orange text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-orange-hover transition"
                >
                  Request Training Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
            Plan Your Commercial Kitchen Layout
          </h2>
          <p className="mt-2 text-slate-400 text-xs sm:text-sm">
            Book a consultation with our senior commercial MEP engineers for floor plans, 3-phase electrical loads, and equipment BOQs.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenQuoteModal("Commercial Kitchen Consultation")}
              className="w-full sm:w-auto px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Book Commercial Kitchen Audit
            </button>
            <Link
              to="/wizard"
              className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 transition"
            >
              Run Setup Wizard Flow
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
