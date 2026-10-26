import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  Coffee,
  ChefHat,
  ShieldCheck,
  Send
} from 'lucide-react';
import { api, TrainingModule } from '../services/api';

export const TrainingAcademy: React.FC = () => {
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const [loading, setLoading] = useState(true);

  // Enrollment Form State
  const [enrollForm, setEnrollForm] = useState({
    trainee_name: '',
    email: '',
    phone: '',
    organization: '',
    attendee_count: 1,
    notes: ''
  });
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.getTrainingModules()
      .then((data) => {
        setModules(data);
        if (data.length > 0) setSelectedModule(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModule) return;
    setIsSubmitting(true);
    try {
      await api.enrollTraining({
        module_slug: selectedModule.slug,
        ...enrollForm
      });
      setEnrollSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Error submitting enrollment. Please call our academy coordinator.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] text-white">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-4 h-4" /> Pillar 3: Commercial Manpower Academy
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
            ChefMachines Training Academy
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Certified hands-on training for commercial kitchen manpower. Transform your team into precision baristas, combi oven operators, and fast-line QSR specialists.
          </p>
        </div>

        {/* Modules Grid & Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Module Selector List */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Available Certification Programs:
            </h3>
            {modules.map((m) => {
              const isSelected = selectedModule?.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedModule(m);
                    setEnrollSubmitted(false);
                  }}
                  className={`cursor-pointer rounded-2xl p-5 border transition ${
                    isSelected
                      ? 'bg-[#182332] border-emerald-400 shadow-xl shadow-emerald-500/15 scale-[1.01]'
                      : 'bg-[#151D2A] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {m.category}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">{m.duration}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">{m.title}</h4>
                  <p className="text-slate-400 text-xs line-clamp-2">{m.description}</p>
                </div>
              );
            })}
          </div>

          {/* Module Syllabus & Enrollment Form */}
          <div className="lg:col-span-7">
            {selectedModule && (
              <div className="bg-[#151F2E] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400">Course Syllabus</span>
                    <h3 className="text-2xl font-bold font-display text-white">{selectedModule.title}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-300">
                    <Award className="w-4 h-4" /> {selectedModule.badge || 'Certified'}
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {selectedModule.description}
                </p>

                {/* Hands-on Curriculum */}
                {selectedModule.syllabus && selectedModule.syllabus.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Daily Hands-On Training Modules:
                    </h4>
                    <div className="space-y-3">
                      {selectedModule.syllabus.map((s, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-xs">
                          <div className="flex items-center justify-between font-bold text-white mb-1">
                            <span>Day {s.day || idx + 1}: {s.topic}</span>
                            <span className="text-amber-400 font-mono">{s.hours || '8 hrs'}</span>
                          </div>
                          {s.hands_on && (
                            <p className="text-slate-400 text-[11px] mt-1">
                              🛠️ <strong>Hands-on Practice:</strong> {s.hands_on}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enrollment Card */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
                  {enrollSubmitted ? (
                    <div className="text-center py-4">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                      <h4 className="text-lg font-bold text-white">Enrollment Registered!</h4>
                      <p className="text-slate-400 text-xs mt-1">
                        Our academy manager will contact you with batch dates and venue details.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">
                        Enroll Team in this Certification Program
                      </h4>
                      <p className="text-slate-400 text-xs mb-4">
                        Conducted at our Bangalore / Mumbai Academy or on-site at your restaurant commissary.
                      </p>

                      <form onSubmit={handleEnrollSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Contact Person Name *"
                            value={enrollForm.trainee_name}
                            onChange={(e) => setEnrollForm({ ...enrollForm, trainee_name: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                          />
                          <input
                            type="tel"
                            required
                            placeholder="WhatsApp Number *"
                            value={enrollForm.phone}
                            onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="email"
                            required
                            placeholder="Business Email *"
                            value={enrollForm.email}
                            onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                          />
                          <input
                            type="text"
                            placeholder="Cafe / Restaurant Brand Name"
                            value={enrollForm.organization}
                            onChange={(e) => setEnrollForm({ ...enrollForm, organization: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                        >
                          {isSubmitting ? 'Registering...' : 'Submit Academy Enrollment'}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
