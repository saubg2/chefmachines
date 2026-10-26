import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { api, TrainingModule } from '../services/api';

export const TrainingAcademy: React.FC = () => {
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const [loading, setLoading] = useState(true);

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-xs">
        Loading Training Academy...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
            Commercial Manpower Training
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            ChefMachines Training Academy
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Certified hands-on training for commercial kitchen staff: espresso extraction, combi steam ovens, and QSR fryer lines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Module Selector */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Certification Programs
            </span>
            {modules.map((m) => {
              const isSelected = selectedModule?.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedModule(m);
                    setEnrollSubmitted(false);
                  }}
                  className={`cursor-pointer rounded-xl p-4 border transition ${
                    isSelected
                      ? 'bg-orange-50/50 border-brand-orange shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {m.category}
                    </span>
                    <span className="text-xs font-bold text-brand-orange">{m.duration}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{m.title}</h4>
                  <p className="text-slate-500 text-xs line-clamp-2">{m.description}</p>
                </div>
              );
            })}
          </div>

          {/* Module Syllabus & Enrollment */}
          <div className="lg:col-span-7">
            {selectedModule && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Syllabus</span>
                    <h3 className="text-xl font-bold text-slate-900">{selectedModule.title}</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    {selectedModule.badge}
                  </span>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {selectedModule.description}
                </p>

                {selectedModule.syllabus && selectedModule.syllabus.length > 0 && (
                  <div className="mb-6 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Hands-On Curriculum:
                    </span>
                    {selectedModule.syllabus.map((s, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                        <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                          <span>Day {s.day || idx + 1}: {s.topic}</span>
                          <span className="text-slate-500">{s.hours}</span>
                        </div>
                        {s.hands_on && (
                          <p className="text-slate-600 text-[11px] mt-0.5">
                            Practice: {s.hands_on}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Enrollment Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  {enrollSubmitted ? (
                    <div className="text-center py-3">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-1.5" />
                      <h4 className="text-base font-bold text-slate-900">Enrollment Received</h4>
                      <p className="text-slate-500 text-xs mt-1">
                        Our academy manager will contact you with batch dates.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 mb-2">
                        Enroll Staff in Certification
                      </h4>

                      <form onSubmit={handleEnrollSubmit} className="space-y-2.5 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <input
                            type="text"
                            required
                            placeholder="Contact Person *"
                            value={enrollForm.trainee_name}
                            onChange={(e) => setEnrollForm({ ...enrollForm, trainee_name: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                          />
                          <input
                            type="tel"
                            required
                            placeholder="WhatsApp Number *"
                            value={enrollForm.phone}
                            onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <input
                            type="email"
                            required
                            placeholder="Email Address *"
                            value={enrollForm.email}
                            onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                          />
                          <input
                            type="text"
                            placeholder="Brand / Restaurant Name"
                            value={enrollForm.organization}
                            onChange={(e) => setEnrollForm({ ...enrollForm, organization: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-900"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-lg text-xs uppercase tracking-wider transition disabled:opacity-50"
                        >
                          {isSubmitting ? 'Registering...' : 'Register Crew for Academy'}
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
