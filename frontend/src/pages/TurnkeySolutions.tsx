import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  CheckCircle2,
  PhoneCall,
  Wand2,
  ShieldCheck,
  Compass,
  Zap,
  Flame,
  ArrowRight
} from 'lucide-react';

interface TurnkeyProps {
  onOpenQuoteModal: (equipment?: string) => void;
}

export const TurnkeySolutions: React.FC<TurnkeyProps> = ({ onOpenQuoteModal }) => {
  const steps = [
    {
      step: '01',
      title: 'Conceptual Layout & 3D Flow Simulation',
      desc: 'We map linear kitchen workstations to prevent cross-contamination, separate dish return from plate pickup, and minimize line-cook footsteps.',
      deliverables: 'CAD Plan, 3D Renderings, Workstation Zoning'
    },
    {
      step: '02',
      title: 'MEP Electrical & Plumbing Engineering',
      desc: 'Full schematics for 3-phase connected power, individual MCB sizing, gas manifold piping, water filtration inlets, and grease trap drains.',
      deliverables: 'Electrical Load Chart, Plumbing Schematics, Gas Line Plan'
    },
    {
      step: '03',
      title: 'Custom SS-304 Food-Grade Fabrication',
      desc: 'In-house precision stainless steel fabrication: custom work tables, underbar sinks, speed rails, refrigerated prep counters, and exhaust canopies.',
      deliverables: '16-Gauge 304 Stainless Steel, Seamless Tig Welding'
    },
    {
      step: '04',
      title: 'Commercial Equipment Fit-Out & Testing',
      desc: 'Heavy-duty equipment delivery, leveling, plumbing hookup, refrigeration gas checks, fryer temperature calibration, and high-temp dishwashing test.',
      deliverables: 'Full Pre-Commissioning Audit & Calibration'
    },
    {
      step: '05',
      title: 'Staff Academy Training & Go-Live Trial',
      desc: 'Our certified master trainers conduct 2-day on-site staff training on espresso extraction, combi oven programming, oil filtering, and daily cleaning.',
      deliverables: 'Certified Crew, Operational Checklists, Warranty Start'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" /> Pillar 2: Turnkey Engineering
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
            End-to-End Turnkey Kitchen Setups
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            From an empty bare shell to a fully operational, revenue-generating commercial kitchen. Over 500+ cafes, burger joints, bars, and cloud kitchens launched on time and within budget.
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="space-y-6 mb-16">
          {steps.map((s, idx) => (
            <div
              key={s.step}
              className="bg-[#151F2E] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange to-amber-500 text-white font-display font-black text-xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-orange/20">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-2">{s.title}</h3>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">{s.desc}</p>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs shrink-0 w-full md:w-64">
                <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Deliverables</span>
                <span className="text-slate-300 font-semibold">{s.deliverables}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Concepts We Specialize In */}
        <div className="bg-gradient-to-r from-slate-900 via-[#182332] to-slate-900 border border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl mb-16">
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-6 text-center">
            Turnkey Concepts We Deliver Across India
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              { title: 'Gourmet Burger Joints', desc: 'Bun warmers, 3-phase fryers, clamshell griddles, refrigerated prep lines' },
              { title: 'Specialty Cafes & Roasteries', desc: 'Espresso bars, pitcher rinsers, ice machines, acoustic blenders' },
              { title: 'Artisan Pizzerias', desc: 'Conveyor & deck ovens, spiral dough mixers, marble prep tables' },
              { title: 'High-Volume Cloud Kitchens', desc: 'Combi ovens, blast chillers, walk-in cold rooms, multi-burner lines' },
              { title: 'Cocktail Bars & Lounges', desc: 'Underbar cocktail stations, speed rails, rapid glasswashers' },
              { title: 'Bakeries & Patisseries', desc: 'Rotary ovens, planetary mixers, retarder proofers, dough sheeters' }
            ].map((c, i) => (
              <div key={i} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
                <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> {c.title}
                </h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Turnkey Call to Action */}
        <div className="text-center bg-gradient-to-r from-brand-orange to-amber-600 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
            Book a Commercial Kitchen Site Audit
          </h2>
          <p className="text-amber-100 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Our MEP engineers will review your floor plan, connected power, and exhaust shaft to deliver a turnkey layout proposal.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuoteModal("Commercial Kitchen Turnkey Setup Consultation")}
              className="px-8 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-xl"
            >
              Request Turnkey Consultation
            </button>
            <Link
              to="/wizard"
              className="px-8 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/30 transition"
            >
              Run Setup Wizard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
