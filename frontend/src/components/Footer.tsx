import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Wand2,
  Calculator,
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#080B11] border-t border-slate-800/80 text-slate-400 overflow-hidden pt-16 pb-12">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-brand-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Highlight Banner: 500+ Commercial Cafes Credibility */}
        <div className="bg-gradient-to-r from-slate-900 via-[#161F2E] to-slate-900 border border-slate-700/60 rounded-3xl p-6 sm:p-8 mb-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                Industry Proven Track Record
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
                Over <span className="text-amber-400">500+ Cafes & Commercial Kitchens</span> Powered Across India
              </h3>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
                From fast-casual burger franchises to artisanal roasteries, five-star hotel banquets, and high-volume cloud kitchens—we engineer the heart of food businesses with commercial reliability.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                to="/wizard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-brand-orange/25 transition"
              >
                <Wand2 className="w-4 h-4" /> Start Kitchen Setup Wizard
              </Link>
              <Link
                to="/calculators"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition"
              >
                <Calculator className="w-4 h-4 text-brand-orange" /> Sizing & ROI Calculators
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Pillars & Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Logo size="md" />
            <p className="text-slate-400 text-sm mt-4 leading-relaxed max-w-sm">
              ChefMachines (chefmachines.com) is India’s foremost commercial food service engineering platform. We distribute world-class commercial kitchen equipment, deliver turnkey installations, and train world-class barista manpower.
            </p>
            <div className="mt-6 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span>Commercial Inquiries: <strong>+91 (080) 4567-8900</strong> / <strong>+91 98800-CHEFM</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <span>contact@chefmachines.com | sales@chefmachines.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>Headquarters: Commercial Tech Park, Indiranagar, Bangalore 560038</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-orange shrink-0" />
                <span>24x7 AMC Emergency Service Support</span>
              </div>
            </div>
          </div>

          {/* 4 Pillars Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-brand-orange pl-2.5">
              4 Core Functions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products" className="hover:text-white transition flex items-center justify-between group">
                  <span>1. Commercial Equipment Sales</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition text-brand-orange" />
                </Link>
              </li>
              <li>
                <Link to="/turnkey" className="hover:text-white transition flex items-center justify-between group">
                  <span>2. Turnkey Kitchen Setups</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition text-brand-orange" />
                </Link>
              </li>
              <li>
                <Link to="/training" className="hover:text-white transition flex items-center justify-between group">
                  <span>3. Barista & Manpower Academy</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition text-brand-orange" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition flex items-center justify-between group">
                  <span>4. Smart Kitchen AMC & Care</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition text-brand-orange" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2.5">
              Interactive Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/wizard" className="hover:text-amber-400 transition font-medium">
                  Burger Joint Setup Wizard
                </Link>
              </li>
              <li>
                <Link to="/wizard" className="hover:text-amber-400 transition font-medium">
                  Artisanal Cafe Setup Wizard
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="hover:text-white transition">
                  Walk-in Cold Room Sizer
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="hover:text-white transition">
                  Coffee Machine Peak Sizer
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="hover:text-white transition">
                  Kitchen Exhaust Hood CFM Sizer
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="hover:text-white transition">
                  Fryer Oil Filtration ROI Calc
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Portal */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-brand-teal pl-2.5">
              Knowledge & CMS
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/blogs" className="hover:text-white transition">
                  Commercial Kitchen Blogs
                </Link>
              </li>
              <li>
                <Link to="/blogs/how-to-setup-burger-joint-equipment-checklist" className="hover:text-white transition">
                  Burger Station Equipment Guide
                </Link>
              </li>
              <li>
                <Link to="/blogs/commercial-kitchen-electrical-mep-mistakes" className="hover:text-white transition">
                  MEP & 3-Phase Power Planning
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  Our 500+ Cafe Story
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin"
                  className="inline-block px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-orange hover:text-white font-semibold text-xs border border-slate-700 transition"
                >
                  ⚙️ ChefMachines CMS Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ChefMachines (chefmachines.com). All rights reserved. Commercial Food Equipment & Engineering.</p>
          <div className="flex items-center gap-6">
            <span>ISO 9001:2015 Certified Commercial Fabrication</span>
            <span>HACCP Compliance Compliant</span>
            <span className="text-slate-400">Deployable on Railway</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
