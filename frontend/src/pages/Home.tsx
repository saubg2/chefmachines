import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Wand2,
  Calculator,
  UtensilsCrossed,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Flame,
  ArrowRight,
  CheckCircle2,
  Zap,
  Snowflake,
  Coffee,
  Building2,
  ChefHat,
  Gauge,
  Layers,
  PhoneCall,
  Clock,
  BookOpen
} from 'lucide-react';
import { api, Product, TrainingModule, BlogPost } from '../services/api';

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
  const [calcRoomLen, setCalcRoomLen] = useState(10);
  const [calcRoomWid, setCalcRoomWid] = useState(8);

  useEffect(() => {
    api.getProducts({ featured: true }).then((data) => setFeaturedProducts(data.slice(0, 6))).catch(console.error);
    api.getTrainingModules().then((data) => setTrainingModules(data.slice(0, 3))).catch(console.error);
    api.getBlogs().then((data) => setRecentBlogs(data.slice(0, 3))).catch(console.error);
  }, []);

  const wizardPreviews = {
    burger_joint: {
      title: "Gourmet Burger Joint & QSR",
      time: "12s Bun Caramelization",
      equipment: ["TurboBake Contact Bun Warmer", "Twin-Well 28L Filtered Fryer", "ChromeMax 900mm Clamshell Griddle", "Chilled Burger Prep Counter"],
      budget: "₹4.9L - ₹18L",
      kw: "24 - 38 kW",
      orders: "100 - 500 burgers/day"
    },
    artisanal_cafe: {
      title: "Specialty Cafe & Roastery",
      time: "240 Shots / Peak Hour",
      equipment: ["Dual-Boiler 2-Group Espresso Machine", "Precision On-Demand Grinders", "FrostFlow 120kg Gourmet Ice Maker", "Underbar Milk Pitcher Rinser"],
      budget: "₹6.2L - ₹19.5L",
      kw: "8.5 - 16 kW",
      orders: "150 - 800 cups/day"
    },
    artisan_pizzeria: {
      title: "Authentic Neapolitan Pizzeria",
      time: "4.5 Min Continuous Bake",
      equipment: ["SpeedFire 32-Inch Conveyor Oven", "SpiralMax 40kg Dough Mixer", "Granite-top Pizza Prep Station", "10-Tray Blast Chiller"],
      budget: "₹5.4L - ₹22L",
      kw: "15 - 34 kW",
      orders: "100 - 600 pizzas/day"
    },
    cloud_kitchen: {
      title: "High-Volume Cloud Kitchen",
      time: "Multi-Brand 24/7 Delivery",
      equipment: ["MasterTouch 10-Tray Combi Steam Oven", "Twin Filtered Heavy Fryers", "Walk-in Modular Cold Room", "Pass-Through Hood Dishwasher"],
      budget: "₹8.4L - ₹32L",
      kw: "37 - 70 kW",
      orders: "300 - 1,500 orders/day"
    }
  };

  const selectedPreview = wizardPreviews[activeConcept as keyof typeof wizardPreviews] || wizardPreviews.burger_joint;

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden">
      {/* 1. HERO SECTION: FLOWING & VIBRANT */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 bg-radial-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top trust badge */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg text-xs font-semibold text-slate-300">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange"></span>
              </span>
              <span>Powering Over <strong className="text-amber-400">500+ Cafes & Commercial Kitchens</strong> Across India</span>
            </div>
          </div>

          {/* Main Hero Header */}
          <div className="text-center mt-6 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white leading-tight">
              Engineered For Speed, Taste & <span className="gradient-text-flame">Zero Downtime</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              From commercial freezers, fryers, and espresso machines to turnkey MEP fit-outs and barista academy certifications. One brand for commercial food excellence.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/wizard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-orange via-amber-500 to-amber-600 hover:from-brand-orange-hover hover:to-amber-700 text-white font-extrabold text-base shadow-2xl shadow-brand-orange/30 transition transform hover:-translate-y-0.5"
              >
                <Wand2 className="w-5 h-5" />
                <span>Launch Interactive Setup Wizard</span>
              </Link>
              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-base transition"
              >
                <UtensilsCrossed className="w-5 h-5 text-brand-orange" />
                <span>Browse Equipment Catalog</span>
              </Link>
            </div>
          </div>

          {/* Dynamic Floating Credibility Metric Pills */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-[#121A26]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 text-center transform hover:border-brand-orange/40 transition">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-display">500+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Cafes & Kitchens Built</div>
            </div>
            <div className="bg-[#121A26]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 text-center transform hover:border-brand-orange/40 transition">
              <div className="text-3xl sm:text-4xl font-black text-white font-display">15,000+</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Machines in Daily Service</div>
            </div>
            <div className="bg-[#121A26]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 text-center transform hover:border-brand-orange/40 transition">
              <div className="text-3xl sm:text-4xl font-black text-brand-orange font-display">99.4%</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Operational Equipment Uptime</div>
            </div>
            <div className="bg-[#121A26]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 text-center transform hover:border-brand-orange/40 transition">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-display">&lt; 4 Hours</div>
              <div className="text-xs text-slate-400 font-medium mt-1">Metropolitan Service SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 INTERNAL PILLARS (FLOWING CARDS) */}
      <section className="py-20 bg-[#0E131C] border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
              Comprehensive Foodservice Platform
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white">
              The 4 Pillars of ChefMachines
            </h2>
            <p className="text-slate-400 text-base mt-3">
              We eliminate the friction of dealing with multiple unaligned vendors. We handle your hardware, layout, manpower, and uptime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar A: Equipment Sales */}
            <div className="relative group bg-gradient-to-b from-[#182332] to-[#111823] border border-slate-700/80 rounded-3xl p-7 hover:border-brand-orange transition-all shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition">
                <UtensilsCrossed className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Pillar 1</span>
              <h3 className="text-xl font-bold font-display text-white mt-1 mb-3">
                Commercial Equipment Sales
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Direct access to commercial freezers, combi steamers, contact bun warmers, automatic oil-filtration fryers, espresso machines, and Middleby Celfrost systems.
              </p>
              <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-amber-400">
                Explore Equipment <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar B: Turnkey Solutions */}
            <div className="relative group bg-gradient-to-b from-[#182332] to-[#111823] border border-slate-700/80 rounded-3xl p-7 hover:border-amber-400 transition-all shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:bg-amber-500 group-hover:text-slate-900 transition">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Pillar 2</span>
              <h3 className="text-xl font-bold font-display text-white mt-1 mb-3">
                Turnkey Kitchen Solutions
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                End-to-end design for burger joints, cafes, bars, and cloud kitchens: 3D CAD workflows, MEP electrical & plumbing drawings, stainless fabrication, and gas piping.
              </p>
              <Link to="/turnkey" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-white">
                Turnkey Capabilities <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar C: Barista & Manpower Training */}
            <div className="relative group bg-gradient-to-b from-[#182332] to-[#111823] border border-slate-700/80 rounded-3xl p-7 hover:border-emerald-400 transition-all shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-slate-900 transition">
                <GraduationCap className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Pillar 3</span>
              <h3 className="text-xl font-bold font-display text-white mt-1 mb-3">
                Barista & Manpower Training
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Machines are only as great as the manpower operating them. We train your staff to become expert baristas, combi chefs, and QSR line technicians with certifications.
              </p>
              <Link to="/training" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-white">
                View Academy Modules <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar D: Smart Kitchen Care & AMC */}
            <div className="relative group bg-gradient-to-b from-[#182332] to-[#111823] border border-slate-700/80 rounded-3xl p-7 hover:border-brand-teal transition-all shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-slate-900 transition">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Pillar 4</span>
              <h3 className="text-xl font-bold font-display text-white mt-1 mb-3">
                Smart Care & 24/7 AMC
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Preventative AMC contracts, genuine spare parts stocked in 12 cities, emergency technician dispatch, and scheduled descaling/condenser maintenance cycles.
              </p>
              <button
                onClick={() => onOpenQuoteModal("24/7 Preventive AMC Plan")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white"
              >
                Inquire AMC Plans <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SETUP WIZARD TEASER (FLOWING INTERACTIVE PREVIEW) */}
      <section className="py-24 bg-gradient-to-b from-[#0B0F17] via-[#111826] to-[#0B0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#151F2E] border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Background glowing flair */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Concept Selector */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-bold mb-3">
                  <Wand2 className="w-4 h-4" /> Live Kitchen Configurator
                </div>
                <h3 className="text-3xl sm:text-4xl font-black font-display text-white leading-tight">
                  Commercial Kitchen Set-up Wizard
                </h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                  Starting a burger joint, cafe, pizzeria, or cloud kitchen? Select your concept and let our wizard dynamically calculate your equipment list, electrical sanction kW, exhaust CFM, and estimated budget.
                </p>

                {/* Concept Tabs */}
                <div className="mt-6 space-y-2">
                  {[
                    { key: 'burger_joint', name: 'Burger Joint & Fast Casual', icon: Flame },
                    { key: 'artisanal_cafe', name: 'Specialty Cafe & Roastery', icon: Coffee },
                    { key: 'artisan_pizzeria', name: 'Artisan Pizzeria', icon: UtensilsCrossed },
                    { key: 'cloud_kitchen', name: 'High-Volume Cloud Kitchen', icon: Layers }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveConcept(tab.key)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                        activeConcept === tab.key
                          ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30 font-bold'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.name}</span>
                      </div>
                      <ArrowRight className={`w-4 h-4 ${activeConcept === tab.key ? 'opacity-100' : 'opacity-40'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Live Calculated Blueprint Card */}
              <div className="lg:col-span-7">
                <div className="bg-[#0B0F17] border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-2">
                    <div>
                      <span className="text-xs uppercase font-bold text-amber-400">Blueprint Profile</span>
                      <h4 className="text-xl font-bold font-display text-white">{selectedPreview.title}</h4>
                    </div>
                    <div className="px-3 py-1 bg-brand-orange/15 text-brand-orange text-xs font-bold rounded-full border border-brand-orange/30">
                      ⚡ {selectedPreview.time}
                    </div>
                  </div>

                  {/* Calculated metrics */}
                  <div className="grid grid-cols-3 gap-3 my-5">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
                      <span className="text-[11px] text-slate-400 block">Est. Equipment Budget</span>
                      <strong className="text-sm sm:text-base font-extrabold text-white">{selectedPreview.budget}</strong>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
                      <span className="text-[11px] text-slate-400 block">Sanction Power</span>
                      <strong className="text-sm sm:text-base font-extrabold text-amber-400">{selectedPreview.kw}</strong>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
                      <span className="text-[11px] text-slate-400 block">Target Output</span>
                      <strong className="text-sm sm:text-base font-extrabold text-emerald-400">{selectedPreview.orders}</strong>
                    </div>
                  </div>

                  {/* Auto-generated Equipment Items */}
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                      Recommended Core Equipment:
                    </span>
                    <ul className="space-y-2">
                      {selectedPreview.equipment.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-800/80">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-slate-400">
                      Includes Bun Warmers, Filtered Fryers, Freezers, MEP plans
                    </span>
                    <Link
                      to={`/wizard?concept=${activeConcept}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-brand-orange/20"
                    >
                      <Wand2 className="w-4 h-4" /> Customize This Setup
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EQUIPMENT SHOWCASE & MIDDLEBY CELFROST CATALOG */}
      <section className="py-20 bg-[#0B0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                Heavy Duty Commercial Machines
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-display text-white">
                Engineered for High-Volume Service
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">
                Commercial freezers, blast chillers, bun warmers, and combi ovens engineered to handle 43°C Indian ambient temperatures.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-amber-400 transition"
              >
                <span>View Full 50+ Equipment Range</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="group bg-[#151D2A] border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl hover:border-brand-orange transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-56 bg-slate-900/90 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={p.image_url || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80'}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/90 text-amber-400 border border-amber-500/30 backdrop-blur-sm">
                      {p.brand || 'ChefMachines Pro'}
                    </div>
                    {p.model && (
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/75 text-slate-300 border border-slate-700">
                        {p.model}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold font-display text-white line-clamp-2 group-hover:text-amber-400 transition">
                      {p.name}
                    </h3>
                    <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Features list */}
                    {p.features && p.features.length > 0 && (
                      <ul className="mt-4 space-y-1">
                        {p.features.slice(0, 2).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                            <span className="w-1 h-1 rounded-full bg-brand-orange" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Footer / RFQ Button */}
                <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Commercial RFQ</span>
                    <span className="text-sm font-bold text-white">Direct Factory Pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/products/${p.slug}`}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl transition"
                    >
                      Specs
                    </Link>
                    <button
                      onClick={() => onOpenQuoteModal(p.name)}
                      className="px-3.5 py-2 bg-brand-orange hover:bg-brand-orange-hover text-xs font-bold text-white rounded-xl shadow-md shadow-brand-orange/30 transition"
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

      {/* 5. INTERACTIVE SIZING & ROI CALCULATORS (HOME PREVIEW) */}
      <section className="py-20 bg-gradient-to-b from-[#0E141E] to-[#0B0F17] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Calculator className="w-4 h-4" /> Commercial Engineering Calculators
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white">
              Sizing Your Equipment Accurately
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Avoid buying undersized machines that burn out during peak rush, or oversized units that inflate electricity bills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Calculator 1: Espresso Peak Throughput */}
            <div className="bg-[#151F2E] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">Coffee Machine Sizer</h3>
                    <span className="text-xs text-slate-400">Peak hour cup extraction & boiler sizing</span>
                  </div>
                </div>
                <span className="text-xs font-mono bg-slate-900 px-2.5 py-1 rounded-full text-amber-400 border border-slate-700">
                  {calcCups} cups/day
                </span>
              </div>

              <div className="my-6">
                <label className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>Expected Daily Coffee Cups:</span>
                  <span className="font-mono text-white text-sm">{calcCups} cups</span>
                </label>
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

              <div className="grid grid-cols-2 gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <div>
                  <span className="text-[11px] text-slate-400 block">Peak Hour Load (35% rush)</span>
                  <strong className="text-lg font-bold text-white">
                    {Math.round((calcCups * 0.35) / 2)} cups/hr
                  </strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Recommended Machine</span>
                  <strong className="text-base font-bold text-amber-400">
                    {calcCups <= 150 ? '1-Group Dual Boiler' : calcCups <= 450 ? '2-Group Commercial' : '3-Group Multi-Boiler'}
                  </strong>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-slate-400">Full specs & steam boiler requirements</span>
                <Link
                  to="/calculators"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-white"
                >
                  Open Full Calculator <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick Calculator 2: Cold Room Storage Volume */}
            <div className="bg-[#151F2E] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                    <Snowflake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">Cold Room Sizer</h3>
                    <span className="text-xs text-slate-400">Walk-in chiller & freezer volume capacity</span>
                  </div>
                </div>
                <span className="text-xs font-mono bg-slate-900 px-2.5 py-1 rounded-full text-cyan-400 border border-slate-700">
                  {calcRoomLen} x {calcRoomWid} ft
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 my-6">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Length: {calcRoomLen} ft</label>
                  <input
                    type="range"
                    min="6"
                    max="30"
                    value={calcRoomLen}
                    onChange={(e) => setCalcRoomLen(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Width: {calcRoomWid} ft</label>
                  <input
                    type="range"
                    min="6"
                    max="25"
                    value={calcRoomWid}
                    onChange={(e) => setCalcRoomWid(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-900/90 border border-slate-800 rounded-xl p-4">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total Storage Volume (at 8.5ft H)</span>
                  <strong className="text-lg font-bold text-white">
                    {Math.round(calcRoomLen * calcRoomWid * 8.5)} Cu Ft
                  </strong>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Recommended Compressor</span>
                  <strong className="text-base font-bold text-cyan-400">
                    {Math.max(1.5, Math.round(((calcRoomLen * calcRoomWid * 8.5) / 450) * 10) / 10)} HP Unit
                  </strong>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-slate-400">Includes PUF panels & BTU loads</span>
                <Link
                  to="/calculators"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white"
                >
                  Open Full Calculator <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRAINING ACADEMY SPOTLIGHT */}
      <section className="py-20 bg-[#0B0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-[#182332] to-slate-900 border border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                  <GraduationCap className="w-4 h-4" /> ChefMachines Academy
                </div>
                <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
                  Train Your Manpower to Become World-Class Baristas & Chefs
                </h2>
                <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                  The #1 reason commercial food businesses fail to scale isn't the equipment—it's untrained staff abusing machines and serving inconsistent recipes. Our certified trainers conduct hands-on training on your exact equipment.
                </p>

                <div className="mt-6 space-y-3">
                  {trainingModules.map((tm) => (
                    <div key={tm.id} className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
                      <div>
                        <h4 className="text-sm font-bold text-white">{tm.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                          <span>⏱️ {tm.duration}</span>
                          <span>•</span>
                          <span className="text-emerald-400">{tm.badge || 'Certified'}</span>
                        </div>
                      </div>
                      <Link
                        to="/training"
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold hover:bg-emerald-500 hover:text-slate-900 transition"
                      >
                        Enroll Crew
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 text-center shadow-xl">
                  <div className="w-16 h-16 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center mx-auto mb-4 border border-brand-orange/40">
                    <ChefHat className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">Custom On-Site Academy</h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    Opening 5+ outlets? We dispatch our master trainers directly to your kitchen commissary for comprehensive multi-day staff certification.
                  </p>
                  <button
                    onClick={() => onOpenQuoteModal("Custom On-Site Staff Training Program")}
                    className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/20"
                  >
                    Request Corporate Training Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LATEST BLOGS & RESOURCES */}
      <section className="py-20 bg-[#0E131C] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4" /> Commercial Knowledge Hub
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
                Kitchen Setup Guides & Checklists
              </h2>
            </div>
            <Link to="/blogs" className="mt-3 sm:mt-0 text-sm font-bold text-brand-orange hover:text-amber-400 inline-flex items-center gap-1.5">
              <span>View All Articles</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBlogs.map((b) => (
              <div
                key={b.id}
                className="bg-[#151D2A] border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl hover:border-slate-500 transition flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-slate-900 overflow-hidden relative">
                    <img
                      src={b.cover_image || 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80'}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/75 text-amber-400 border border-amber-400/30">
                      {b.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] text-slate-400 block mb-1">⏱️ {b.read_time}</span>
                    <h3 className="text-base font-bold text-white line-clamp-2 leading-snug hover:text-brand-orange transition">
                      <Link to={`/blogs/${b.slug}`}>{b.title}</Link>
                    </h3>
                    <p className="text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                      {b.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/blogs/${b.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange hover:text-amber-400"
                  >
                    Read Engineering Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BOTTOM HERO CTA: TURNKEY CONSULTATION */}
      <section className="py-20 bg-gradient-to-r from-brand-orange via-amber-600 to-brand-orange text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
            Ready to Build Your 500+ Grade Commercial Kitchen?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-amber-100 max-w-2xl mx-auto">
            Book a 30-minute kitchen layout and equipment audit with our senior commercial MEP engineers. Free consultation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuoteModal("30-Minute Commercial Kitchen Layout & Equipment Consultation")}
              className="w-full sm:w-auto px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-2xl transition"
            >
              Book Commercial Kitchen Audit
            </button>
            <Link
              to="/wizard"
              className="w-full sm:w-auto px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold text-sm uppercase tracking-wider rounded-2xl border border-white/30 transition"
            >
              Run Setup Wizard Flow
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
