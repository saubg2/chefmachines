import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const BRANDS = [
  { name: 'Celfrost', role: 'Commercial Refrigeration & Ice', tag: 'Cold Chain', highlight: 'Upright Chillers, Backbars, Freezers' },
  { name: 'Electrolux', role: 'Commercial Ovens & Warewashing', tag: 'Heavy Duty', highlight: 'Undercounter Glasswashers, Combi Ovens' },
  { name: 'Fiorenzato', role: 'Italian Precision Coffee Grinders', tag: 'Barista Tech', highlight: 'F64 Evo, Red Speed 64mm Burrs' },
  { name: 'Middleby Marshall', role: 'Conveyor Pizza Ovens', tag: 'World #1', highlight: 'PS540 WOW! Impingement Conveyors' },
  { name: 'Pitco', role: 'Commercial Gas & Electric Fryers', tag: 'Fast Food', highlight: '35C+ SS 3-Burner, Deep Cold Zone' },
  { name: 'TurboChef', role: 'High-Speed Rapid Cook Ovens', tag: 'Rapid Cook', highlight: 'Sota Ventless, 10x Fast Cooking' },
  { name: 'Marco', role: 'Precision Hot Water & Beverage Fonts', tag: 'Specialty Beverage', highlight: 'MIX UC4 Under-counter Boilers' },
  { name: 'Timemore', role: 'Commercial Smart Brew Scales & Gear', tag: 'Specialty Coffee', highlight: 'Black Mirror Nano, 0.1g Flow-Rate' },
  { name: 'MHW-3BOMBER', role: 'Barista Tools & Constant Pressure Tampers', tag: 'Barista Gear', highlight: '58.5mm Calibrated Tampers & Pitchers' },
  { name: 'La Marzocco', role: 'Handcrafted Florence Espresso Machines', tag: 'Iconic Italian', highlight: 'Linea Classic S Dual Boilers' },
  { name: 'La Cimbali', role: 'Commercial Espresso Workhorses', tag: 'High Volume', highlight: 'M26 TE, Smart Boiler Thermal Tech' },
  { name: 'Fiamma', role: 'Espresso Systems & Panini Griddles', tag: 'European Craft', highlight: 'Compass Multi-Boiler Systems' },
  { name: 'Cunill', role: 'Heavy-Duty Silent Coffee Grinders', tag: 'Silent Motor', highlight: 'Tranquilo II 68dB Acoustic Steel' }
];

interface BrandMarqueeProps {
  onSelectBrand?: (brandName: string) => void;
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ onSelectBrand }) => {
  return (
    <section className="py-14 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
            Authorized Commercial Brand Partnerships
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Leading Equipment Brands We Supply
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
            Factory warranty, genuine spare parts, and certified technician service across India.
          </p>
        </div>

        {/* Clean Light Brand Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {BRANDS.map((b) => (
            <Link
              key={b.name}
              to={`/products?brand=${encodeURIComponent(b.name)}`}
              onClick={() => onSelectBrand?.(b.name)}
              className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-brand-orange rounded-xl p-3.5 transition-all shadow-sm hover:shadow flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 inline-block mb-1.5">
                  {b.tag}
                </span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-orange transition font-display">
                  {b.name}
                </h3>
                <p className="text-slate-500 text-[10px] line-clamp-1 mt-0.5">{b.role}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500 group-hover:text-brand-orange font-semibold">
                <span>View Models</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
