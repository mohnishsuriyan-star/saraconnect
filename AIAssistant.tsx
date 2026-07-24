import React, { useState } from 'react';
import { Clock, Download, Calendar as CalendarIcon, BookOpen, Check, Sparkles, FileText, AlertCircle, Award, CheckCircle2, Search, Filter, ShieldCheck, Sun } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { TIMETABLE_DATA } from '../data/mockData';

export interface CalendarEvent {
  date: string;
  day: string;
  event: string;
  type: 'holiday' | 'exam' | 'academic' | 'observance';
  details?: string;
}

const EVEN_SEM_2026_HOLIDAYS_EXAMS: CalendarEvent[] = [
  { date: 'Jan 05, 2026', day: 'Monday', event: 'Even Semester Classes Commence', type: 'academic', details: 'Beginning of Even Semester 2025-2026 for all departments.' },
  { date: 'Jan 14 - 17, 2026', day: 'Wed - Sat', event: 'Pongal & Sankranti Festival Holidays', type: 'holiday', details: 'College closed for Traditional Pongal celebrations.' },
  { date: 'Jan 26, 2026', day: 'Monday', event: 'Republic Day', type: 'holiday', details: 'National Holiday. Flag hoisting ceremony at Main Quadrangle.' },
  { date: 'Feb 12, 2026', day: 'Thursday', event: 'Syllabus Completion for CIA-1', type: 'academic', details: 'Target deadline for 1st unit syllabus completion.' },
  { date: 'Feb 16 - 21, 2026', day: 'Mon - Sat', event: 'CIA Test - 1 (Continuous Internal Assessment)', type: 'exam', details: 'Assessment for CIA-1 portions (Units 1 & 2).' },
  { date: 'Feb 26, 2026', day: 'Thursday', event: 'Maha Shivaratri', type: 'holiday', details: 'Festival Holiday.' },
  { date: 'Mar 19, 2026', day: 'Thursday', event: 'Syllabus Completion for CIA-2', type: 'academic', details: 'Target deadline for 2nd unit syllabus completion.' },
  { date: 'Mar 23 - 28, 2026', day: 'Mon - Sat', event: 'CIA Test - 2 (Continuous Internal Assessment)', type: 'exam', details: 'Assessment for CIA-2 portions (Units 3 & 4).' },
  { date: 'Apr 03, 2026', day: 'Friday', event: 'Good Friday', type: 'holiday', details: 'Holiday.' },
  { date: 'Apr 14, 2026', day: 'Tuesday', event: 'Tamil New Year & Ugadi', type: 'holiday', details: 'Festival Holiday.' },
  { date: 'Apr 16, 2026', day: 'Thursday', event: 'Syllabus Completion for CIA-3', type: 'academic', details: 'Target deadline for CIA-3 portion.' },
  { date: 'Apr 20 - 25, 2026', day: 'Mon - Sat', event: 'CIA Test - 3 (Continuous Internal Assessment)', type: 'exam', details: 'Final internal assessment before End Semester Exams.' },
  { date: 'Apr 27 - 30, 2026', day: 'Mon - Thu', event: 'Model Practical Examinations', type: 'exam', details: 'Mandatory practical lab model exams for all engineering batches.' },
  { date: 'May 04 - 09, 2026', day: 'Mon - Sat', event: 'End Semester Practical Examinations', type: 'exam', details: 'Anna University Autonomous End Semester Lab Examinations.' },
  { date: 'May 13 - 30, 2026', day: 'Wed - Sat', event: 'End Semester Theory Examinations', type: 'exam', details: 'Autonomous Even Semester End Semester Theory Examinations.' },
  { date: 'June 2026', day: 'Month', event: 'Summer Vacation & Industrial Internships', type: 'academic', details: 'Summer break & mandatory industry internships.' },
];

