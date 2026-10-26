import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Wand2,
  Calculator,
  UtensilsCrossed,
  GraduationCap,
  Sparkles,
  BookOpen,
  PhoneCall,
  Menu,
  X,
  ShieldCheck,
  Flame,
  LayoutDashboard
} from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenQuoteModal: (equipment?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Equipment Sales', path: '/products', icon: UtensilsCrossed },
    { name: 'Turnkey Setups', path: '/turnkey', icon: Sparkles },
    { name: 'Setup Wizard', path: '/wizard', icon: Wand2, highlight: true },
    { name: 'Kitchen Calculators', path: '/calculators', icon: Calculator },
    { name: 'Training Academy', path: '/training', icon: GraduationCap },
    { name: 'Blogs & Guides', path: '/blogs', icon: BookOpen },
    { name: 'About & 500+ Cafes', path: '/about', icon: ShieldCheck }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Top micro bar for B2B hotline & trust badge */}
      <div className="hidden lg:block bg-gradient-to-r from-slate-900 via-[#141C28] to-slate-900 border-b border-slate-800/50 py-1 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Flame className="w-3.5 h-3.5 text-brand-orange animate-bounce" />
              Trusted by 500+ Commercial Cafes, QSR Chains & 5-Star Hotels
            </span>
            <span className="text-slate-600">•</span>
            <span>Commercial Warranty & Factory AMC 24x7</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">
              Commercial Sales Desk: <strong className="text-white">+91 98800-CHEFM</strong>
            </span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition"
            >
              <LayoutDashboard className="w-3 h-3 text-brand-orange" /> CMS Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    active
                      ? 'text-white bg-slate-800/90 font-semibold shadow-inner'
                      : item.highlight
                      ? 'text-amber-300 hover:text-white hover:bg-amber-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${active ? 'text-brand-orange' : item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                  {item.name}
                  {item.highlight && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-brand-orange/20 text-brand-orange border border-brand-orange/40 animate-pulse">
                      Hot
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/wizard"
              className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-brand-orange via-amber-500 to-amber-600 hover:from-brand-orange-hover hover:to-amber-700 transition shadow-lg shadow-brand-orange/25 overflow-hidden"
            >
              <Wand2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span>Setup Wizard</span>
            </Link>

            <button
              onClick={() => onOpenQuoteModal()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition hover:border-slate-600"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-orange" />
              <span>Request Quote</span>
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenQuoteModal()}
              className="p-2 text-brand-orange bg-slate-800 rounded-lg border border-slate-700 text-xs font-bold"
            >
              RFQ
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-200 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F141C] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                isActive(item.path)
                  ? 'bg-brand-orange text-white font-bold'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/wizard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 text-white font-bold text-sm shadow-lg shadow-brand-orange/20"
            >
              <Wand2 className="w-4 h-4" /> Start Kitchen Setup Wizard
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-brand-orange" /> Open CMS Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
