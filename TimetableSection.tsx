import React, { useState, useEffect } from 'react';
import { User, Sparkles, Bell, Calendar, MessageSquare, Send, CheckCircle2, ShieldCheck, Bookmark, Award, BookOpen, Lightbulb, ShoppingBag, ArrowUpRight, ExternalLink } from 'lucide-react';
import { NOTIFICATIONS } from '../data/mockData';

interface StudentDashboardProps {
  onNavigateToAI: () => void;
  onNavigateToEvents: () => void;
  onNavigateToSaraSell?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onNavigateToAI,
  onNavigateToEvents,
  onNavigateToSaraSell,
}) => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch('/api/registrations');
      const data = await res.json();
      setRegistrations(data);
    } catch (err) {
      console.error('Failed to fetch student registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setFeedbackText('');
    setTimeout(() => setFeedbackSent(false), 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-teal-950/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-emerald-500/30 shrink-0">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                Freshers Dashboard
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/30">
                Batch 2026 Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Welcome to your personal Saranathan College portal! View your event registrations, AI suggestions, and notifications.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onNavigateToAI}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Ask AI Assistant</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Registered Events */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="glass-card rounded-3xl p-6 border border-emerald-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  Your Event Registrations ({registrations.length})
                </h3>
              </div>
              <button
                onClick={onNavigateToEvents}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Browse All Events →
              </button>
            </div>

            {loading ? (
              <p className="text-xs text-slate-500 py-4 text-center">Loading registrations...</p>
            ) : registrations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-xs text-slate-500">You haven't registered for any campus events yet.</p>
                <button
                  onClick={onNavigateToEvents}
                  className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer"
                >
                  Explore Upcoming Events
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {registrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-emerald-500 tracking-wider uppercase">
                        PASS ID: {reg.id}
                      </span>
                      <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                        {reg.eventTitle}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Registered by {reg.name} ({reg.registerNo}) • {new Date(reg.timestamp).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                      Confirmed Entry
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Onboarding Smart Suggestions for Freshers */}
          <div className="glass-card rounded-3xl p-6 border border-emerald-500/20 shadow-xl bg-gradient-to-br from-slate-900/90 to-emerald-950/80 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-400 animate-pulse" />
              <h3 className="font-heading font-bold text-lg text-white">
                Personalized AI Freshers Guidance
              </h3>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-emerald-500/30 text-xs text-slate-200 space-y-1">
                <span className="font-bold text-emerald-400">💡 Club Recommendation: SaraCode & Rotaract</span>
                <p className="text-slate-300">
                  Based on your department (CSE/IT), senior developers recommend attending SaraCode's Web Dev 101 workshop to get a head start on hackathons.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-emerald-500/30 text-xs text-slate-200 space-y-1">
                <span className="font-bold text-teal-400">📚 Central Library E-Resource Access</span>
                <p className="text-slate-300">
                  Log into the IEEE ASPP e-journal portal with your Saranathan mail ID to access research papers for Sem 1 projects.
                </p>
              </div>
            </div>
          </div>

          {/* SaraSell Second-Hand Marketplace Quick Card */}
          <div className="glass-card rounded-3xl p-6 border-2 border-emerald-900 dark:border-emerald-500/40 shadow-xl bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <h3 className="font-heading font-extrabold text-lg text-white">
                  SaraSell Marketplace
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full">
                  Freshers Portal
                </span>
              </div>
              <p className="text-xs text-slate-200 max-w-xl">
                Buy & sell second-hand Drafters, Engineering Graphics Kits, Casio FX-991EX Calculators, Books & Cycles directly with seniors on <strong>sarasell.netlify.app</strong>.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              {onNavigateToSaraSell && (
                <button
                  onClick={onNavigateToSaraSell}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition-colors cursor-pointer"
                >
                  Explore Marketplace
                </button>
              )}
              <a
                href="https://sarasell.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Campus Notifications & Feedback */}
        <div className="space-y-8">
          
          {/* Notifications Card */}
          <div className="glass-card rounded-3xl p-6 border border-emerald-500/20 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-emerald-500" />
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Campus Bulletin
              </h3>
            </div>

            <div className="space-y-3">
              {NOTIFICATIONS.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white line-clamp-1">
                      {notif.title}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                      {notif.date}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Freshers Feedback / Inquiry Box */}
          <div className="glass-card rounded-3xl p-6 border border-emerald-500/20 shadow-xl">
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2">
              Freshers Help & Feedback
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Have a question or suggestion for the freshers welfare committee? Submit it directly below.
            </p>

            {feedbackSent && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! Your feedback has been sent to Freshers Welfare Cell.</span>
              </div>
            )}

            <form onSubmit={handleSendFeedback} className="space-y-3">
              <textarea
                rows={3}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Type your question or campus query..."
                className="w-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Query</span>
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
