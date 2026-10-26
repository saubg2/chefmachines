import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Pillars & Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <Logo size="md" variant="dark" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              ChefMachines (chefmachines.com) is India's leading commercial food preparation equipment supplier and turnkey kitchen setup partner. Authorized distributor of Pitco, Celfrost, La Marzocco, Electrolux, TurboChef, Middleby Marshall, and Marco.
            </p>
            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <p>Direct Hotline: <a href="tel:9782690188" className="text-white hover:text-[#FF5722] font-bold">9782690188</a></p>
              <p>Email: <a href="mailto:saubg2@gmail.com" className="text-white hover:text-[#FF5722] font-semibold">saubg2@gmail.com</a></p>
              <p>Headquarters: Commercial Tech Park, Indiranagar, Bangalore 560038</p>
            </div>
          </div>

          {/* Core Functions */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/products" className="hover:text-white transition">Commercial Equipment Sales</Link></li>
              <li><Link to="/turnkey" className="hover:text-white transition">Turnkey Kitchen Setups</Link></li>
              <li><Link to="/training" className="hover:text-white transition">Barista & Manpower Academy</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Smart Care & 24/7 AMC</Link></li>
              <li><Link to="/wizard" className="text-brand-orange hover:underline font-semibold">Kitchen Setup Wizard</Link></li>
            </ul>
          </div>

          {/* Brands We Supply */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Authorized Brands
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/products?brand=Pitco" className="hover:text-white transition">Pitco Fryers</Link></li>
              <li><Link to="/products?brand=Celfrost" className="hover:text-white transition">Celfrost Refrigeration</Link></li>
              <li><Link to="/products?brand=La%20Marzocco" className="hover:text-white transition">La Marzocco Espresso</Link></li>
              <li><Link to="/products?brand=Middleby%20Marshall" className="hover:text-white transition">Middleby Marshall Ovens</Link></li>
              <li><Link to="/products?brand=TurboChef" className="hover:text-white transition">TurboChef Rapid Ovens</Link></li>
              <li><Link to="/products?brand=Electrolux" className="hover:text-white transition">Electrolux Warewashing</Link></li>
              <li><Link to="/products?brand=Fiorenzato" className="hover:text-white transition">Fiorenzato Grinders</Link></li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Calculators & Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/calculators" className="hover:text-white transition">Cold Room Sizer</Link></li>
              <li><Link to="/calculators" className="hover:text-white transition">Coffee Peak Sizer</Link></li>
              <li><Link to="/calculators" className="hover:text-white transition">Exhaust Hood CFM Sizer</Link></li>
              <li><Link to="/calculators" className="hover:text-white transition">Fryer Oil ROI Calculator</Link></li>
              <li><Link to="/blogs" className="hover:text-white transition">Commercial Kitchen Guides</Link></li>
              <li className="pt-2">
                <Link to="/admin" className="text-slate-400 hover:text-white font-semibold">
                  ⚙️ CMS Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} ChefMachines (chefmachines.com). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>500+ Outlets Delivered</span>
            <span>Commercial Equipment & Engineering</span>
            <span>Deployable on Railway</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
