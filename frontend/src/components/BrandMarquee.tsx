import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogos';

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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider block mb-1">
              Authorized Manufacturer Partnerships
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display uppercase tracking-tight">
              Leading Commercial Brands We Supply
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 md:mt-0 max-w-md">
            Direct factory distribution, authentic OEM spare parts, and certified technician service across India.
          </p>
        </div>

        {/* Clean Architectural Grid of Brand Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {BRANDS.map((b) => (
            <Link
              key={b.name}
              to={`/products?brand=${encodeURIComponent(b.name)}`}
              onClick={() => onSelectBrand?.(b.name)}
              className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#FF5722] rounded-md p-4 transition-all flex flex-col justify-between shadow-none hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    {b.tag}
                  </span>
                </div>
                {/* Brand Logo & Logomark */}
                <div className="py-2.5 flex items-center min-h-[38px]">
                  <BrandLogo brand={b.name} className="h-6" />
                </div>
                <p className="text-slate-500 text-[11px] mt-1 line-clamp-1">{b.role}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 group-hover:text-[#FF5722] font-bold">
                <span>View Equipment</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
