import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Wand2,
  CheckCircle2,
  Layers,
  Flame,
  Coffee,
  UtensilsCrossed,
  Wine,
  Zap,
  Gauge,
  Wind,
  SquareDashedBottom,
  Download,
  Share2,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  AlertCircle,
  Building,
  Phone,
  Mail,
  User,
  MapPin,
  Sparkles
} from 'lucide-react';
import { api, WizardPreset } from '../services/api';

export const SetupWizard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialConcept = searchParams.get('concept') || 'burger_joint';

  const [presets, setPresets] = useState<WizardPreset[]>([]);
  const [loading, setLoading] = useState(true);

  // Wizard Flow States
  const [currentStep, setCurrentStep] = useState(1); // 1: Concept, 2: Scale, 3: Equipment, 4: Engineering & Quote
  const [selectedConcept, setSelectedConcept] = useState<string>(initialConcept);
  const [selectedScale, setSelectedScale] = useState<string>('medium'); // small, medium, large
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

  // When concept or scale changes, refresh equipment list
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

  // Run calculation when moving to step 4
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
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-semibold text-sm">Loading Commercial Kitchen Wizard Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Wizard Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Wand2 className="w-4 h-4" /> 500+ Cafe Architecture Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
            Commercial Kitchen Set-up Wizard
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Configure your dream food concept step-by-step. Get an automated equipment list, MEP utility load calculation, and instant commercial quotation.
          </p>
        </div>

        {/* Wizard Step Progress Indicator */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { num: 1, name: 'Concept Type' },
              { num: 2, name: 'Scale & Output' },
              { num: 3, name: 'Equipment List' },
              { num: 4, name: 'Engineering & Quote' }
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                  currentStep === s.num
                    ? 'bg-brand-orange border-brand-orange text-white font-bold shadow-lg shadow-brand-orange/25'
                    : currentStep > s.num
                    ? 'bg-slate-900 border-slate-700 text-emerald-400 font-semibold'
                    : 'bg-slate-900/50 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-1">
                  {currentStep > s.num ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span>Step {s.num}</span>
                  )}
                </div>
                <span className="truncate">{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= STEP 1: CONCEPT SELECTION ================= */}
        {currentStep === 1 && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-display text-white">Select Your Food Business Concept</h2>
              <p className="text-slate-400 text-sm mt-1">
                Each concept loads custom equipment blueprints honed over 500+ live installations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  key: 'burger_joint',
                  title: 'Burger Joint & QSR',
                  desc: 'High-speed bun warmers, twin filtered fryers, chrome griddles, sauce pumps, and prep counters.',
                  icon: Flame,
                  tag: 'Most Popular'
                },
                {
                  key: 'artisanal_cafe',
                  title: 'Specialty Cafe & Roastery',
                  desc: 'Multi-boiler espresso machines, on-demand grinders, gourmet ice makers, and pitcher rinsers.',
                  icon: Coffee,
                  tag: 'Specialty Beverage'
                },
                {
                  key: 'artisan_pizzeria',
                  title: 'Artisan Pizzeria',
                  desc: 'Conveyor/deck pizza ovens, 40kg spiral dough kneaders, granite prep tables, and blast chillers.',
                  icon: UtensilsCrossed,
                  tag: 'Baking & Pizza'
                },
                {
                  key: 'cloud_kitchen',
                  title: 'Multi-Brand Cloud Kitchen',
                  desc: 'Combi steam ovens, walk-in cold rooms, multi-burner lines, and heavy-duty hood sanitizers.',
                  icon: Layers,
                  tag: 'High-Volume Delivery'
                }
              ].map((c) => {
                const isSelected = selectedConcept === c.key;
                return (
                  <div
                    key={c.key}
                    onClick={() => handleConceptChange(c.key)}
                    className={`cursor-pointer rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#1E2C3F] to-[#141C2A] border-brand-orange shadow-2xl shadow-brand-orange/20 scale-[1.02]'
                        : 'bg-[#151D2A] border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          isSelected ? 'bg-brand-orange text-white' : 'bg-slate-800 text-slate-300'
                        }`}>
                          <c.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          isSelected ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {c.tag}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-display text-white mb-2">{c.title}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed">{c.desc}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300">
                        {isSelected ? '✓ Selected' : 'Choose Concept'}
                      </span>
                      <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-brand-orange' : 'text-slate-500'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-brand-orange/25 transition"
              >
                <span>Continue to Step 2: Scale & Output</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: SCALE & OUTPUT ================= */}
        {currentStep === 2 && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-display text-white">Select Scale & Kitchen Capacity</h2>
              <p className="text-slate-400 text-sm mt-1">
                Choose your projected daily volume. This auto-sizes equipment throughput and power sanctions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  tier: 'small',
                  name: 'Boutique / Kiosk / Pilot Outlet',
                  orders: '50 - 150 Orders / Day',
                  sqft: '200 - 450 sq ft',
                  desc: 'Compact footprint, essential commercial items, rapid startup capital, single-phase compatible where possible.',
                  badge: 'Entry / Quick Setup'
                },
                {
                  tier: 'medium',
                  name: 'Standard High-Volume Outlet',
                  orders: '200 - 500 Orders / Day',
                  sqft: '450 - 850 sq ft',
                  desc: 'The gold standard format for high-turnover QSR and cafes. Automated oil filtration, dual bun toasters, chilled rails.',
                  badge: 'Most Popular (80% of Clients)'
                },
                {
                  tier: 'large',
                  name: 'Flagship / Commissary / Mega Scale',
                  orders: '500 - 1,500+ Orders / Day',
                  sqft: '850 - 2,500 sq ft',
                  desc: 'Maximum throughput. Twin 3-phase fryers, walk-in cold rooms, multi-deck ovens, automated conveyor systems.',
                  badge: 'Enterprise / Chains'
                }
              ].map((s) => {
                const isSelected = selectedScale === s.tier;
                return (
                  <div
                    key={s.tier}
                    onClick={() => handleScaleChange(s.tier)}
                    className={`cursor-pointer rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#1E2C3F] to-[#141C2A] border-amber-400 shadow-2xl shadow-amber-400/20 scale-[1.02]'
                        : 'bg-[#151D2A] border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border inline-block mb-3 ${
                        isSelected ? 'bg-amber-400/20 text-amber-300 border-amber-400/50' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {s.badge}
                      </span>
                      <h3 className="text-xl font-bold font-display text-white mb-2">{s.name}</h3>
                      <div className="space-y-1.5 my-3 text-xs">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-400">Target Orders:</span>
                          <strong className="text-white">{s.orders}</strong>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-400">Kitchen Footprint:</span>
                          <strong className="text-amber-400">{s.sqft}</strong>
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300">
                        {isSelected ? '✓ Selected Scale' : 'Select'}
                      </span>
                      <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Concepts
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-brand-orange/25 transition"
              >
                <span>Continue to Step 3: Equipment Checklist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: EQUIPMENT CHECKLIST ================= */}
        {currentStep === 3 && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
                Concept: {selectedConcept.replace('_', ' ').toUpperCase()} • Scale: {selectedScale.toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold font-display text-white">Recommended Equipment Checklist</h2>
              <p className="text-slate-400 text-sm mt-1">
                Toggle items on/off or adjust quantities. Your electrical power (kW) and budget update automatically.
              </p>
            </div>

            <div className="bg-[#151F2E] border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
              <div className="space-y-3">
                {customItems.map((item, idx) => {
                  const isChecked = item.selected !== false;
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition ${
                        isChecked
                          ? 'bg-[#111823] border-slate-700'
                          : 'bg-slate-900/40 border-slate-800/60 opacity-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleEquipmentItem(idx)}
                          className="mt-1 w-5 h-5 accent-brand-orange cursor-pointer rounded"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{item.name}</h4>
                            {item.must_have && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-orange/20 text-brand-orange border border-brand-orange/40">
                                Essential
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                            <span>Category: <strong className="text-slate-300">{item.category}</strong></span>
                            <span>•</span>
                            <span>Connected Load: <strong className="text-amber-400">{item.kw} kW</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Est Price */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-slate-800">
                        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg p-1 text-xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(idx, -1)}
                            className="w-6 h-6 flex items-center justify-center text-slate-300 hover:bg-slate-700 rounded"
                          >
                            -
                          </button>
                          <span className="font-mono font-bold w-6 text-center text-white">{item.qty || 1}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(idx, 1)}
                            className="w-6 h-6 flex items-center justify-center text-slate-300 hover:bg-slate-700 rounded"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-[11px] text-slate-400 block">Est. Cost</span>
                          <strong className="text-sm font-bold text-emerald-400">
                            ₹{((item.est_cost || 0) * (item.qty || 1)).toLocaleString('en-IN')}
                          </strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Running total ticker */}
              {calculations && (
                <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                    <span className="text-[11px] text-slate-400 block">Active Items</span>
                    <strong className="text-base font-bold text-white">
                      {customItems.filter((i) => i.selected !== false).length} machines
                    </strong>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                    <span className="text-[11px] text-slate-400 block">Total Power Load</span>
                    <strong className="text-base font-bold text-amber-400">
                      {calculations.total_electrical_kw} kW
                    </strong>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                    <span className="text-[11px] text-slate-400 block">Exhaust Airflow</span>
                    <strong className="text-base font-bold text-cyan-400">
                      {calculations.exhaust_hood_cfm} CFM
                    </strong>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                    <span className="text-[11px] text-slate-400 block">Est. Total Investment</span>
                    <strong className="text-base font-bold text-emerald-400">
                      ₹{calculations.total_estimated_budget_inr.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Scale
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-brand-orange/25 transition"
              >
                <span>Continue to Step 4: Engineering & Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: ENGINEERING SUMMARY & QUOTATION ================= */}
        {currentStep === 4 && (
          <div className="animate-in fade-in duration-300 max-w-4xl mx-auto">
            {quoteReference ? (
              <div className="bg-[#151F2E] border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/40">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-mono font-bold mb-3 border border-emerald-500/30">
                  Quote Ref: {quoteReference}
                </div>
                <h2 className="text-3xl font-black font-display text-white mb-2">
                  Kitchen Setup Plan Submitted!
                </h2>
                <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
                  Thank you, <strong className="text-white">{formData.full_name}</strong>. Your custom commercial blueprint has been dispatched to our engineering desk. A ChefMachines project lead will call you within 4 hours to confirm MEP drawings and tiered quotation discounts.
                </p>

                {/* Summary Box */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left max-w-md mx-auto mb-8 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Concept:</span>
                    <strong className="text-white">{selectedConcept.replace('_', ' ').toUpperCase()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Sanction Power:</span>
                    <strong className="text-amber-400">{calculations.total_electrical_kw} kW ({calculations.power_phase_recommendation})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Exhaust CFM:</span>
                    <strong className="text-cyan-400">{calculations.exhaust_hood_cfm} CFM</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Recommended Footprint:</span>
                    <strong className="text-white">{calculations.recommended_kitchen_sqft}</strong>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800 text-sm">
                    <span className="text-slate-300 font-bold">Estimated Equipment Investment:</span>
                    <strong className="text-emerald-400">₹{calculations.total_estimated_budget_inr.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition inline-flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Print / Save Specification Summary
                  </button>
                  <Link
                    to="/"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs transition shadow-lg shadow-brand-orange/30"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Engineering Breakdown */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-[#151F2E] border border-slate-700/80 rounded-3xl p-6 shadow-xl">
                    <h3 className="text-lg font-bold font-display text-white mb-4 flex items-center gap-2">
                      <Gauge className="w-5 h-5 text-brand-orange" />
                      MEP Utility Schematics
                    </h3>
                    <div className="space-y-3.5 text-xs">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block mb-0.5">Electrical Connected Load</span>
                        <div className="text-xl font-bold text-amber-400">{calculations.total_electrical_kw} kW</div>
                        <span className="text-[11px] text-slate-300 font-semibold mt-1 block">
                          ⚡ {calculations.power_phase_recommendation}
                        </span>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block mb-0.5">Kitchen Exhaust Hood CFM</span>
                        <div className="text-xl font-bold text-cyan-400">{calculations.exhaust_hood_cfm} CFM</div>
                        <span className="text-[11px] text-slate-400 mt-1 block">
                          Capture velocity for high-heat fryers & griddles
                        </span>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block mb-0.5">Plumbing & Drains</span>
                        <div className="text-sm font-bold text-white">
                          {calculations.plumbing_points} Water Inlets • {calculations.drainage_points} Grease Trap Drains
                        </div>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block mb-0.5">Recommended Space</span>
                        <div className="text-sm font-bold text-white">{calculations.recommended_kitchen_sqft}</div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800">
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Estimated Budget</span>
                      <div className="text-2xl font-black text-emerald-400">
                        ₹{calculations.total_estimated_budget_inr.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] text-slate-400">Factory direct B2B commercial rates</span>
                    </div>
                  </div>
                </div>

                {/* Right: Lead Capture Form */}
                <div className="lg:col-span-7">
                  <div className="bg-[#151F2E] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
                    <h3 className="text-2xl font-bold font-display text-white mb-2">
                      Generate Official Quotation
                    </h3>
                    <p className="text-slate-400 text-xs mb-6">
                      Enter your details to generate your official equipment bill of quantities (BOQ) with MEP technical drawings.
                    </p>

                    <form onSubmit={handleSubmitQuote} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikram Mehta"
                          value={formData.full_name}
                          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Phone Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Business Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="vikram@brand.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">City / Location *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Hyderabad, Bangalore, Pune"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Outlet / Brand Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Smash & Bun Co."
                            value={formData.business_name}
                            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Additional Notes or Layout Needs</label>
                        <textarea
                          rows={2}
                          placeholder="e.g. Looking for MEP layout drawings or turnkey fabrication alongside machines..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-brand-orange"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" /> Modify Items
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-3 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold rounded-xl text-sm shadow-xl shadow-brand-orange/30 transition disabled:opacity-50"
                        >
                          {isSubmitting ? 'Generating Plan...' : 'Generate Commercial Quote & BOQ'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
