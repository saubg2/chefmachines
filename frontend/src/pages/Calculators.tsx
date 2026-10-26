import React, { useState } from 'react';
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
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
            Commercial Sizing & Calculations
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Kitchen Engineering Calculators
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Calculate accurate sizing, electrical loads, and ROI for cold rooms, espresso bars, ventilation exhaust, and oil filtration systems.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'cold-room', name: 'Cold Room Sizer' },
            { id: 'coffee', name: 'Coffee Peak Throughput' },
            { id: 'exhaust', name: 'Exhaust Hood & CFM' },
            { id: 'fryer-roi', name: 'Fryer Oil Filtration ROI' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                activeTab === tab.id
                  ? 'bg-brand-orange border-brand-orange text-white font-bold'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* TAB 1: COLD ROOM */}
        {activeTab === 'cold-room' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4 text-xs">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Walk-in Cold Room Sizing</h3>
                  <p className="text-slate-500">Calculates required compressor HP and PUF panel thickness.</p>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Length (Ft)</label>
                    <input
                      type="number"
                      value={crLength}
                      onChange={(e) => setCrLength(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Width (Ft)</label>
                    <input
                      type="number"
                      value={crWidth}
                      onChange={(e) => setCrWidth(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Height (Ft)</label>
                    <input
                      type="number"
                      value={crHeight}
                      step="0.5"
                      onChange={(e) => setCrHeight(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Type</label>
                    <select
                      value={crTemp}
                      onChange={(e) => setCrTemp(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    >
                      <option value="chiller">Chiller (+2°C to +8°C)</option>
                      <option value="freezer">Deep Freezer (-18°C to -22°C)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Daily Turnover (Kg)</label>
                    <input
                      type="number"
                      value={crTurnover}
                      onChange={(e) => setCrTurnover(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                <button
                  onClick={runColdRoomCalc}
                  disabled={crLoading}
                  className="w-full py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl uppercase tracking-wider transition text-xs"
                >
                  {crLoading ? 'Calculating...' : 'Calculate Cold Room Size'}
                </button>
              </div>

              {/* Output */}
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between text-xs">
                {crResult ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-900 text-sm">Specification Result</span>
                      <span className="px-2 py-0.5 rounded bg-orange-100 text-brand-orange font-bold uppercase text-[10px]">
                        {crTemp}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Total Volume</span>
                        <strong className="text-slate-900 text-sm">{crResult.volume_cuft} Cu Ft ({crResult.volume_cum} m³)</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Compressor Rating</span>
                        <strong className="text-brand-orange text-sm">{crResult.recommended_compressor_hp} HP Unit</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Cooling Capacity</span>
                        <strong className="text-slate-900 text-sm">{crResult.cooling_capacity_btu_hr.toLocaleString()} BTU/hr</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">PUF Panel Thickness</span>
                        <strong className="text-slate-900 text-sm">{crResult.puf_insulation_panel_mm} mm</strong>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 pt-1">
                      Estimated consumption: ~{crResult.est_daily_power_kwh} kWh/day • Approx. Pallets: {crResult.approx_pallet_capacity}
                    </p>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-6 text-slate-400">
                    Enter room dimensions and click Calculate to view compressor HP.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COFFEE */}
        {activeTab === 'coffee' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4 text-xs">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Coffee Machine Sizer</h3>
                  <p className="text-slate-500">Peak hour cup extraction & boiler sizing.</p>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Daily Coffee Cups: <strong className="text-brand-orange">{coffeeDailyCups} cups</strong>
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
                  <label className="font-semibold text-slate-700 block mb-1">
                    Rush Hour Concentration: <strong className="text-brand-orange">{coffeeRushPct}% in 2 hours</strong>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    step="5"
                    value={coffeeRushPct}
                    onChange={(e) => setCoffeeRushPct(Number(e.target.value))}
                    className="w-full accent-brand-orange cursor-pointer"
                  />
                </div>

                <button
                  onClick={runCoffeeCalc}
                  disabled={coffeeLoading}
                  className="w-full py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl uppercase tracking-wider transition text-xs"
                >
                  {coffeeLoading ? 'Analyzing...' : 'Calculate Coffee Throughput'}
                </button>
              </div>

              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between text-xs">
                {coffeeResult ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{coffeeResult.recommended_machine_tier}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-orange-100 text-brand-orange font-bold text-[10px]">
                        {coffeeResult.recommended_group_heads} Groups
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Peak Load</span>
                        <strong className="text-slate-900 text-sm">{coffeeResult.peak_hourly_cups} cups / hour</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Boiler Size</span>
                        <strong className="text-slate-900 text-sm">{coffeeResult.minimum_steam_boiler_liters}</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Daily Beans</span>
                        <strong className="text-slate-900 text-sm">~{coffeeResult.daily_coffee_beans_kg} kg/day</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Grinder Spec</span>
                        <strong className="text-slate-900 text-[11px]">{coffeeResult.recommended_grinder_spec}</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-6 text-slate-400">
                    Adjust target cups and click Calculate to view group heads needed.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EXHAUST HOOD */}
        {activeTab === 'exhaust' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4 text-xs">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Exhaust Hood Airflow (CFM)</h3>
                  <p className="text-slate-500">Capture velocity for fryers, griddles, and ranges.</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Hood Length (Ft)</label>
                    <input
                      type="number"
                      value={hoodLength}
                      onChange={(e) => setHoodLength(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Hood Width (Ft)</label>
                    <input
                      type="number"
                      value={hoodWidth}
                      onChange={(e) => setHoodWidth(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Hood Style</label>
                    <select
                      value={hoodType}
                      onChange={(e) => setHoodType(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    >
                      <option value="wall_canopy">Wall Canopy</option>
                      <option value="island">Island Canopy</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Cooking Duty</label>
                    <select
                      value={hoodDuty}
                      onChange={(e) => setHoodDuty(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    >
                      <option value="light">Light (Steamers)</option>
                      <option value="medium">Medium (Ranges)</option>
                      <option value="heavy">Heavy (Fryers, Griddles)</option>
                      <option value="extra_heavy">Extra Heavy (Charcoal)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={runExhaustCalc}
                  disabled={hoodLoading}
                  className="w-full py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl uppercase tracking-wider transition text-xs"
                >
                  {hoodLoading ? 'Calculating...' : 'Calculate Airflow CFM'}
                </button>
              </div>

              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between text-xs">
                {hoodResult ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-900 text-sm">Ventilation Result</span>
                      <span className="px-2 py-0.5 rounded bg-orange-100 text-brand-orange font-bold text-[10px]">
                        {hoodResult.recommended_exhaust_cfm} CFM
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Exhaust Blower</span>
                        <strong className="text-slate-900 text-sm">{hoodResult.recommended_exhaust_cfm} CFM</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Makeup Air</span>
                        <strong className="text-slate-900 text-sm">{hoodResult.recommended_makeup_air_cfm} CFM</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Duct Diameter</span>
                        <strong className="text-slate-900 text-sm">~{hoodResult.estimated_duct_diameter_inches} In</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Static Pressure</span>
                        <strong className="text-slate-900 text-xs">{hoodResult.recommended_fan_static_pressure_wg}</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-6 text-slate-400">
                    Enter hood length and click Calculate to view airflow CFM.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FRYER ROI */}
        {activeTab === 'fryer-roi' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4 text-xs">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Fryer Oil Filtration ROI</h3>
                  <p className="text-slate-500">Calculate annual cash savings from motorized oil filtration.</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Number of Fryers</label>
                    <input
                      type="number"
                      value={fryerCount}
                      onChange={(e) => setFryerCount(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Oil Liters / Fryer</label>
                    <input
                      type="number"
                      value={fryerOilLiters}
                      onChange={(e) => setFryerOilLiters(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Oil Cost / Liter (₹)</label>
                    <input
                      type="number"
                      value={oilCostPerLiter}
                      onChange={(e) => setOilCostPerLiter(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Oil Changes / Month</label>
                    <input
                      type="number"
                      value={oilChangesMonth}
                      onChange={(e) => setOilChangesMonth(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                <button
                  onClick={runFryerCalc}
                  disabled={fryerLoading}
                  className="w-full py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl uppercase tracking-wider transition text-xs"
                >
                  {fryerLoading ? 'Calculating...' : 'Calculate Oil Savings'}
                </button>
              </div>

              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between text-xs">
                {fryerResult ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-900 text-sm">Projected Financial Savings</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Payback in {fryerResult.estimated_payback_period_months} Mo
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Annual Savings</span>
                        <strong className="text-emerald-700 text-sm">₹{fryerResult.projected_annual_oil_savings_inr.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Monthly Savings</span>
                        <strong className="text-slate-900 text-sm">₹{fryerResult.projected_monthly_savings_inr.toLocaleString('en-IN')} / mo</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Current Annual Spend</span>
                        <strong className="text-slate-700 text-xs">₹{fryerResult.current_annual_oil_spend_inr.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Waste Prevented</span>
                        <strong className="text-slate-900 text-xs">{fryerResult.oil_waste_reduction_liters_per_year} Liters/yr</strong>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-6 text-slate-400">
                    Enter fryer numbers and click Calculate to view annual cash savings.
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
