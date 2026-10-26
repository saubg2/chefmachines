import React, { useState } from 'react';
import {
  Calculator,
  Snowflake,
  Coffee,
  Wind,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

export const Calculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cold-room' | 'coffee' | 'exhaust' | 'fryer-roi'>('cold-room');

  // Cold Room State
  const [crLength, setCrLength] = useState(12);
  const [crWidth, setCrWidth] = useState(10);
  const [crHeight, setCrHeight] = useState(8.5);
  const [crTemp, setCrTemp] = useState('chiller');
  const [crTurnover, setCrTurnover] = useState(500);
  const [crResult, setCrResult] = useState<any>(null);
  const [crLoading, setCrLoading] = useState(false);

  // Coffee State
  const [coffeeDailyCups, setCoffeeDailyCups] = useState(350);
  const [coffeeRushPct, setCoffeeRushPct] = useState(40);
  const [coffeeResult, setCoffeeResult] = useState<any>(null);
  const [coffeeLoading, setCoffeeLoading] = useState(false);

  // Exhaust Hood State
  const [hoodLength, setHoodLength] = useState(10);
  const [hoodWidth, setHoodWidth] = useState(4);
  const [hoodType, setHoodType] = useState('wall_canopy');
  const [hoodDuty, setHoodDuty] = useState('heavy');
  const [hoodResult, setHoodResult] = useState<any>(null);
  const [hoodLoading, setHoodLoading] = useState(false);

  // Fryer ROI State
  const [fryerCount, setFryerCount] = useState(2);
  const [fryerOilLiters, setFryerOilLiters] = useState(28);
  const [oilCostPerLiter, setOilCostPerLiter] = useState(140);
  const [oilChangesMonth, setOilChangesMonth] = useState(8);
  const [fryerResult, setFryerResult] = useState<any>(null);
  const [fryerLoading, setFryerLoading] = useState(false);

  // Compute Cold Room
  const runColdRoomCalc = async () => {
    setCrLoading(true);
    try {
      const res = await api.calcColdRoom({
        length_ft: Number(crLength),
        width_ft: Number(crWidth),
        height_ft: Number(crHeight),
        target_temp: crTemp,
        turnover_kg_day: Number(crTurnover)
      });
      setCrResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setCrLoading(false);
    }
  };

  // Compute Coffee
  const runCoffeeCalc = async () => {
    setCoffeeLoading(true);
    try {
      const res = await api.calcCoffee({
        daily_cups: Number(coffeeDailyCups),
        rush_hours: 2,
        rush_percentage: Number(coffeeRushPct)
      });
      setCoffeeResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setCoffeeLoading(false);
    }
  };

  // Compute Exhaust Hood
  const runExhaustCalc = async () => {
    setHoodLoading(true);
    try {
      const res = await api.calcExhaust({
        hood_length_ft: Number(hoodLength),
        hood_width_ft: Number(hoodWidth),
        hood_type: hoodType,
        cooking_duty: hoodDuty
      });
      setHoodResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setHoodLoading(false);
    }
  };

  // Compute Fryer ROI
  const runFryerCalc = async () => {
    setFryerLoading(true);
    try {
      const res = await api.calcFryerRoi({
        fryer_count: Number(fryerCount),
        oil_capacity_per_fryer_liters: Number(fryerOilLiters),
        current_oil_cost_per_liter_inr: Number(oilCostPerLiter),
        current_oil_changes_per_month: Number(oilChangesMonth),
        filtration_adoption: true
      });
      setFryerResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setFryerLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-4 h-4" /> Commercial Engineering Suite
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
            Commercial Kitchen Calculators
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Calculate accurate sizing, electrical loads, and ROI for cold rooms, espresso bars, ventilation exhaust, and oil filtration systems.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'cold-room', name: 'Cold Room & Freezer Sizer', icon: Snowflake },
            { id: 'coffee', name: 'Coffee Peak Throughput', icon: Coffee },
            { id: 'exhaust', name: 'Exhaust Hood & CFM', icon: Wind },
            { id: 'fryer-roi', name: 'Fryer Oil Filtration ROI', icon: DollarSign }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition border ${
                activeTab === tab.id
                  ? 'bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* ================= CALCULATOR 1: COLD ROOM ================= */}
        {activeTab === 'cold-room' && (
          <div className="bg-[#151F2E] border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form inputs */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-1">
                    Walk-in Cold Room Sizing Engine
                  </h3>
                  <p className="text-xs text-slate-400">
                    Engineered for high-ambient Indian climates (up to 43°C exterior).
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Length (Feet)</label>
                    <input
                      type="number"
                      value={crLength}
                      onChange={(e) => setCrLength(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Width (Feet)</label>
                    <input
                      type="number"
                      value={crWidth}
                      onChange={(e) => setCrWidth(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Height (Feet)</label>
                    <input
                      type="number"
                      value={crHeight}
                      step="0.5"
                      onChange={(e) => setCrHeight(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Temperature Requirement</label>
                    <select
                      value={crTemp}
                      onChange={(e) => setCrTemp(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    >
                      <option value="chiller">Chiller (+2°C to +8°C)</option>
                      <option value="freezer">Deep Freezer (-18°C to -22°C)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Daily Turnover (Kg)</label>
                    <input
                      type="number"
                      value={crTurnover}
                      onChange={(e) => setCrTurnover(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={runColdRoomCalc}
                  disabled={crLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold rounded-xl text-sm shadow-xl shadow-brand-orange/20 transition"
                >
                  {crLoading ? 'Calculating...' : 'Calculate Cold Room & Unit Size'}
                </button>
              </div>

              {/* Output Display */}
              <div className="lg:col-span-6 bg-[#0B0F17] border border-slate-700/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
                {crResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-cyan-400">Calculated Specification</span>
                        <h4 className="text-lg font-bold text-white">Recommended Refrigeration Pack</h4>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
                        {crTemp.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Total Volume</span>
                        <strong className="text-base text-white">{crResult.volume_cuft} Cu Ft ({crResult.volume_cum} m³)</strong>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Compressor Rating</span>
                        <strong className="text-base text-cyan-400">{crResult.recommended_compressor_hp} HP Unit</strong>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Cooling Capacity</span>
                        <strong className="text-base text-amber-400">{crResult.cooling_capacity_btu_hr.toLocaleString()} BTU/hr</strong>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">PUF Panel Thickness</span>
                        <strong className="text-base text-emerald-400">{crResult.puf_insulation_panel_mm} mm High-Density</strong>
                      </div>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs space-y-1 text-slate-300">
                      <p>• <strong>Est. Daily Consumption:</strong> ~{crResult.est_daily_power_kwh} kWh/day</p>
                      <p>• <strong>Approx. Pallet Storage:</strong> ~{crResult.approx_pallet_capacity} standard pallets</p>
                      <p>• <strong>Refrigerant:</strong> {crResult.refrigerant_recommendation}</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <Snowflake className="w-12 h-12 text-slate-700 mb-3" />
                    <p className="text-sm font-semibold text-slate-400">Enter room dimensions and click Calculate</p>
                    <p className="text-xs text-slate-500 mt-1">Generates compressor HP, BTU load, and PUF panel thickness.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= CALCULATOR 2: COFFEE THROUGHPUT ================= */}
        {activeTab === 'coffee' && (
          <div className="bg-[#151F2E] border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-1">
                    Coffee Machine Throughput & Group Head Sizer
                  </h3>
                  <p className="text-xs text-slate-400">
                    Prevents thermal drop and customer queues during morning peak rush.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Target Daily Coffee Cups: <strong className="text-amber-400">{coffeeDailyCups} cups</strong>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="25"
                    value={coffeeDailyCups}
                    onChange={(e) => setCoffeeDailyCups(Number(e.target.value))}
                    className="w-full accent-brand-orange cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Peak Rush Concentration: <strong className="text-amber-400">{coffeeRushPct}% in 2 peak hours</strong>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    step="5"
                    value={coffeeRushPct}
                    onChange={(e) => setCoffeeRushPct(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                <button
                  onClick={runCoffeeCalc}
                  disabled={coffeeLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold rounded-xl text-sm shadow-xl shadow-brand-orange/20 transition"
                >
                  {coffeeLoading ? 'Analyzing...' : 'Calculate Coffee Machine Requirements'}
                </button>
              </div>

              {/* Result */}
              <div className="lg:col-span-6 bg-[#0B0F17] border border-slate-700/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
                {coffeeResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-400">Extraction Recommendation</span>
                        <h4 className="text-lg font-bold text-white">{coffeeResult.recommended_machine_tier}</h4>
                      </div>
                      <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                        {coffeeResult.recommended_group_heads} Group Heads
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Peak Extraction Load</span>
                        <strong className="text-base text-white">{coffeeResult.peak_hourly_cups} cups / hour</strong>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Steam Boiler Volume</span>
                        <strong className="text-base text-amber-400">{coffeeResult.minimum_steam_boiler_liters}</strong>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Daily Beans Required</span>
                        <strong className="text-base text-emerald-400">~{coffeeResult.daily_coffee_beans_kg} kg / day</strong>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Grinder Spec</span>
                        <strong className="text-xs text-slate-200">{coffeeResult.recommended_grinder_spec}</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <Coffee className="w-12 h-12 text-slate-700 mb-3" />
                    <p className="text-sm font-semibold text-slate-400">Select target cups and click Calculate</p>
                    <p className="text-xs text-slate-500 mt-1">Computes peak cups/hr and group head count.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= CALCULATOR 3: EXHAUST HOOD CFM ================= */}
        {activeTab === 'exhaust' && (
          <div className="bg-[#151F2E] border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-1">
                    Exhaust Hood CFM & Duct Sizing Calculator
                  </h3>
                  <p className="text-xs text-slate-400">
                    Ensures proper capture velocity for heavy fryers, griddles, and tandoors.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Hood Length (Feet)</label>
                    <input
                      type="number"
                      value={hoodLength}
                      onChange={(e) => setHoodLength(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Hood Width (Feet)</label>
                    <input
                      type="number"
                      value={hoodWidth}
                      onChange={(e) => setHoodWidth(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Hood Style</label>
                    <select
                      value={hoodType}
                      onChange={(e) => setHoodType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    >
                      <option value="wall_canopy">Wall Canopy (Most Common)</option>
                      <option value="island">Island Canopy (Central Island)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Cooking Duty</label>
                    <select
                      value={hoodDuty}
                      onChange={(e) => setHoodDuty(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    >
                      <option value="light">Light (Steamers, Bain Maries)</option>
                      <option value="medium">Medium (Ranges, Ovens)</option>
                      <option value="heavy">Heavy (Deep Fryers, Griddles, Woks)</option>
                      <option value="extra_heavy">Extra Heavy (Charcoal, Solid Fuel)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={runExhaustCalc}
                  disabled={hoodLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold rounded-xl text-sm shadow-xl shadow-brand-orange/20 transition"
                >
                  {hoodLoading ? 'Calculating...' : 'Calculate Exhaust Airflow CFM'}
                </button>
              </div>

              {/* Output */}
              <div className="lg:col-span-6 bg-[#0B0F17] border border-slate-700/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
                {hoodResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-cyan-400">Ventilation Spec</span>
                        <h4 className="text-lg font-bold text-white">Recommended Exhaust Airflow</h4>
                      </div>
                      <span className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold font-mono">
                        {hoodResult.recommended_exhaust_cfm} CFM
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Exhaust Fan Airflow</span>
                        <strong className="text-base text-cyan-400">{hoodResult.recommended_exhaust_cfm} CFM</strong>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Makeup Fresh Air</span>
                        <strong className="text-base text-emerald-400">{hoodResult.recommended_makeup_air_cfm} CFM</strong>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Round Duct Diameter</span>
                        <strong className="text-base text-amber-400">~{hoodResult.estimated_duct_diameter_inches} Inches</strong>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Static Pressure</span>
                        <strong className="text-base text-white">{hoodResult.recommended_fan_static_pressure_wg}</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <Wind className="w-12 h-12 text-slate-700 mb-3" />
                    <p className="text-sm font-semibold text-slate-400">Enter hood dimensions and click Calculate</p>
                    <p className="text-xs text-slate-500 mt-1">Calculates required blower CFM, makeup air, and duct size.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= CALCULATOR 4: FRYER OIL ROI ================= */}
        {activeTab === 'fryer-roi' && (
          <div className="bg-[#151F2E] border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-1">
                    Commercial Fryer Oil Filtration ROI Calculator
                  </h3>
                  <p className="text-xs text-slate-400">
                    See how much money automated motorized oil filtration saves your kitchen each year.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Number of Commercial Fryers</label>
                    <input
                      type="number"
                      value={fryerCount}
                      onChange={(e) => setFryerCount(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Oil Capacity Per Fryer (Liters)</label>
                    <input
                      type="number"
                      value={fryerOilLiters}
                      onChange={(e) => setFryerOilLiters(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Oil Cost Per Liter (₹ INR)</label>
                    <input
                      type="number"
                      value={oilCostPerLiter}
                      onChange={(e) => setOilCostPerLiter(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Oil Discard Cycles / Month</label>
                    <input
                      type="number"
                      value={oilChangesMonth}
                      onChange={(e) => setOilChangesMonth(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={runFryerCalc}
                  disabled={fryerLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-brand-orange-hover hover:to-amber-600 text-white font-bold rounded-xl text-sm shadow-xl shadow-brand-orange/20 transition"
                >
                  {fryerLoading ? 'Calculating Savings...' : 'Calculate Annual Oil Savings'}
                </button>
              </div>

              {/* Output */}
              <div className="lg:col-span-6 bg-[#0B0F17] border border-slate-700/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
                {fryerResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-400">Projected Financial Savings</span>
                        <h4 className="text-lg font-bold text-white">48% Oil Life Extension</h4>
                      </div>
                      <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                        Payback in {fryerResult.estimated_payback_period_months} Mo
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Current Annual Spend</span>
                        <strong className="text-base text-slate-300">₹{fryerResult.current_annual_oil_spend_inr.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Annual Savings</span>
                        <strong className="text-xl text-emerald-400 font-extrabold">₹{fryerResult.projected_annual_oil_savings_inr.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Monthly Cash Savings</span>
                        <strong className="text-base text-amber-400">₹{fryerResult.projected_monthly_savings_inr.toLocaleString('en-IN')} / mo</strong>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block">Oil Waste Prevented</span>
                        <strong className="text-base text-cyan-400">{fryerResult.oil_waste_reduction_liters_per_year} Liters/yr</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                    <DollarSign className="w-12 h-12 text-slate-700 mb-3" />
                    <p className="text-sm font-semibold text-slate-400">Enter fryer numbers and click Calculate</p>
                    <p className="text-xs text-slate-500 mt-1">Calculates annual cash savings and payback period.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
