import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
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
      alert('There was an issue submitting your request. Please call our hotline directly at 9782690188 or email saubg2@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 text-slate-800">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold font-display text-slate-900 mb-1">Request Received</h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto mb-5">
              Thank you, <strong className="text-slate-900">{formData.full_name}</strong>. A commercial consultant will call you with technical specs and quotation within 4 business hours.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 text-center max-w-xs mx-auto mb-5 space-y-1">
              <div>Direct Phone: <a href="tel:9782690188" className="font-bold text-slate-900 hover:text-[#FF5722]">9782690188</a></div>
              <div>Email: <a href="mailto:saubg2@gmail.com" className="font-medium text-slate-700 hover:text-[#FF5722]">saubg2@gmail.com</a></div>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-5 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl text-xs transition"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-[11px] font-bold text-brand-orange uppercase tracking-wider block mb-1">
                Commercial RFQ & Consultation
              </span>
              <h3 className="text-xl font-bold font-display text-slate-900">
                Request Equipment Quotation
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Direct B2B commercial rates, factory warranty, and delivery schedule.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@brand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City / Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaipur, Bangalore, Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Restaurant / Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Cafe Nola"
                    value={formData.business_name}
                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Concept</label>
                  <select
                    value={formData.business_type}
                    onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
                  >
                    <option value="Burger Joint / QSR">Burger Joint / QSR</option>
                    <option value="Specialty Cafe">Specialty Cafe & Roastery</option>
                    <option value="Pizzeria">Pizzeria & Italian</option>
                    <option value="Bakery">Bakery & Patisserie</option>
                    <option value="Cloud Kitchen">Cloud Kitchen</option>
                    <option value="Hotel / Banquet">Hotel / Banquet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Equipment Requirements</label>
                <textarea
                  rows={2}
                  placeholder="Specify models, daily order capacity, or turnkey requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-brand-orange focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  500+ commercial setups completed
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl text-xs shadow-sm transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Get Official Quotation'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
