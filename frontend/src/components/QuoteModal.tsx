import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone, Mail, Building, MapPin } from 'lucide-react';
import { api } from '../services/api';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEquipment?: string;
  defaultInquiryType?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultEquipment = '',
  defaultInquiryType = 'rfq'
}) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    city: '',
    business_name: '',
    business_type: 'Cafe / QSR Chain',
    message: defaultEquipment ? `Requesting official commercial quote & spec sheet for: ${defaultEquipment}` : '',
    estimated_budget: '₹2 Lakh - ₹10 Lakh'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.submitLead({
        ...formData,
        inquiry_type: defaultInquiryType,
        equipment_interest: defaultEquipment || formData.message
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('There was an issue submitting your request. Please call our hotline directly at +91 98765 43210.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#182232] to-[#0F141C] border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden text-slate-100">
        {/* Glow ambient background */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white mb-2">Request Received!</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
              Thank you, <strong className="text-white">{formData.full_name}</strong>. A ChefMachines commercial kitchen consultant has been assigned to your request and will call you with technical specs and discount pricing within 4 business hours.
            </p>
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-xs text-slate-400 text-left max-w-sm mx-auto mb-6">
              <p className="font-semibold text-slate-200 mb-1">Direct Technical Support Hotline:</p>
              <p className="flex items-center gap-2 text-brand-orange font-bold text-sm">
                <Phone className="w-4 h-4" /> +91 (080) 4567-8900 / +91 98800-CHEFM
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-brand-orange/30"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold mb-2">
                Commercial RFQ & Consultation
              </div>
              <h3 className="text-2xl font-black font-display tracking-tight text-white">
                Request an Official Quotation
              </h3>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Direct B2B commercial pricing, factory warranty, MEP planning schematics, and shipping timeline.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (WhatsApp) *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@mycafe.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City / Region *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai, Bangalore, Delhi NCR"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Restaurant / Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Crust & Burger Co."
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Business Concept</label>
                  <select
                    value={formData.business_type}
                    onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  >
                    <option value="Burger Joint / Fast Casual">Burger Joint / Fast Casual</option>
                    <option value="Specialty Cafe & Roastery">Specialty Cafe & Roastery</option>
                    <option value="Pizzeria & Italian">Pizzeria & Italian</option>
                    <option value="High-Volume Cloud Kitchen">High-Volume Cloud Kitchen</option>
                    <option value="Hotel / Resort Fine Dining">Hotel / Resort Fine Dining</option>
                    <option value="Bar & Cocktail Lounge">Bar & Cocktail Lounge</option>
                    <option value="Bakery & Patisserie">Bakery & Patisserie</option>
                    <option value="Other">Other Food Preparation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Equipment List or Project Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify equipment models, daily order targets, or turnkey installation needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  ⚡ 500+ commercial setups completed • Direct factory rates
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-brand-orange/30 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Get Quotation
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
