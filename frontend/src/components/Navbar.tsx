import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenQuoteModal: (equipment?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Equipment', path: '/products' },
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
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Desktop Nav Items - Clean, Uncluttered, Spaced */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-semibold transition-colors ${
                    active
                      ? 'text-[#FF5722] border-b-2 border-[#FF5722] pb-0.5'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Direct Phone Hotline & Quick Quote */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:9782690188"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:text-[#FF5722] transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>9782690188</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal()}
              className="px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-white bg-[#FF5722] hover:bg-[#e64a19] transition shadow-none hover:shadow"
            >
              Request Quote
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="tel:9782690188"
              className="p-2 text-slate-800 hover:text-[#FF5722]"
              aria-label="Call Hotline"
            >
              <Phone className="w-4 h-4 text-[#FF5722]" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  active
                    ? 'text-[#FF5722] bg-orange-50 font-bold'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-200 mt-2 flex flex-col gap-2">
            <a
              href="tel:9782690188"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-slate-100 text-slate-900 font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-[#FF5722]" />
              Direct Call: 9782690188
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-2.5 rounded-md bg-[#FF5722] text-white font-bold text-xs uppercase tracking-wider"
            >
              Request Equipment Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
