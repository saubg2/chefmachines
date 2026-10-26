import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const BRANDS = [
  { name: 'Celfrost', role: 'Commercial Refrigeration & Ice', tag: 'Cold Chain', highlight: 'Upright Chillers, Backbars, Freezers' },
  { name: 'Electrolux', role: 'Commercial Ovens & Warewashing', tag: 'Heavy Duty', highlight: 'Undercounter Glasswashers, Combi Ovens' },
  { name: 'Fiorenzato', role: 'Italian Precision Coffee Grinders', tag: 'Barista Tech', highlight: 'F64 Evo, Red Speed 64mm Burrs' },
  { name: 'Middleby Marshall', role: 'Conveyor Pizza Ovens', tag: 'World #1', highlight: 'PS540 WOW! Variable Air Impingement' },
  { name: 'Pitco', role: 'Commercial Gas & Electric Fryers', tag: 'Fast Food', highlight: '35C+ SS 3-Burner, Deep Cold Zone' },
  { name: 'TurboChef', role: 'High-Speed Accelerated Ovens', tag: 'Rapid Cook', highlight: 'Sota Ventless, 10x Fast Cooking' },
  { name: 'Marco', role: 'Precision Hot Water & Beverage Fonts', tag: 'Specialty Beverage', highlight: 'MIX UC4 Under-counter Boilers' },
  { name: 'Timemore', role: 'Commercial Smart Brew Scales & Gear', tag: 'Specialty Coffee', highlight: 'Black Mirror Nano, 0.1g Flow-Rate' },
  { name: 'MHW-3BOMBER', role: 'Barista Tools & Constant Pressure Tampers', tag: 'Barista Gear', highlight: '58.5mm Calibrated Tampers & Pitchers' },
  { name: 'La Marzocco', role: 'Handcrafted Florence Espresso Machines', tag: 'Iconic Italian', highlight: 'Linea Classic S Dual Boilers' },
  { name: 'La Cimbali', role: 'Commercial Espresso Workhorses', tag: 'High Volume', highlight: 'M26 TE, Smart Boiler Thermal Tech' },
  { name: 'Fiamma', role: 'Espresso Systems & Panini Griddles', tag: 'European Craft', highlight: 'Compass Multi-Boiler, Cast Griddles' },
  { name: 'Cunill', role: 'Heavy-Duty Silent Coffee Grinders', tag: 'Silent Motor', highlight: 'Tranquilo II 68dB Acoustic Steel' }
];

interface BrandMarqueeProps {
  onSelectBrand?: (brandName: string) => void;
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ onSelectBrand }) => {
  return (
    <section className="py-16 bg-[#0E1420] border-y border-slate-800/80 relative overflow-hidden">
      {/* Background ambient flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-brand-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2.5">
            <ShieldCheck className="w-4 h-4 text-brand-orange" />
            Authorized Commercial Distribution & Warranty
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
            World-Class Commercial Brands We Distribute
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Factory-backed warranty, genuine spare parts stocked in 12 cities, and certified technical AMC care.
          </p>
        </div>

        {/* Flowing Brand Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {BRANDS.map((b) => (
            <Link
              key={b.name}
              to={`/products?brand=${encodeURIComponent(b.name)}`}
              onClick={() => onSelectBrand?.(b.name)}
              className="group bg-[#151E2C] hover:bg-[#1A2637] border border-slate-800 hover:border-brand-orange rounded-2xl p-4 transition-all shadow-md hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-amber-400 border border-slate-800 inline-block mb-2">
                  {b.tag}
                </span>
                <h3 className="text-sm font-extrabold text-white group-hover:text-amber-400 transition font-display">
                  {b.name}
                </h3>
                <p className="text-slate-400 text-[10px] line-clamp-1 mt-0.5">{b.role}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 group-hover:text-brand-orange font-semibold">
                <span>View Range</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
