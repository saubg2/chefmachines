import React from 'react';

export const CLIENT_LIST = [
  { name: 'Burger Farm', type: 'QSR Burger Chain', highlight: 'Pitco Fryers, Toastmaster Bun Warmers & Prep Lines' },
  { name: 'Nothing Before Coffee (NBC)', type: 'Specialty Coffee Chain', highlight: 'Commercial Espresso Machines & Barista Stations' },
  { name: 'Clarks Amer', type: '5-Star Luxury Hotel', highlight: 'Banquet Combi Ovens, Cold Storage & Dishwashing' },
  { name: 'Brown Sugar', type: 'Bakery & Patisserie Chain', highlight: 'Deck Ovens, Spiral Mixers & Chilled Display Cases' },
  { name: 'Cafe Nola', type: 'Specialty Cafe & Kitchen', highlight: 'Pitco Fryers, Hoshizaki/Celfrost & Electrolux Wash' },
  { name: 'OTH (On The House)', type: 'European Bistro & Cafe', highlight: 'Espresso Bar, Panini Stations & Prep Lines' },
  { name: 'Town Coffee', type: 'Specialty Coffee Roastery', highlight: 'Multi-Boiler Espresso & Fiorenzato Grinders' },
  { name: 'Brot Co', type: 'Artisan Bakery', highlight: 'Dough Sheeters, Steam Ovens & Proofers' },
  { name: 'Traut Cafe', type: 'Modern Cafe Bistro', highlight: 'Turnkey Kitchen Layout & Cold Prep' },
  { name: 'Baskin Robbins', type: 'Global Ice Cream Chain', highlight: 'Commercial Deep Freezers & Display Cases' },
  { name: 'Love Over Coffee', type: 'Coffee Chain', highlight: 'Dual-Boiler Machines & Beverage Systems' },
  { name: 'Blended Bliss', type: 'Shake & Smoothie Bar', highlight: 'Acoustic Commercial Sound Enclosure Blenders' },
  { name: 'Indira IVF', type: 'Healthcare & Hospitality', highlight: 'Hygienic Institutional Commercial Kitchen MEP' },
  { name: 'Gud Mishri', type: 'Confectionery & Sweets', highlight: 'Central Commissary Steam Jacketed Kettles' },
  { name: 'Shribhog', type: 'Food Services', highlight: 'Commercial Stainless Steel Tabling & Hoods' },
  { name: 'Gold Stone', type: 'Hospitality & Dining', highlight: 'Commercial Refrigeration & Bar Stations' },
  { name: 'Waraahi', type: 'Dining Lounge', highlight: 'Underbar Cocktail Stations & Dishwashers' },
  { name: 'City Heights', type: 'Hospitality & Banquets', highlight: 'Walk-in Cold Rooms & Cooking Ranges' }
];

export const ClientCredibility: React.FC = () => {
  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Proven Commercial Track Record
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Supplying to 500+ Outlets & Premier Chains
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
            From national QSR burger brands to luxury five-star hotels and artisanal roasteries.
          </p>
        </div>

        {/* Client Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
          {CLIENT_LIST.map((c, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 hover:border-slate-400 rounded-xl p-3.5 transition text-left shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 block mb-0.5">
                  Client
                </span>
                <h3 className="text-sm font-bold text-slate-900 font-display leading-tight">
                  {c.name}
                </h3>
                <span className="text-[10px] text-slate-500 block mt-0.5">{c.type}</span>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 text-[9px] text-slate-500">
                {c.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Cafe Nola Turnkey Execution Snapshot */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                Turnkey Kitchen Project Milestone
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Cafe Nola Commercial Kitchen & Barista Line
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Complete commercial kitchen fit-out: Pitco 35C+ 3-burner gas fryers, Hoshizaki/Celfrost upright chillers & double-cut prep cold pans, Electrolux commercial dishwashing, and Sinmag bakery deck ovens.
              </p>
            </div>
            <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <div className="text-3xl font-black text-slate-900 font-display mb-0.5">100%</div>
              <span className="text-xs font-bold text-slate-700 block">Turnkey On-Time Commissioning</span>
              <span className="text-[11px] text-slate-500 block mt-1">Full MEP Drawings, Equipment & Staff Training</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
