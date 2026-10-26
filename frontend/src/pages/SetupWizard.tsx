import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { api, WizardPreset } from '../services/api';

export const SetupWizard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialConcept = searchParams.get('concept') || 'burger_joint';

  const [presets, setPresets] = useState<WizardPreset[]>([]);
  const [loading, setLoading] = useState(true);

  // Wizard Flow States
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedConcept, setSelectedConcept] = useState<string>(initialConcept);
  const [selectedScale, setSelectedScale] = useState<string>('medium');
  const [customItems, setCustomItems] = useState<any[]>([]);

  // Calculation Results
  const [calculations, setCalculations] = useState<any>(null);

  // Final Form Submission
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    city: '',
    business_name: '',
    notes: ''
  });
  const [quoteReference, setQuoteReference] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.getWizardPresets()
      .then((data) => {
        setPresets(data);
        const match = data.find((p) => p.concept_key === selectedConcept) || data[0];
        if (match) {
          const items = match.equipment_presets[selectedScale] || [];
          setCustomItems(items);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const activePreset = presets.find((p) => p.concept_key === selectedConcept);

  const handleConceptChange = (conceptKey: string) => {
    setSelectedConcept(conceptKey);
    const p = presets.find((item) => item.concept_key === conceptKey);
    if (p) {
      setCustomItems(p.equipment_presets[selectedScale] || []);
    }
  };

  const handleScaleChange = (scale: string) => {
    setSelectedScale(scale);
    if (activePreset) {
      setCustomItems(activePreset.equipment_presets[scale] || []);
    }
  };

  const toggleEquipmentItem = (index: number) => {
    const updated = [...customItems];
    updated[index].selected = updated[index].selected !== false ? false : true;
    setCustomItems(updated);
  };

  const updateQuantity = (index: number, delta: number) => {
    const updated = [...customItems];
    const newQty = Math.max(1, (updated[index].qty || 1) + delta);
    updated[index].qty = newQty;
    setCustomItems(updated);
  };

  useEffect(() => {
    if (activePreset && customItems.length > 0) {
      const activeItems = customItems.filter((i) => i.selected !== false);
      const totalBudget = activeItems.reduce((acc, i) => acc + (i.est_cost || 0) * (i.qty || 1), 0);
      const totalKw = Math.round(activeItems.reduce((acc, i) => acc + (i.kw || 0) * (i.qty || 1), 0) * 10) / 10;
      const utility = ((activePreset.utility_estimates || {}) as any)[selectedScale] || {};

      setCalculations({
        total_estimated_budget_inr: totalBudget,
        total_electrical_kw: totalKw,
        power_phase_recommendation: totalKw > 10 ? '3-Phase 415V (50Hz Required)' : 'Single-Phase 230V / 3-Phase Optional',
        exhaust_hood_cfm: utility.exhaust_cfm || Math.round(totalKw * 130),
        recommended_kitchen_sqft: utility.recommended_sqft || '450 - 800 sq ft',
        plumbing_points: utility.plumbing_inlets || 4,
        drainage_points: utility.drain_points || 3
      });
    }
  }, [customItems, selectedScale, activePreset]);

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const activeItems = customItems.filter((i) => i.selected !== false);
      const res = await api.submitWizard({
        concept_key: selectedConcept,
        scale: selectedScale,
        selected_equipment: activeItems,
        calculations,
        ...formData
      });
      if (res.quote_reference) {
        setQuoteReference(res.quote_reference);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit quote. Please check your network or call our sales line directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600 text-xs">
        Loading Commercial Setup Wizard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
            Commercial Kitchen Configurator
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Kitchen Set-up Wizard
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Configure your commercial food concept step-by-step. Generates equipment list, utility electrical load (kW), and instant quotation.
          </p>
        </div>

        {/* Step Tabs */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs mb-8 max-w-2xl mx-auto">
          {[
            { num: 1, name: '1. Concept' },
            { num: 2, name: '2. Scale' },
            { num: 3, name: '3. Equipment' },
            { num: 4, name: '4. Quotation' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`py-2 px-1 rounded-xl border text-xs font-semibold transition ${
                currentStep === s.num
                  ? 'bg-brand-orange border-brand-orange text-white font-bold shadow-sm'
                  : currentStep > s.num
                  ? 'bg-white border-slate-300 text-emerald-700'
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* STEP 1: CONCEPT */}
        {currentStep === 1 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Select Food Business Concept</h2>
              <p className="text-slate-500 text-xs mt-0.5">Pre-configured blueprints based on 500+ commercial installations.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  key: 'burger_joint',
                  title: 'Burger Joint & QSR',
                  desc: 'Toastmaster vertical bun toasters, Pitco 35C+ gas fryers, chrome griddles, and Hoshizaki prep counters.',
                  tag: 'Most Popular'
                },
                {
                  key: 'artisanal_cafe',
                  title: 'Specialty Cafe & Roastery',
                  desc: 'La Marzocco Linea Classic / La Cimbali M26, Fiorenzato grinders, Marco water fonts, and Electrolux glasswashers.',
                  tag: 'Specialty Beverage'
                },
                {
                  key: 'artisan_pizzeria',
                  title: 'Artisan Pizzeria',
                  desc: 'Middleby Marshall PS540 conveyor ovens, Sinmag spiral mixers, and Celfrost granite prep rails.',
                  tag: 'Pizza & Baking'
                },
                {
                  key: 'cloud_kitchen',
                  title: 'Multi-Brand Cloud Kitchen',
                  desc: 'TurboChef rapid ovens, Pitco multi-vat fryers, Celfrost walk-in cold rooms, and Electrolux warewashers.',
                  tag: 'High Volume Delivery'
                }
              ].map((c) => {
                const isSelected = selectedConcept === c.key;
                return (
                  <div
                    key={c.key}
                    onClick={() => handleConceptChange(c.key)}
                    className={`cursor-pointer rounded-2xl p-5 border transition flex flex-col justify-between ${
                      isSelected
                        ? 'bg-orange-50/50 border-brand-orange shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        {c.tag}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mb-1">{c.title}</h3>
                      <p className="text-slate-600 text-xs leading-relaxed">{c.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                      <span className={isSelected ? 'text-brand-orange font-bold' : 'text-slate-500'}>
                        {isSelected ? '✓ Selected' : 'Choose'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs uppercase tracking-wider transition"
              >
                Proceed to Scale & Capacity →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SCALE */}
        {currentStep === 2 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Select Scale & Kitchen Capacity</h2>
              <p className="text-slate-500 text-xs mt-0.5">Determines throughput volume and electrical sanction loads.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                {
                  tier: 'small',
                  name: 'Boutique / Kiosk / Pilot Outlet',
                  orders: '50 - 150 Orders / Day',
                  sqft: '200 - 450 sq ft',
                  desc: 'Compact footprint, essential commercial equipment, rapid startup.'
                },
                {
                  tier: 'medium',
                  name: 'Standard High-Volume Outlet',
                  orders: '200 - 500 Orders / Day',
                  sqft: '450 - 850 sq ft',
                  desc: 'The industry benchmark for QSR burger outlets and high-traffic cafes.'
                },
                {
                  tier: 'large',
                  name: 'Flagship / Commissary / Mega Scale',
                  orders: '500 - 1,500+ Orders / Day',
                  sqft: '850 - 2,500 sq ft',
                  desc: 'Dual lines, 3-phase high-output machines, walk-in cold rooms.'
                }
              ].map((s) => {
                const isSelected = selectedScale === s.tier;
                return (
                  <div
                    key={s.tier}
                    onClick={() => handleScaleChange(s.tier)}
                    className={`cursor-pointer rounded-2xl p-5 border transition flex flex-col justify-between ${
                      isSelected
                        ? 'bg-orange-50/50 border-brand-orange shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">{s.name}</h3>
                      <div className="text-xs text-slate-600 space-y-0.5 my-2">
                        <p>Orders: <strong className="text-slate-900">{s.orders}</strong></p>
                        <p>Space: <strong className="text-slate-900">{s.sqft}</strong></p>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                      <span className={isSelected ? 'text-brand-orange font-bold' : 'text-slate-500'}>
                        {isSelected ? '✓ Selected' : 'Select'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs uppercase tracking-wider transition"
              >
                View Equipment Checklist →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: EQUIPMENT LIST */}
        {currentStep === 3 && (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-semibold text-brand-orange">
                {selectedConcept.replace('_', ' ').toUpperCase()} • {selectedScale.toUpperCase()} SCALE
              </span>
              <h2 className="text-xl font-bold text-slate-900">Commercial Equipment Checklist</h2>
              <p className="text-slate-500 text-xs mt-0.5">Toggle items or adjust quantities. Connected load updates automatically.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-3xl mx-auto space-y-3">
              {customItems.map((item, idx) => {
                const isChecked = item.selected !== false;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border transition ${
                      isChecked ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-50/20 border-slate-100 opacity-40'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleEquipmentItem(idx)}
                        className="mt-0.5 w-4 h-4 accent-brand-orange cursor-pointer rounded"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</h4>
                          {item.must_have && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-orange-100 text-brand-orange">
                              Essential
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {item.category} • Connected Load: <strong>{item.kw} kW</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-200">
                      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded p-0.5 text-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(idx, -1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold w-5 text-center text-slate-900">{item.qty || 1}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(idx, 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900">
                          ₹{((item.est_cost || 0) * (item.qty || 1)).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {calculations && (
                <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Total Items</span>
                    <strong className="text-slate-900 text-sm">
                      {customItems.filter((i) => i.selected !== false).length} machines
                    </strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Total Power</span>
                    <strong className="text-amber-600 text-sm">{calculations.total_electrical_kw} kW</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Exhaust Airflow</span>
                    <strong className="text-slate-900 text-sm">{calculations.exhaust_hood_cfm} CFM</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Est. Equipment Budget</span>
                    <strong className="text-brand-orange text-sm">
                      ₹{calculations.total_estimated_budget_inr.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs uppercase tracking-wider transition"
              >
                Get Official Quotation & BOQ →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: QUOTATION & SUBMISSION */}
        {currentStep === 4 && (
          <div className="max-w-3xl mx-auto">
            {quoteReference ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                  Quote Ref: {quoteReference}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Kitchen Blueprint Generated</h2>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-6">
                  Thank you, <strong className="text-slate-900">{formData.full_name}</strong>. A ChefMachines project lead will call you within 4 hours with your itemized BOQ discount pricing and MEP drawings.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left max-w-sm mx-auto mb-6 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Connected Electrical Load:</span>
                    <strong className="text-slate-900">{calculations.total_electrical_kw} kW</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Exhaust Airflow:</span>
                    <strong className="text-slate-900">{calculations.exhaust_hood_cfm} CFM</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 font-bold">
                    <span>Estimated Total:</span>
                    <span className="text-brand-orange">₹{calculations.total_estimated_budget_inr.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs"
                  >
                    Print Spec Sheet
                  </button>
                  <Link
                    to="/"
                    className="px-5 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  Generate Official BOQ & MEP Specifications
                </h3>
                <p className="text-slate-500 text-xs mb-6">
                  Enter your details to generate your commercial quotation with factory warranty discounts.
                </p>

                <form onSubmit={handleSubmitQuote} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Mehta"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">WhatsApp Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Business Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@brand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">City / Region *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jaipur, Delhi NCR, Bangalore"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Brand Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Burger Farm / Cafe Nola"
                        value={formData.business_name}
                        onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-slate-500 hover:text-slate-800 font-semibold"
                    >
                      ← Modify Items
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl text-xs uppercase tracking-wider transition disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit & Receive Official Quote'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