const ODD_SEM_2026_HOLIDAYS_EXAMS: CalendarEvent[] = [
  { date: 'July 01, 2026', day: 'Wednesday', event: 'III, V, VII Semester Classes Commence', type: 'academic', details: 'Day 1 of Odd Semester 2026-2027.' },
  { date: 'July 31, 2026', day: 'Friday', event: 'Syllabus Completion for CIA-1', type: 'academic', details: 'Completion of Unit 1 & 2 for CIA-1 portion.' },
  { date: 'Aug 03 - 08, 2026', day: 'Mon - Sat', event: 'CIA Test - 1 (Continuous Internal Assessment)', type: 'exam', details: 'CIA Test 1 written examinations.' },
  { date: 'Aug 05, 2026', day: 'Wednesday', event: 'Freshers Batch 2026 Classes & Induction', type: 'academic', details: '1st Year Freshers onboarding and commencement.' },
  { date: 'Aug 14, 2026', day: 'Friday', event: 'Vinayagar Chaturthi', type: 'holiday', details: 'Festival Holiday.' },
  { date: 'Aug 15, 2026', day: 'Saturday', event: 'Independence Day', type: 'holiday', details: 'National Holiday & Flag Hoisting.' },
  { date: 'Aug 26, 2026', day: 'Wednesday', event: 'Milad-un-Nabi', type: 'holiday', details: 'Festival Holiday.' },
  { date: 'Aug 27, 2026', day: 'Thursday', event: 'Avani Avittam', type: 'holiday', details: 'Festival Holiday.' },
  { date: 'Sep 03, 2026', day: 'Thursday', event: 'Syllabus Completion for CIA-2', type: 'academic', details: 'Completion of CIA-2 syllabus portion.' },
  { date: 'Sep 04, 2026', day: 'Friday', event: 'Krishna Jayanthi', type: 'holiday', details: 'Festival Holiday.' },
  { date: 'Sep 05, 2026', day: 'Saturday', event: 'Teachers Day Celebration', type: 'observance', details: 'College event and tribute to faculty.' },
  { date: 'Sep 07 - 12, 2026', day: 'Mon - Sat', event: 'CIA Test - 2 (Continuous Internal Assessment)', type: 'exam', details: 'CIA Test 2 written examinations.' },
  { date: 'Sep 15, 2026', day: 'Tuesday', event: 'Engineer\'s Day', type: 'observance', details: 'Technical competitions & guest lectures.' },
  { date: 'Oct 01, 2026', day: 'Thursday', event: 'Syllabus Completion for CIA-3', type: 'academic', details: 'Final syllabus completion deadline.' },
  { date: 'Oct 02, 2026', day: 'Friday', event: 'Gandhi Jayanthi', type: 'holiday', details: 'National Holiday.' },
  { date: 'Oct 05 - 10, 2026', day: 'Mon - Sat', event: 'CIA Test - 3 (Continuous Internal Assessment)', type: 'exam', details: 'CIA Test 3 written examinations.' },
  { date: 'Oct 12 - 16, 2026', day: 'Mon - Fri', event: 'Model Practical Examinations', type: 'exam', details: 'Model lab exams across all departments.' },
  { date: 'Oct 19, 2026', day: 'Monday', event: 'Ayudha Pooja', type: 'holiday', details: 'Festival Holiday.' },
  { date: 'Oct 20, 2026', day: 'Tuesday', event: 'Vijayadhasami', type: 'holiday', details: 'Festival Holiday.' },
  { date: 'Oct 21, 2026', day: 'Wednesday', event: 'End Semester Practical Examinations Begin', type: 'exam', details: 'Autonomous End Sem Practical Lab Exams.' },
  { date: 'Oct 27, 2026', day: 'Tuesday', event: 'End Semester Arrear Examinations Begin', type: 'exam', details: 'Arrear written examinations begin.' },
  { date: 'Nov 05, 2026', day: 'Thursday', event: 'Deepavali', type: 'holiday', details: 'Festival Holiday.' },
  { date: 'Nov 11, 2026', day: 'Wednesday', event: 'End Semester Theory Examinations Begin', type: 'exam', details: 'Autonomous End Semester Theory Examinations.' },
  { date: 'Nov 14, 2026', day: 'Saturday', event: 'Children\'s Day', type: 'observance', details: 'Observance.' },
];

