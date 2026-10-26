import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
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
    { name: 'Setup Wizard', path: '/wizard' },
    { name: 'Calculators', path: '/calculators' },
    { name: 'Training Academy', path: '/training' },
    { name: 'About & Clients', path: '/about' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* Top micro bar for direct contact & trust metrics */}
      <div className="bg-slate-900 text-slate-300 py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white font-semibold">
              Commercial Supplier to 500+ Cafes, QSR Chains & 5-Star Hotels
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400">
              Authorized: Pitco, Celfrost, La Marzocco, Electrolux, TurboChef
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="tel:9782690188"
              className="inline-flex items-center gap-1.5 text-white hover:text-orange-400 transition"
            >
              <Phone className="w-3 h-3 text-orange-400" />
              <span>9782690188</span>
            </a>
            <a
              href="mailto:saubg2@gmail.com"
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition"
            >
              <Mail className="w-3 h-3 text-orange-400" />
              <span>saubg2@gmail.com</span>
            </a>
            <Link
              to="/admin"
              className="text-slate-400 hover:text-white transition text-[11px]"
            >
              CMS
            </Link>
          </div>
        </div>
      </div>

      {/* Main clean navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Nav Items - Clean & Spacious */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'text-[#FF5722] bg-orange-50 font-bold'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#FF5722] hover:bg-[#e64a19] transition shadow-sm"
            >
              Request Quote
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-3 py-1.5 rounded-md text-xs font-bold text-white bg-[#FF5722]"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                  active
                    ? 'text-[#FF5722] bg-orange-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-200 mt-2 space-y-2">
            <a
              href="tel:9782690188"
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-800 bg-slate-50 rounded-lg"
            >
              <Phone className="w-4 h-4 text-[#FF5722]" />
              Call Hotline: 9782690188
            </a>
            <a
              href="mailto:saubg2@gmail.com"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg"
            >
              <Mail className="w-4 h-4 text-[#FF5722]" />
              saubg2@gmail.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
