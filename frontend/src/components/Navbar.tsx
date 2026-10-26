import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenQuoteModal: (equipment?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Equipment Catalog', path: '/products' },
    { name: 'Turnkey Setups', path: '/turnkey' },
    { name: 'Setup Wizard', path: '/wizard', highlight: true },
    { name: 'Calculators', path: '/calculators' },
    { name: 'Training Academy', path: '/training' },
    { name: 'Knowledge Hub', path: '/blogs' },
    { name: 'About & Clients', path: '/about' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top micro bar for B2B hotline & trust badge */}
      <div className="hidden lg:block bg-slate-50 border-b border-slate-200/80 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-600">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-800">
              Commercial Supplier to 500+ Cafes, QSR Chains & 5-Star Hotels
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">Authorized Distributor: Pitco, Celfrost, La Marzocco, Electrolux & more</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-700">
              Sales Desk: <strong className="text-slate-900">+91 98800-CHEFM</strong>
            </span>
            <Link
              to="/admin"
              className="text-slate-600 hover:text-brand-orange font-medium transition text-[11px]"
            >
              CMS Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'text-brand-orange bg-orange-50 font-bold'
                      : item.highlight
                      ? 'text-brand-orange hover:bg-orange-50 font-semibold'
                      : 'text-slate-700 hover:text-brand-orange hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                  {item.highlight && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-brand-orange">
                      Wizard
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition shadow-sm"
            >
              <span>Setup Wizard</span>
            </Link>

            <button
              onClick={() => onOpenQuoteModal()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition"
            >
              <span>Request Quote</span>
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-3 py-1.5 text-brand-orange bg-orange-50 border border-orange-200 rounded-lg text-xs font-bold"
            >
              RFQ
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-1.5">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                isActive(item.path)
                  ? 'bg-orange-50 text-brand-orange font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <Link
              to="/wizard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-brand-orange text-white font-bold text-xs"
            >
              Start Kitchen Setup Wizard
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200"
            >
              Open CMS Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