export const TimetableSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'calendar' | 'exams' | 'timetable'>('calendar');
  const [selectedSemesterYear, setSelectedSemesterYear] = useState<'even' | 'odd'>('even');
  const [selectedDept, setSelectedDept] = useState<string>('CSE');
  const [selectedSem, setSelectedSem] = useState<string>('Sem1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);

  const timetableKey = `${selectedDept}-${selectedSem}`;
  const currentSchedule = TIMETABLE_DATA[timetableKey] || TIMETABLE_DATA['CSE-Sem1'];

  const currentEventsList = selectedSemesterYear === 'even' ? EVEN_SEM_2026_HOLIDAYS_EXAMS : ODD_SEM_2026_HOLIDAYS_EXAMS;

  const filteredEvents = currentEventsList.filter((item) => {
    const query = searchQuery.toLowerCase();
    return item.event.toLowerCase().includes(query) ||
           item.date.toLowerCase().includes(query) ||
           (item.details && item.details.toLowerCase().includes(query)) ||
           item.type.toLowerCase().includes(query);
  });

  const handleDownloadPDF = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();

      // Title & Header Styling
      doc.setFillColor(16, 185, 129); // Emerald green
      doc.rect(0, 0, 210, 28, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.text('SARANATHAN COLLEGE OF ENGINEERING, TRICHY', 14, 14);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Official Academic Planner & Schedule 2026 (${selectedSemesterYear.toUpperCase()} SEMESTER)`, 14, 22);

      // Metadata
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`Exported Date: ${new Date().toLocaleDateString()}`, 14, 36);
      doc.text('Autonomous Academic Council', 140, 36);

      doc.setDrawColor(200, 200, 200);
      doc.line(14, 40, 196, 40);

      let startY = 50;

      if (activeSubTab === 'timetable') {
        // Table Header
        doc.setFillColor(240, 253, 244);
        doc.rect(14, startY - 6, 182, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.text('Time', 16, startY);
        doc.text('Monday', 45, startY);
        doc.text('Tuesday', 80, startY);
        doc.text('Wednesday', 115, startY);
        doc.text('Thursday', 150, startY);
        doc.text('Friday', 180, startY);

        startY += 8;

        currentSchedule.forEach((slot, index) => {
          if (index % 2 === 1) {
            doc.setFillColor(248, 250, 252);
            doc.rect(14, startY - 5, 182, 12, 'F');
          }
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.text(slot.time, 14, startY);
          const formatText = (txt: string) => (txt.length > 18 ? txt.substring(0, 16) + '..' : txt);
          doc.text(formatText(slot.monday), 45, startY);
          doc.text(formatText(slot.tuesday), 80, startY);
          doc.text(formatText(slot.wednesday), 115, startY);
          doc.text(formatText(slot.thursday), 150, startY);
          doc.text(formatText(slot.friday), 180, startY);
          startY += 12;
        });
      } else {
        // Planner & Exam List PDF
        doc.setFillColor(240, 253, 244);
        doc.rect(14, startY - 6, 182, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.text('Date', 16, startY);
        doc.text('Event / Milestone', 55, startY);
        doc.text('Type', 145, startY);
        doc.text('Day', 175, startY);

        startY += 8;

        filteredEvents.forEach((item, index) => {
          if (index % 2 === 1) {
            doc.setFillColor(248, 250, 252);
            doc.rect(14, startY - 5, 182, 10, 'F');
          }
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.text(item.date, 16, startY);
          const formatEvent = (txt: string) => (txt.length > 45 ? txt.substring(0, 43) + '..' : txt);
          doc.text(formatEvent(item.event), 55, startY);
          doc.text(item.type.toUpperCase(), 145, startY);
          doc.text(item.day, 175, startY);
          startY += 10;
        });
      }

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text('Note: Attendance above 75% is required as per Anna University regulations.', 14, 270);
      doc.text('Saranathan College Freshers Portal - SaraConnect', 14, 276);

      doc.save(`Saranathan_Academic_Planner_2026_${selectedSemesterYear}.pdf`);
    } catch (err) {
      console.error('PDF Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-emerald-900 dark:border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white relative overflow-hidden">
        
        {/* Glow bg */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Saranathan Academic Planner & Exam Hub 2026</span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            2026 Holidays, Exam Schedule & Timetables
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Official Autonomous academic calendar for 2026 Even & Odd semesters. Track CIA test dates, Anna University end-sem practicals, theory exams, and gazetted college holidays.
          </p>
        </div>

        {/* Download PDF CTA */}
        <button
          onClick={handleDownloadPDF}
          disabled={isExporting}
          className="w-full md:w-auto px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0 relative z-10"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Generating PDF...' : 'Download Academic Planner PDF'}</span>
        </button>
      </div>

      {/* Main Sub-Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        
        <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setActiveSubTab('calendar')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeSubTab === 'calendar'
                ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-md'
                : 'text-black dark:text-slate-300 hover:text-emerald-900 dark:hover:text-white'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Academic Planner & Holidays</span>
          </button>

          <button
            onClick={() => setActiveSubTab('exams')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeSubTab === 'exams'
                ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-md'
                : 'text-black dark:text-slate-300 hover:text-emerald-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Exam Schedule 2026</span>
          </button>

          <button
            onClick={() => setActiveSubTab('timetable')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeSubTab === 'timetable'
                ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-md'
                : 'text-black dark:text-slate-300 hover:text-emerald-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Class Timetable</span>
          </button>
        </div>

        {/* Semester Toggle Switcher (Even Sem vs Odd Sem 2026) */}
        {activeSubTab !== 'timetable' && (
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-slate-900 p-1.5 rounded-2xl border border-emerald-900/20 dark:border-slate-800">
            <span className="text-xs font-bold text-black dark:text-slate-300 px-2">Semester:</span>
            <button
              onClick={() => setSelectedSemesterYear('even')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedSemesterYear === 'even'
                  ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow'
                  : 'text-black dark:text-slate-400 hover:text-emerald-900 dark:hover:text-white'
              }`}
            >
              2026 EVEN SEM
            </button>
            <button
              onClick={() => setSelectedSemesterYear('odd')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedSemesterYear === 'odd'
                  ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow'
                  : 'text-black dark:text-slate-400 hover:text-emerald-900 dark:hover:text-white'
              }`}
            >
              2026 ODD SEM
            </button>
          </div>
        )}

      </div>

      {/* VIEW 1 & 2: ACADEMIC PLANNER / HOLIDAYS / EXAM SCHEDULE */}
      {(activeSubTab === 'calendar' || activeSubTab === 'exams') && (
        <div className="space-y-6">
          
          {/* Search & Filter Bar */}
          <div className="glass-card rounded-3xl p-5 border border-emerald-500/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search CIA tests, Pongal, Deepavali..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-black dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-800 dark:text-slate-300">
              <span className="flex items-center gap-1 text-rose-800 dark:text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Holiday
              </span>
              <span className="flex items-center gap-1 text-emerald-800 dark:text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Exam / Test
              </span>
              <span className="flex items-center gap-1 text-blue-800 dark:text-blue-400">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Academic Milestone
              </span>
            </div>

          </div>

          {/* Schedule Table */}
          <div className="glass-card rounded-3xl border border-emerald-500/20 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-950/20 via-slate-900/30 to-teal-950/20 text-black dark:text-slate-200 font-heading text-xs font-extrabold border-b border-slate-200 dark:border-slate-800">
                    <th className="py-4 px-5 w-44">Date & Day</th>
                    <th className="py-4 px-5">Event / Examination Schedule</th>
                    <th className="py-4 px-5 w-36">Category</th>
                    <th className="py-4 px-5">Details & Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/80 text-xs text-black dark:text-slate-300 font-medium">
                  {filteredEvents
                    .filter((item) => activeSubTab === 'calendar' || item.type === 'exam')
                    .map((item, idx) => {
                      let typeBadgeClass = 'bg-slate-100 text-slate-800 border-slate-300';
                      if (item.type === 'holiday') typeBadgeClass = 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30 font-bold';
                      if (item.type === 'exam') typeBadgeClass = 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border-emerald-500/30 font-bold';
                      if (item.type === 'academic') typeBadgeClass = 'bg-blue-500/10 text-blue-800 dark:text-blue-400 border-blue-500/30 font-bold';
                      if (item.type === 'observance') typeBadgeClass = 'bg-amber-500/10 text-amber-800 dark:text-amber-400 border-amber-500/30 font-bold';

                      return (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? 'bg-white/40 dark:bg-slate-900/40' : 'bg-slate-50/50 dark:bg-slate-950/50'}
                        >
                          <td className="py-3.5 px-5 font-bold text-black dark:text-white whitespace-nowrap">
                            <div>{item.date}</div>
                            <div className="text-[10px] text-slate-600 dark:text-slate-400 font-normal">{item.day}</div>
                          </td>

                          <td className="py-3.5 px-5 font-extrabold text-black dark:text-white">
                            {item.event}
                          </td>

                          <td className="py-3.5 px-5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase border inline-block ${typeBadgeClass}`}>
                              {item.type}
                            </span>
                          </td>

                          <td className="py-3.5 px-5 text-slate-700 dark:text-slate-300">
                            {item.details || 'Official Saranathan Autonomous Planner'}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-emerald-50/60 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-black dark:text-slate-300">
              <span>Showing {selectedSemesterYear.toUpperCase()} SEMESTER 2026 Schedule</span>
              <span className="text-emerald-900 dark:text-emerald-400">Autonomous Examination Cell</span>
            </div>
          </div>

        </div>
      )}

      {/* VIEW 3: CLASS TIMETABLE */}
      {activeSubTab === 'timetable' && (
        <div className="space-y-6">
          
          {/* Selectors Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Department Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-bold text-black dark:text-slate-400 shrink-0">Dept:</span>
              {['CSE', 'ECE', 'IT', 'AI & DS'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedDept === dept
                      ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-md'
                      : 'bg-white/80 dark:bg-slate-800/80 text-black dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Semester Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-black dark:text-slate-400">Semester:</span>
              <select
                value={selectedSem}
                onChange={(e) => setSelectedSem(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-black dark:text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Sem1">Semester 1 (Freshers)</option>
              </select>
            </div>

          </div>

          {/* Timetable Schedule Grid Table */}
          <div className="glass-card rounded-3xl border border-emerald-500/20 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-950/20 via-slate-900/30 to-teal-950/20 text-black dark:text-slate-200 font-heading text-xs font-extrabold border-b border-slate-200 dark:border-slate-800">
                    <th className="py-4 px-4 w-36">Time Slot</th>
                    <th className="py-4 px-4">Monday</th>
                    <th className="py-4 px-4">Tuesday</th>
                    <th className="py-4 px-4">Wednesday</th>
                    <th className="py-4 px-4">Thursday</th>
                    <th className="py-4 px-4">Friday</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/80 text-xs text-black dark:text-slate-300 font-medium">
                  {currentSchedule.map((slot, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-white/40 dark:bg-slate-900/40' : 'bg-slate-50/50 dark:bg-slate-950/50'}
                    >
                      <td className="py-3.5 px-4 font-bold text-emerald-900 dark:text-emerald-400 whitespace-nowrap bg-emerald-500/5">
                        {slot.time}
                      </td>
                      <td className="py-3.5 px-4">{slot.monday}</td>
                      <td className="py-3.5 px-4">{slot.tuesday}</td>
                      <td className="py-3.5 px-4">{slot.wednesday}</td>
                      <td className="py-3.5 px-4">{slot.thursday}</td>
                      <td className="py-3.5 px-4">{slot.friday}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Schedule Footer Note */}
            <div className="p-4 bg-slate-100/60 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-700 dark:text-slate-400 gap-2 font-medium">
              <span>
                <strong>Regular College Hours:</strong> 08:45 AM - 04:30 PM | <strong>Lunch Break:</strong> 12:20 PM - 01:15 PM
              </span>
              <span className="font-semibold text-emerald-900 dark:text-emerald-400">
                Saranathan College Academic Board
              </span>
            </div>
          </div>

        </div>
      )}

    </section>
  );
};

