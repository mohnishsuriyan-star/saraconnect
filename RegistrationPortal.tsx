import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChevronDown, ChevronUp, HelpCircle, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim()) return;
    setSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const faqs = [
    {
      q: 'Where is Saranathan College of Engineering located?',
      a: 'The college is located at Venkateswara Nagar, Trichy-Madurai Main Road, NH 45B, Panjappur, Tiruchirappalli, Tamil Nadu 620012. It is just 10 minutes from Trichy Central Bus Stand and Railway Station.'
    },
    {
      q: 'What are the official college bus routes for freshers?',
      a: 'Saranathan College operates 45+ GPS-tracked buses covering Trichy City, Thanjavur, Pudukkottai, Lalgudi, Manapparai, Srirangam, and Karur. Bus pass forms are available at Admin Counter 3.'
    },
    {
      q: 'What is the mandatory attendance criteria as per Anna University?',
      a: 'A minimum of 75% overall attendance is strictly required to be eligible for Anna University end-semester examinations.'
    },
    {
      q: 'How can freshers join college clubs like SaraCode or Rotaract?',
      a: 'Freshers can register online through the SaraConnect Events & Clubs portal or visit the club booths during AARAMBH 2026 Orientation Week.'
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Top Title Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
          <Navigation className="w-4 h-4 text-emerald-500" />
          <span>Campus Reachability</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
          Contact & Location Guide
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Get in touch with Saranathan College administration, freshers help desk, or navigate to our campus in Panjappur, Trichy.
        </p>
      </div>

      {/* Main Grid: Contact Cards & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Official Campus Contact Details & Map Embed */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl space-y-4">
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              Saranathan College Secretariat
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Address:</strong>
                  <p>Venkateswara Nagar, Trichy-Madurai Main Road, NH 45B, Panjappur, Tiruchirappalli, Tamil Nadu 620012</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-500 shrink-0" />
                <div>
                  <strong>Helpline:</strong> +91 431 2473684 / +91 8489915201
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500 shrink-0" />
                <div>
                  <strong>Email:</strong> principal@saranathan.ac.in
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <strong>Admin Working Hours:</strong> Mon - Sat: 08:30 AM - 05:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Simulation Embed */}
          <div className="glass-card rounded-3xl overflow-hidden border border-emerald-500/20 shadow-xl h-64 relative">
            <iframe
              title="Saranathan College Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.467885061453!2d78.6833443148007!3d10.775383992322352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa8cd123456789%3A0x123456789abcdef!2sSaranathan%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className="w-full h-full grayscale opacity-80 hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-2">
              Send an Inquiry / Message
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Have questions regarding freshers hostel admission, bus passes, or scholarship applications? Drop a note below.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Inquiry submitted! Our admissions office will get back to your email shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g., Harish R"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="harish@example.com"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="e.g., Freshers Bus Route Query"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Write your inquiry here..."
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 hover:from-emerald-500 shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Freshers FAQ Accordion Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-emerald-500" />
          <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
            Frequently Asked Questions (Freshers FAQ)
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
