import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Zap, ShieldCheck } from 'lucide-react';
import { api, Product, TrainingModule, BlogPost } from '../services/api';
import { BrandMarquee } from '../components/BrandMarquee';
import { ClientCredibility } from '../components/ClientCredibility';
import { CategoryIcon } from '../components/CategoryIcons';
import { BrandLogo } from '../components/BrandLogos';

interface HomeProps {
  onOpenQuoteModal: (equipment?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenQuoteModal }) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);

  // Quick Home Calculator State
  const [calcCups, setCalcCups] = useState(300);
  const [calcRoomLen, setCalcRoomLen] = useState(12);
  const [calcRoomWid, setCalcRoomWid] = useState(10);

  useEffect(() => {
    api.getProducts().then((data) => {
      // Pick 6 authentic products with priority to Middleby / Pitco / TurboChef / Celfrost / La Marzocco
      setFeaturedProducts(data.slice(0, 6));
    }).catch(console.error);
    api.getTrainingModules().then((data) => setTrainingModules(data.slice(0, 3))).catch(console.error);
    api.getBlogs().then((data) => setRecentBlogs(data.slice(0, 3))).catch(console.error);
  }, []);

  const conceptFlows = [
    {
      key: 'burger_joint',
      category: 'QSR / FAST FOOD',
      title: 'Gourmet Burger Joint & QSR',
      highlight: '12-Second Bun Caramelization',
      budget: '₹3.9L - ₹19L',
      power: '12 - 18 kW',
      output: '100 - 500 orders/day',
      equipment: [
        'Toastmaster Vertical Contact Bun Toaster',
        'Pitco 35C+ Gas Deep Fryers (18L Double Basket)',
        'Heavy Duty Chrome Burger Griddle (18mm Plate)',
        'Hoshizaki / Celfrost Undercounter Prep Chiller'
      ]
    },
    {
      key: 'artisanal_cafe',
      category: 'SPECIALTY COFFEE',
      title: 'Specialty Cafe & Roastery',
      highlight: '240 Shots / Peak Hour',
      budget: '₹5.6L - ₹24L',
      power: '6.0 - 12 kW',
      output: '150 - 800 cups/day',
      equipment: [
        'La Marzocco Linea Classic S or La Cimbali M26',
        'Fiorenzato F64 Evo Precision Electronic Grinders',
        'Marco MIX UC4 Under-Counter Water Boiler',
        'Electrolux Professional Undercounter Glasswasher'
      ]
    },
    {
      key: 'artisan_pizzeria',
      category: 'PIZZERIA',
      title: 'Authentic Artisan Pizzeria',
      highlight: '4.5 Min Continuous Impingement Bake',
      budget: '₹5.4L - ₹22L',
      power: '15 - 34 kW',
      output: '100 - 600 pizzas/day',
      equipment: [
        'Middleby Marshall PS540 WOW! Conveyor Oven',
        'Sinmag SM2-25 Spiral Dough Mixer (25kg)',
        'Celfrost Granite Top Refrigerated Pizza Prep Station',
        'Celfrost Rapid Blast Chiller / Shock Freezer'
      ]
    },
    {
      key: 'cloud_kitchen',
      category: 'DELIVERY HUB',
      title: 'High-Volume Delivery Cloud Kitchen',
      highlight: 'Multi-Brand 24/7 Simultaneous Lines',
      budget: '₹8.4L - ₹32L',
      power: '37 - 70 kW',
      output: '300 - 1,500 orders/day',
      equipment: [
        'TurboChef Sota Ventless Accelerated Cooking Ovens',
        'Pitco Multi-Vat High Recovery Gas Fryers',
        'Celfrost Modular Walk-in Cold Room (10x8 ft)',
        'Electrolux Pass-Through Hood Dishwasher'
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-white text-slate-900 font-sans">
      {/* 1. HERO SECTION: CONTINUOUS INDUSTRIAL ARCHITECTURAL LAYOUT */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF5722] bg-orange-50 px-3 py-1 rounded-sm border border-orange-200 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
                COMMERCIAL FOOD SERVICE SYSTEMS & ENGINEERING
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-slate-900 uppercase leading-[1.05]">
                Commercial Kitchen Machinery & Turnkey Solutions.
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Authorized distributor of <strong>Pitco, Celfrost, La Marzocco, Electrolux, TurboChef, Middleby Marshall</strong>, and <strong>Marco</strong>. Supplying over 500 commercial cafes, QSR chains, and hotels across India.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/wizard"
                  className="text-center px-6 py-3.5 rounded-md bg-[#FF5722] hover:bg-[#e64a19] text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
                >
                  Launch Kitchen Setup Wizard
                </Link>
                <Link
                  to="/products"
                  className="text-center px-6 py-3.5 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider transition"
                >
                  Explore Equipment Catalog
                </Link>
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="text-center px-6 py-3.5 rounded-md bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider transition"
                >
                  Request Quote
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center gap-5 text-xs text-slate-600 font-medium">
                <div>Direct Hotline: <a href="tel:9782690188" className="font-bold text-slate-900 hover:text-[#FF5722]">9782690188</a></div>
                <span className="text-slate-300">•</span>
                <div>Email: <a href="mailto:saubg2@gmail.com" className="font-semibold text-slate-900 hover:text-[#FF5722]">saubg2@gmail.com</a></div>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-semibold">12 City AMC Hubs</span>
              </div>
            </div>

            {/* Right Authentic Equipment Photography Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-md overflow-hidden border border-slate-300 shadow-md bg-slate-100 group">
                <img
                  src="/images/commercial_kitchen_equipment_hero.jpg"
                  alt="Commercial Foodservice Equipment Line"
                  className="w-full h-80 sm:h-96 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1000&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 mb-1">
                    HEAVY DUTY COMMERCIAL STAINLESS LINE
                  </span>
                  <h3 className="text-lg font-bold font-display uppercase tracking-tight">
                    SS-304 Heavy Duty Commercial Equipment
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Pitco Fryers • TurboChef Ovens • Celfrost Uprights • La Marzocco
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metric Strip */}
          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-black font-display tracking-tight text-slate-900">500+</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Commercial Outlets Supplied</div>
            </div>
            <div>
              <div className="text-4xl font-black font-display tracking-tight text-slate-900">13+</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Authorized Global Brands</div>
            </div>
            <div>
              <div className="text-4xl font-black font-display tracking-tight text-[#FF5722]">99.4%</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Commercial Equipment Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-black font-display tracking-tight text-emerald-700">&lt; 4 Hours</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Metropolitan AMC Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUTHORIZED BRAND ECOSYSTEM WITH OFFICIAL VECTOR LOGOS */}
      <BrandMarquee />

      {/* 3. REAL CLIENT CREDIBILITY */}
      <ClientCredibility />

      {/* 4. THE 4 CORE PILLARS: CONTINUOUS EDITORIAL FLOW */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF5722] block mb-1">
                COMPREHENSIVE B2B SOLUTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase tracking-tight">
                The 4 Pillars of ChefMachines
              </h2>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 md:mt-0 max-w-md">
              From individual machine supply to total MEP kitchen engineering, barista academy training, and preventive AMC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <div className="bg-white border border-slate-200 rounded-md p-6 flex flex-col justify-between hover:border-[#FF5722] transition-colors shadow-none hover:shadow-md">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF5722] block mb-2 font-bold">
                  PILLAR 01
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display uppercase mb-2">
                  Commercial Equipment Sales
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Direct authorized supply of fryers, reach-in chillers, accelerated cookers, conveyor pizza ovens, and commercial espresso systems.
                </p>
              </div>
              <Link to="/products" className="text-xs font-bold uppercase tracking-wider text-[#FF5722] hover:underline inline-flex items-center gap-1">
                Browse Equipment <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-slate-200 rounded-md p-6 flex flex-col justify-between hover:border-amber-600 transition-colors shadow-none hover:shadow-md">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 block mb-2 font-bold">
                  PILLAR 02
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display uppercase mb-2">
                  Turnkey Kitchen Setups
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Full 3D CAD kitchen layouts, MEP electrical sanction load planning, exhaust CFM ducting schematics, and custom SS-304 fabrication.
                </p>
              </div>
              <Link to="/turnkey" className="text-xs font-bold uppercase tracking-wider text-amber-600 hover:underline inline-flex items-center gap-1">
                Turnkey Blueprint <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-slate-200 rounded-md p-6 flex flex-col justify-between hover:border-emerald-700 transition-colors shadow-none hover:shadow-md">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 block mb-2 font-bold">
                  PILLAR 03
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display uppercase mb-2">
                  Barista & Manpower Academy
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Hands-on machine training for kitchen staff: espresso grinder calibration, combi oven multi-stage recipe programming, and oil preservation.
                </p>
              </div>
              <Link to="/training" className="text-xs font-bold uppercase tracking-wider text-emerald-700 hover:underline inline-flex items-center gap-1">
                Academy Syllabus <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white border border-slate-200 rounded-md p-6 flex flex-col justify-between hover:border-sky-700 transition-colors shadow-none hover:shadow-md">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-700 block mb-2 font-bold">
                  PILLAR 04
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display uppercase mb-2">
                  Smart Care & 24/7 AMC
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Guaranteed under 4-hour metro service SLA, preventive descaling, boiler safety audits, and stocked OEM spare parts across 12 regional hubs.
                </p>
              </div>
              <button
                onClick={() => onOpenQuoteModal("24/7 Preventive AMC Program")}
                className="text-xs font-bold uppercase tracking-wider text-sky-700 hover:underline inline-flex items-center gap-1 text-left"
              >
                Inquire AMC Plans <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTINUOUS COMMERCIAL SETUP FLOW (NO SLIDE-VIEW WIDGET) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF5722] block mb-1">
                CONCEPT-SPECIFIC ENGINEERING CONFIGURATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase tracking-tight">
                Turnkey Kitchen Set-Up Blueprints
              </h2>
            </div>
            <Link
              to="/wizard"
              className="mt-3 md:mt-0 text-xs font-bold uppercase tracking-wider text-[#FF5722] hover:underline inline-flex items-center gap-1"
            >
              Custom Sizing Wizard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Continuous Flow of All 4 Concepts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conceptFlows.map((concept) => (
              <div
                key={concept.key}
                className="bg-slate-50 border border-slate-200 rounded-md p-5 flex flex-col justify-between hover:border-slate-400 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      {concept.category}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {concept.highlight}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-display uppercase mb-3">
                    {concept.title}
                  </h3>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-500 block uppercase">Est. Budget</span>
                      <strong className="text-slate-900 font-bold">{concept.budget}</strong>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200">
                      <span className="text-[10px] text-slate-500 block uppercase">Connected Load</span>
                      <strong className="text-amber-700 font-bold">{concept.power}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Key Equipment Line:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {concept.equipment.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#FF5722] font-bold text-xs mt-0.5">•</span>
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200">
                  <Link
                    to={`/wizard?concept=${concept.key}`}
                    className="w-full block text-center py-2 rounded bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold uppercase tracking-wider text-slate-900 transition"
                  >
                    Configure Blueprint & BOQ
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LIVE AUTHENTIC EQUIPMENT SHOWCASE (WITH PRODUCT CATEGORY ICONS) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF5722] block mb-1">
                OFFICIAL MANUFACTURER CATALOG
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase tracking-tight">
                Featured Commercial Equipment
              </h2>
            </div>
            <Link
              to="/products"
              className="mt-3 md:mt-0 text-xs font-bold uppercase tracking-wider text-[#FF5722] hover:underline inline-flex items-center gap-1"
            >
              View All 70+ Models <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-md overflow-hidden flex flex-col justify-between hover:border-slate-400 transition"
              >
                <div>
                  {/* Equipment Photo */}
                  <div className="relative h-56 bg-slate-100 flex items-center justify-center p-4 border-b border-slate-100">
                    <img
                      src={p.image_url || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80'}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded border border-slate-200 shadow-sm">
                      <BrandLogo brand={p.brand} className="h-4" showWordmark={true} />
                    </div>
                    {p.category_slug && (
                      <div className="absolute top-3 right-3 p-1.5 rounded bg-white/90 border border-slate-200 text-slate-600" title={p.category_slug}>
                        <CategoryIcon slug={p.category_slug} className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Model: {p.model || 'Commercial Grade'}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 hover:text-[#FF5722] transition line-clamp-2">
                      <Link to={`/products/${p.slug}`}>{p.name}</Link>
                    </h3>
                    <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Procurement</span>
                    <span className="text-xs font-bold text-slate-900">Direct Factory RFQ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenQuoteModal(p.name)}
                      className="px-3.5 py-1.5 rounded bg-[#FF5722] hover:bg-[#e64a19] text-white font-bold text-xs uppercase tracking-wider transition"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. QUICK INTERACTIVE CALCULATOR TEASER */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF5722] block mb-1">
                ENGINEERING TOOLS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase tracking-tight">
                Commercial Kitchen Sizing Calculators
              </h2>
            </div>
            <Link
              to="/calculators"
              className="mt-3 md:mt-0 text-xs font-bold uppercase tracking-wider text-[#FF5722] hover:underline inline-flex items-center gap-1"
            >
              Open All 4 Calculators <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Espresso Sizer */}
            <div className="bg-slate-50 border border-slate-200 rounded-md p-6">
              <span className="text-[10px] font-mono text-[#FF5722] uppercase tracking-wider font-bold block mb-1">
                TOOL 01 • ESPRESSO MACHINE SIZING
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-display uppercase mb-2">
                Espresso Peak Hour Throughput Sizer
              </h3>
              <p className="text-slate-600 text-xs mb-4">
                Calculate the required espresso group heads, boiler volume, and electrical sanction based on your daily cup volume.
              </p>

              <div className="bg-white p-4 rounded border border-slate-200 mb-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
                  <span>Target Cups / Day:</span>
                  <span className="text-base text-[#FF5722]">{calcCups} cups</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={calcCups}
                  onChange={(e) => setCalcCups(Number(e.target.value))}
                  className="w-full accent-[#FF5722]"
                />
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Peak Demand</span>
                    <strong>{Math.round(calcCups * 0.35)} cups/hr</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Recommended</span>
                    <strong className="text-[#FF5722]">{calcCups > 450 ? '3-Group AV' : calcCups > 150 ? '2-Group AV' : '1-2 Group'}</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Boiler Size</span>
                    <strong>{calcCups > 450 ? '14 - 17 L' : calcCups > 150 ? '10 - 11 L' : '5 - 7 L'}</strong>
                  </div>
                </div>
              </div>

              <Link
                to="/calculators"
                className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-[#FF5722] inline-flex items-center gap-1"
              >
                Full Sizing Model & Steam Calculation <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Cold Room Sizer */}
            <div className="bg-slate-50 border border-slate-200 rounded-md p-6">
              <span className="text-[10px] font-mono text-cyan-700 uppercase tracking-wider font-bold block mb-1">
                TOOL 02 • COLD ROOM TONNAGE
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-display uppercase mb-2">
                Modular Walk-In Cold Room Sizer
              </h3>
              <p className="text-slate-600 text-xs mb-4">
                Calculate volumetric storage and refrigeration cooling tonnage for restaurant dairy, meat, and beverage holding.
              </p>

              <div className="bg-white p-4 rounded border border-slate-200 mb-4">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Length (ft): {calcRoomLen}</label>
                    <input
                      type="range"
                      min="6"
                      max="24"
                      value={calcRoomLen}
                      onChange={(e) => setCalcRoomLen(Number(e.target.value))}
                      className="w-full accent-cyan-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Width (ft): {calcRoomWid}</label>
                    <input
                      type="range"
                      min="6"
                      max="20"
                      value={calcRoomWid}
                      onChange={(e) => setCalcRoomWid(Number(e.target.value))}
                      className="w-full accent-cyan-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Floor Area</span>
                    <strong>{calcRoomLen * calcRoomWid} sq ft</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Gross Volume</span>
                    <strong>{calcRoomLen * calcRoomWid * 8.5} cu ft</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-[10px] text-slate-500 block">Est. Tonnage</span>
                    <strong className="text-cyan-700">{((calcRoomLen * calcRoomWid * 8.5 * 15) / 12000).toFixed(1)} TR</strong>
                  </div>
                </div>
              </div>

              <Link
                to="/calculators"
                className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-cyan-700 inline-flex items-center gap-1"
              >
                Calculate Complete Heat Load & Compressor <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BARISTA & MANPOWER ACADEMY SPOTLIGHT */}
      <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs font-mono uppercase tracking-wider text-orange-400 block mb-1">
                CHEFMACHINES BARISTA & EQUIPMENT ACADEMY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight leading-tight">
                We Don't Just Supply Machines. We Train Your Baristas & Chefs.
              </h2>
              <p className="mt-4 text-slate-300 text-xs sm:text-sm leading-relaxed">
                A commercial espresso machine or combi oven is only as consistent as the staff operating it. Our factory-certified instructors train your team hands-on before day one: dialling in shots, calibrating burrs, descaling protocols, and multi-rack baking.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/training"
                  className="px-6 py-3 rounded bg-[#FF5722] hover:bg-[#e64a19] text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  View Academy Curriculum
                </Link>
                <button
                  onClick={() => onOpenQuoteModal("Barista Academy Training")}
                  className="px-6 py-3 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 transition"
                >
                  Book Staff Training Session
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded">
                <span className="text-xs font-mono text-orange-400 font-bold block mb-1">MODULE 01</span>
                <h4 className="text-sm font-bold font-display uppercase mb-1">Espresso Calibration & Extraction</h4>
                <p className="text-slate-400 text-xs">Micron burr alignment, brew ratio formulas, channel prevention, and latte art micro-foam texture.</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded">
                <span className="text-xs font-mono text-orange-400 font-bold block mb-1">MODULE 02</span>
                <h4 className="text-sm font-bold font-display uppercase mb-1">Combi Oven Multi-Rack Cookery</h4>
                <p className="text-slate-400 text-xs">Steam-convection ratio programming, Delta-T core probe roasting, and overnight slow-cook cycles.</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded">
                <span className="text-xs font-mono text-orange-400 font-bold block mb-1">MODULE 03</span>
                <h4 className="text-sm font-bold font-display uppercase mb-1">Commercial Fryer Oil Chemistry</h4>
                <p className="text-slate-400 text-xs">Total Polar Material (TPM) testing, cold-zone crumb purging, and extending oil lifespan by 40%.</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded">
                <span className="text-xs font-mono text-orange-400 font-bold block mb-1">MODULE 04</span>
                <h4 className="text-sm font-bold font-display uppercase mb-1">Preventive Daily Maintenance</h4>
                <p className="text-slate-400 text-xs">Chemical backflushing, condenser coil brushing, water softener regeneration, and error code troubleshooting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL DIRECT CONTACT CTA STRIP */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-100 border border-slate-300 rounded-md p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#FF5722] font-bold block mb-1">
                READY TO EQUIP YOUR COMMERCIAL KITCHEN?
              </span>
              <h3 className="text-2xl font-black font-display uppercase tracking-tight text-slate-900">
                Speak With a ChefMachines Commercial Consultant Today.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Direct phone: <strong className="text-slate-900">9782690188</strong> &nbsp;|&nbsp; Direct email: <strong className="text-slate-900">saubg2@gmail.com</strong>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:9782690188"
                className="px-6 py-3 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition"
              >
                Call 9782690188
              </a>
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-6 py-3 rounded bg-[#FF5722] hover:bg-[#e64a19] text-white font-bold text-xs uppercase tracking-wider transition"
              >
                Request Quotation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
