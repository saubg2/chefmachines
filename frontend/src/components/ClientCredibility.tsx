import React from 'react';
import { ShieldCheck, Award, Star, Flame, Utensils, CheckCircle2 } from 'lucide-react';

export const CLIENT_LIST = [
  { name: 'Burger Farm', type: 'QSR Burger Chain', highlight: 'Turnkey Fryers, Bun Warmers & Prep Lines' },
  { name: 'Nothing Before Coffee (NBC)', type: 'Specialty Coffee Chain', highlight: 'Commercial Espresso Machines & Barista Stations' },
  { name: 'Clarks Amer', type: '5-Star Luxury Hotel', highlight: 'Heavy Banquet Combi Ovens & Cold Storage' },
  { name: 'Brown Sugar', type: 'Bakery & Patisserie Chain', highlight: 'Deck Ovens, Spiral Mixers & Pastry Cases' },
  { name: 'Cafe Nola', type: 'Specialty Cafe & Kitchen', highlight: 'Pitco Fryers, Hoshizaki/Celfrost & Electrolux Wash' },
  { name: 'OTH (On The House)', type: 'European Bistro & Cafe', highlight: 'Espresso Bar, Panini Stations & Prep Lines' },
  { name: 'Town Coffee', type: 'Specialty Coffee Roastery', highlight: 'Multi-Boiler Espresso & Precision Grinders' },
  { name: 'Brot Co', type: 'Artisan Bakery', highlight: 'Dough Sheeters, Steam Ovens & Proofers' },
  { name: 'Traut Cafe', type: 'Modern Cafe Bistro', highlight: 'Turnkey Kitchen Layout & Cold Prep' },
  { name: 'Baskin Robbins', type: 'Global Ice Cream Chain', highlight: 'Commercial Deep Freezers & Display Cases' },
  { name: 'Love Over Coffee', type: 'Coffee Chain', highlight: 'Dual-Boiler Machines & Beverage Systems' },
  { name: 'Blended Bliss', type: 'Shake & Smoothie Bar', highlight: 'Acoustic Sound Enclosure Commercial Blenders' },
  { name: 'Indira IVF', type: 'Healthcare & Hospitality', highlight: 'Hygienic Institutional Commercial Kitchen MEP' },
  { name: 'Gud Mishri', type: 'Confectionery & Sweets', highlight: 'Central Commissary Steam Jacketed Kettles' },
  { name: 'Shribhog', type: 'Food Services', highlight: 'Commercial Stainless Steel Tabling & Hoods' },
  { name: 'Gold Stone', type: 'Hospitality & Dining', highlight: 'Commercial Refrigeration & Bar Stations' },
  { name: 'Waraahi', type: 'Dining Lounge', highlight: 'Underbar Cocktail Stations & Dishwashers' },
  { name: 'City Heights', type: 'Hospitality & Banquets', highlight: 'Walk-in Cold Rooms & Cooking Ranges' }
];

export const ClientCredibility: React.FC = () => {
  return (
    <section className="py-20 bg-[#0B0F17] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4" /> Trusted By 500+ Commercial Establishments
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white">
            Brands That Run on ChefMachines
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            From India's fastest-growing burger chains to iconic 5-star luxury hotels, specialty roasteries, and institutional kitchens.
          </p>
        </div>

        {/* Client Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
          {CLIENT_LIST.map((c, idx) => (
            <div
              key={idx}
              className="group bg-[#131A26] hover:bg-[#182332] border border-slate-800 hover:border-amber-400/80 rounded-2xl p-4 transition-all flex flex-col justify-between text-left shadow-lg hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                    CLIENT
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <h3 className="text-sm font-extrabold text-white font-display group-hover:text-amber-400 transition leading-snug">
                  {c.name}
                </h3>
                <span className="text-[10px] text-slate-400 block mt-1">{c.type}</span>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800 text-[9px] text-slate-400 leading-tight">
                {c.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Case Study Card: Real Project from Client List */}
        <div className="bg-gradient-to-r from-slate-900 via-[#151F2E] to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs uppercase font-extrabold text-brand-orange tracking-wider">
                Featured Turnkey Milestone
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
                Turnkey Kitchen Execution: <span className="text-amber-400">Cafe Nola</span>
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Complete commercial kitchen and barista line deployment for Cafe Nola: integrating <strong>Pitco 35C+ gas fryers</strong>, <strong>Celfrost/Hoshizaki upright chillers & double-cut cold pans</strong>, <strong>Electrolux commercial warewashing</strong>, and <strong>Sinmag artisan bakery ovens</strong>. Zero downtime since launch.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  🔥 Pitco Gas Fryers
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  ❄️ Celfrost Cold Line
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  🍽️ Electrolux Glasswashers
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                  ⚡ 3-Phase MEP Planning
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-center">
              <div className="text-4xl font-black text-emerald-400 font-display mb-1">100%</div>
              <span className="text-xs font-bold text-white block">Turnkey On-Time Handover</span>
              <p className="text-slate-400 text-[11px] mt-2">
                Delivered on schedule with complete MEP drawings, equipment installation, and staff academy training.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
