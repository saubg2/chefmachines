import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
            Pillar 2: Commercial Turnkey Solutions
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Turnkey Kitchen Setups
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
            From empty shell to fully operating kitchen. Over 500+ commercial setups completed for burger joints, specialty cafes, hotel banquets, and cloud kitchens.
          </p>
        </div>

        {/* 5-Step Process */}
        <div className="space-y-4 mb-12">
          {steps.map((s) => (
            <div
              key={s.step}
              className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-brand-orange font-bold text-base flex items-center justify-center shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-slate-600 text-xs max-w-xl leading-relaxed">{s.desc}</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs shrink-0 w-full md:w-56">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">Deliverables</span>
                <span className="text-slate-800 font-semibold text-[11px]">{s.deliverables}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Turnkey Call to Action */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            Schedule a Commercial Site Audit
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-5">
            Our MEP engineers review your floor plans, power connections, and exhaust shafts to prepare an accurate turnkey BOQ.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenQuoteModal("Commercial Kitchen Site Audit & Turnkey Setup")}
              className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Request Site Audit
            </button>
            <Link
              to="/wizard"
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-200 transition"
            >
              Run Setup Wizard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
