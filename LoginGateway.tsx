import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin, Award, BookOpen, User, GraduationCap, Building } from 'lucide-react';
import { FacultyMember, Department } from '../types';

interface FacultyDirectoryProps {
  facultyList: FacultyMember[];
}

const getFacultyInitials = (name: string) => {
  const cleanName = name.replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+/i, '');
  const parts = cleanName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return cleanName.substring(0, 2).toUpperCase();
};

export const FacultyDirectory: React.FC<FacultyDirectoryProps> = ({ facultyList }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  const departments: (Department | 'All')[] = [
    'All',
    'CSE',
    'ECE',
    'EEE',
    'IT',
    'AI & DS',
    'MECH',
    'ICE',
    'CSBS',
  ];

  const filteredFaculty = facultyList.filter((fac) => {
    const matchesSearch =
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.qualification.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDepartment === 'All' || fac.department === selectedDepartment;

    return matchesSearch && matchesDept;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
          <GraduationCap className="w-4 h-4 text-emerald-500" />
          <span>Saranathan Faculty Expertise</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
          Faculty Directory
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Connect with distinguished professors, Heads of Departments, and freshers mentors across engineering wings.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search faculty name, subject, qualification..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        {/* Department Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedDepartment === dept
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((fac) => (
          <div
            key={fac.id}
            className="glass-card rounded-3xl p-6 border border-emerald-500/20 hover:border-emerald-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
          >
            <div>
              {/* Avatar and Main Title */}
              <div className="flex items-center gap-4">
                {fac.avatar && fac.avatar.trim() !== '' ? (
                  <img
                    src={fac.avatar}
                    alt={fac.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                      const fallback = (e.currentTarget as HTMLElement).nextElementSibling;
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/30 group-hover:scale-105 transition-transform shadow-md shrink-0"
                  />
                ) : null}

                {/* Plain Monogram Badge */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 text-emerald-300 dark:text-emerald-400 border-2 border-emerald-500/30 font-heading font-black text-base shadow-md shrink-0 items-center justify-center ${
                    fac.avatar && fac.avatar.trim() !== '' ? 'hidden' : 'flex'
                  }`}
                >
                  {getFacultyInitials(fac.name)}
                </div>

                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-1">
                    {fac.department}
                  </span>
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                    {fac.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                    {fac.designation}
                  </p>
                </div>
              </div>

              {/* Qualifications & Experience */}
              <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="font-medium">{fac.qualification}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Building className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                  <span>{fac.office}</span>
                </div>
                <div className="flex items-start gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{fac.experience}</span>
                </div>
              </div>

              {/* Research Interests Tags */}
              {fac.researchInterests && fac.researchInterests.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1">
                  {fac.researchInterests.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Email Contact Action */}
            <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800">
              <a
                href={`mailto:${fac.email}`}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-500" />
                <span className="truncate">{fac.email}</span>
              </a>
            </div>

          </div>
        ))}
      </div>

      {filteredFaculty.length === 0 && (
        <div className="text-center py-12 glass-card rounded-3xl border border-slate-200 dark:border-slate-800">
          <User className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="font-heading font-bold text-slate-800 dark:text-slate-200 text-lg">
            No faculty members found
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search criteria or selecting a different department.
          </p>
        </div>
      )}

    </section>
  );
};
