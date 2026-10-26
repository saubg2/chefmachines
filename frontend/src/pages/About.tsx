import React from 'react';
import { Link } from 'react-router-dom';
import { ClientCredibility } from '../components/ClientCredibility';
import { BrandMarquee } from '../components/BrandMarquee';

interface AboutProps {
  onOpenQuoteModal: (equipment?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
            About ChefMachines
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Commercial Food Preparation Partner to 500+ Outlets
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
            ChefMachines is India's leading commercial kitchen equipment distributor, turnkey contractor, and barista manpower training partner.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3.5 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <h2 className="text-xl font-bold font-display text-slate-900">
                Commercial Reliability Across 4 Pillars
              </h2>
              <p>
                Commercial foodservice in India faces unique demands: intense 43°C summer temperatures, heavy frying volumes, variable water hardness, and line voltage spikes.
              </p>
              <p>
                ChefMachines was created to unify what used to require 10 different contractors:
              </p>
              <ul className="space-y-1.5 pt-1 text-xs text-slate-800">
                <li>• <strong>Equipment Distribution:</strong> Authorized supply of Pitco, Celfrost, La Marzocco, Electrolux, TurboChef, Middleby Marshall, and Marco.</li>
                <li>• <strong>Turnkey MEP Execution:</strong> 3D CAD kitchen layouts, 3-phase power balancing, and custom SS-304 fabrication.</li>
                <li>• <strong>Staff Academy:</strong> Certified training on machine calibration, espresso extraction, and combi oven programming.</li>
                <li>• <strong>Smart Care & AMC:</strong> Rapid &lt;4h metropolitan emergency technician response with stocked spare parts.</li>
              </ul>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-slate-900 font-display mb-1">500+</div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Outlets Powered</h3>
              <p className="text-slate-500 text-xs mb-4">
                Serving top QSR burger chains, luxury 5-star hotels, bakery franchises, and specialty cafes.
              </p>
              <div className="grid grid-cols-2 gap-2 text-left text-xs bg-white p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[10px]">Active Units</span>
                  <strong className="text-slate-900">15,000+</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Spare Parts Hubs</span>
                  <strong className="text-brand-orange">12 Cities</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Partners */}
        <div className="mb-12">
          <BrandMarquee />
        </div>

        {/* Client List */}
        <div className="mb-12">
          <ClientCredibility />
        </div>

        {/* CTA */}
        <div className="text-center bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            Speak With Our Commercial Kitchen Engineers
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-5">
            Get advice on equipment sizing, 3-phase power planning, and quotation options for your food brand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenQuoteModal("Commercial Kitchen Consultation")}
              className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Request Consultation
            </button>
            <a
              href="tel:9782690188"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Call Hotline: 9782690188
            </a>
            <Link
              to="/wizard"
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-200 transition"
            >
              Configure Setup Online
            </Link>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            <span>Direct Email: <a href="mailto:saubg2@gmail.com" className="font-semibold text-slate-800 hover:text-brand-orange">saubg2@gmail.com</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};
