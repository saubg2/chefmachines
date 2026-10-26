import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building,
  Award,
  CheckCircle2,
  Users,
  Clock,
  Wand2,
  PhoneCall,
  Flame
} from 'lucide-react';

import { ClientCredibility } from '../components/ClientCredibility';
import { BrandMarquee } from '../components/BrandMarquee';

interface AboutProps {
  onOpenQuoteModal: (equipment?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" /> About ChefMachines
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
            Over 500+ Commercial Kitchens & Cafes Powered Nationwide
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            ChefMachines is the complete commercial food preparation and services infrastructure partner for India’s fastest-growing restaurant chains, boutique cafes, cloud kitchen commissaries, and luxury hotel groups.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-[#151F2E] border border-slate-700/80 rounded-3xl p-8 sm:p-12 shadow-2xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm leading-relaxed">
              <h2 className="text-2xl font-bold font-display text-white">
                From Single Ovens to Mega-Chain Infrastructure
              </h2>
              <p>
                Commercial foodservice is brutal on equipment. High ambient temperatures exceeding 40°C, fluctuating line voltages, hard water scaling, and untrained staff can turn a million-rupee kitchen investment into constant downtime.
              </p>
              <p>
                ChefMachines was founded by veteran commercial kitchen engineers and master baristas to solve this exact bottleneck. We unified the four fragmented stages of commercial food operations:
              </p>
              <ul className="space-y-2 pt-2 text-xs text-white">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                  <strong>Equipment Distribution:</strong> Direct factory partnerships with Middleby Celfrost and tier-1 manufacturers.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                  <strong>Turnkey MEP Execution:</strong> 3D CAD layouts, gas manifolding, 3-phase balancing, and custom SS-304 fabrication.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                  <strong>Staff Certification Academy:</strong> On-site barista & kitchen line training so manpower operates equipment correctly.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                  <strong>Smart AMC & 24/7 Care:</strong> Guaranteed 4-hour metro service SLA with stocked spare parts.
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
              <div className="text-5xl font-black text-amber-400 font-display mb-2">500+</div>
              <h3 className="text-lg font-bold text-white mb-1">Commercial Outlets Delivered</h3>
              <p className="text-slate-400 text-xs mb-6">
                Supplying to premier QSR franchises, specialty cafes, craft breweries, and luxury hospitality groups.
              </p>
              <div className="grid grid-cols-2 gap-3 text-left text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px]">Active AMC Units</span>
                  <strong className="text-white">15,000+</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Service Centers</span>
                  <strong className="text-emerald-400">12 Hubs</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Partners Marquee */}
        <div className="my-12">
          <BrandMarquee />
        </div>

        {/* Real Client Credibility Wall */}
        <div className="my-12">
          <ClientCredibility />
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-brand-orange to-amber-600 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <h2 className="text-3xl font-black font-display text-white">
            Partner With India’s Commercial Kitchen Leaders
          </h2>
          <p className="text-amber-100 text-sm mt-2 max-w-xl mx-auto">
            Speak directly with our senior MEP design consultants and explore equipment quotes.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuoteModal("Commercial Kitchen Consultation")}
              className="px-8 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-xl"
            >
              Request Commercial Consultation
            </button>
            <Link
              to="/wizard"
              className="px-8 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/30 transition"
            >
              Configure Setup Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
