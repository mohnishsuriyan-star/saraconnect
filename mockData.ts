import React, { useState, useEffect } from 'react';
import { UserCheck, Sparkles, CheckCircle, Download, Calendar, MapPin, Hash, Mail, Phone, Building, QrCode, ArrowRight } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { Department, EventItem } from '../types';

interface RegistrationPortalProps {
  events: EventItem[];
  preselectedEventId?: string;
  onRegistrationSuccess?: () => void;
}

export const RegistrationPortal: React.FC<RegistrationPortalProps> = ({
  events,
  preselectedEventId,
  onRegistrationSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    registerNo: '81382410',
    department: 'CSE' as Department,
    year: '1st Year',
    email: '',
    phone: '',
    eventId: preselectedEventId || (events[0]?.id || ''),
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState<any>(null);

  useEffect(() => {
    if (preselectedEventId) {
      setFormData((prev) => ({ ...prev, eventId: preselectedEventId }));
    }
  }, [preselectedEventId]);

  const selectedEvent = events.find((e) => e.id === formData.eventId) || events[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          eventTitle: selectedEvent?.title || 'Campus Event',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit registration');
      }

      setSuccessData(data);
      if (onRegistrationSuccess) {
        onRegistrationSuccess();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error processing registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPassPDF = () => {
    if (!successData || !selectedEvent) return;

    try {
      const doc = new jsPDF();

      // Header Banner
      doc.setFillColor(16, 185, 129); // Emerald
      doc.rect(0, 0, 210, 32, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('SARANATHAN COLLEGE OF ENGINEERING', 14, 15);

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('OFFICIAL EVENT ENTRY PASS & STUDENT ADMIT CARD', 14, 25);

      // Pass Details Card Frame
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(1);
      doc.rect(14, 42, 182, 120);

      doc.setTextColor(30, 41, 59);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`EVENT: ${selectedEvent.title}`, 20, 56);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Pass ID: ${successData.id}`, 20, 68);
      doc.text(`Date & Time: ${selectedEvent.date} | ${selectedEvent.time}`, 20, 76);
      doc.text(`Venue: ${selectedEvent.venue}`, 20, 84);

      doc.setDrawColor(220, 220, 220);
      doc.line(20, 92, 190, 92);

      // Student Metadata
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('STUDENT INFORMATION', 20, 102);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Student Name: ${successData.name}`, 20, 112);
      doc.text(`Register No: ${successData.registerNo}`, 20, 120);
      doc.text(`Department: ${successData.department} (${successData.year})`, 20, 128);
      doc.text(`Email: ${successData.email} | Phone: ${successData.phone}`, 20, 136);

      // QR Code Box Placeholder
      doc.setDrawColor(16, 185, 129);
      doc.rect(145, 102, 40, 40);
      doc.setFontSize(8);
      doc.text('SCAN QR', 155, 120);
      doc.text('ENTRY PERMIT', 150, 126);

      // Footer Terms
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text('Instructions: Please carry this pass and your official Saranathan College ID card to the venue.', 14, 180);
      doc.text('Issued by SaraConnect Freshers Portal | Saranathan College of Engineering, Panjappur, Trichy', 14, 186);

      doc.save(`Saranathan_Pass_${successData.registerNo}_${selectedEvent.title.substring(0, 10)}.pdf`);
    } catch (err) {
      console.error('PDF pass error:', err);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      
      {/* If registration success, show pass card */}
      {successData ? (
        <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 shadow-2xl text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
            <CheckCircle className="w-10 h-10 animate-bounce" />
          </div>

          <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
            Registration Confirmed!
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Your event entry pass for <strong>{successData.eventTitle}</strong> has been generated successfully.
          </p>

          {/* Pass Preview Card */}
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white text-left border border-emerald-500/30 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">Saranathan College Entry Pass</span>
                <h3 className="font-heading font-bold text-lg text-white">{successData.eventTitle}</h3>
              </div>
              <QrCode className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 text-[10px] block">STUDENT NAME</span>
                <span className="font-semibold text-white">{successData.name}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">REGISTER NO</span>
                <span className="font-semibold text-white">{successData.registerNo}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">DEPARTMENT</span>
                <span className="font-semibold text-white">{successData.department} ({successData.year})</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">PASS ID</span>
                <span className="font-mono text-emerald-400 font-bold">{successData.id}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={downloadPassPDF}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Pass PDF</span>
            </button>

            <button
              onClick={() => {
                setSuccessData(null);
                setFormData({
                  name: '',
                  registerNo: '81382410',
                  department: 'CSE',
                  year: '1st Year',
                  email: '',
                  phone: '',
                  eventId: events[0]?.id || '',
                });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300 transition-colors cursor-pointer"
            >
              Register for Another Event
            </button>
          </div>
        </div>
      ) : (
        /* Form Card */
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-emerald-500/20 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold mb-2">
              <UserCheck className="w-4 h-4 text-emerald-500" />
              <span>Freshers Registration Portal</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Event & Onboarding Registration
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Fill in your student details to register for campus events, workshops, and club orientations.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Event Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Campus Event / Orientation
              </label>
              <select
                value={formData.eventId}
                onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                {events.map((evt) => (
                  <option key={evt.id} value={evt.id}>
                    {evt.title} ({evt.date})
                  </option>
                ))}
              </select>
            </div>

            {/* Student Name & Register No */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Ananya S"
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Register Number (8138...) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.registerNo}
                  onChange={(e) => setFormData({ ...formData, registerNo: e.target.value })}
                  placeholder="813824104001"
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Department & Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Department *
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value as Department })}
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="CSE">Computer Science and Engg (CSE)</option>
                  <option value="ECE">Electronics & Communication (ECE)</option>
                  <option value="EEE">Electrical & Electronics (EEE)</option>
                  <option value="IT">Information Technology (IT)</option>
                  <option value="AI & DS">Artificial Intelligence & Data Science</option>
                  <option value="MECH">Mechanical Engineering (MECH)</option>
                  <option value="ICE">Instrumentation & Control (ICE)</option>
                  <option value="CSBS">Computer Science & Business Systems (CSBS)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Academic Year
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="1st Year">1st Year Freshers (Batch 2026)</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year Senior</option>
                </select>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  College / Personal Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@saranathan.ac.in"
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="9876543210"
                  className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Processing Registration...' : 'Complete Registration & Generate Pass'}</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
