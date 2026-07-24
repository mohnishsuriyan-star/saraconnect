import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  Lock, 
  User, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Building2,
  AlertCircle,
  KeyRound,
  Zap,
  Bot,
  Calendar,
  Users,
  Sun,
  Moon
} from 'lucide-react';
import { Department, UserSession } from '../types';

interface LoginGatewayProps {
  onLoginSuccess: (session: UserSession) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const DEPARTMENTS: Department[] = [
  'CSE',
  'ECE',
  'EEE',
  'IT',
  'AI & DS',
  'MECH',
  'ICE',
  'CSBS'
];

export const LoginGateway: React.FC<LoginGatewayProps> = ({
  onLoginSuccess,
  darkMode,
  setDarkMode
}) => {
  const [loginMode, setLoginMode] = useState<'student' | 'admin'>('student');

  // Student Form State
  const [studentName, setStudentName] = useState('');
  const [registerNo, setRegisterNo] = useState('');
  const [department, setDepartment] = useState<Department>('CSE');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentError, setStudentError] = useState('');

  // Admin Form State
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Student Login Submit
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setStudentError('Please enter your full name');
      return;
    }
    if (!registerNo.trim()) {
      setStudentError('Please enter your Register Number or Roll No');
      return;
    }

    setStudentError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const session: UserSession = {
        role: 'student',
        name: studentName.trim(),
        registerNo: registerNo.trim(),
        department: department,
        email: studentEmail.trim() || `${registerNo.trim().toLowerCase()}@saranathan.ac.in`,
        loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      onLoginSuccess(session);
      setIsSubmitting(false);
    }, 400);
  };

  // Quick Demo Student Sign In
  const handleQuickStudentLogin = () => {
    const session: UserSession = {
      role: 'student',
      name: 'Arjun Kumar',
      registerNo: '813824104042',
      department: 'CSE',
      email: 'arjun.24cse@saranathan.ac.in',
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    onLoginSuccess(session);
  };

  // Handle Admin Login Submit
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUsername.trim() || !adminPassword.trim()) {
      setAdminError('Please fill in both Username and Password');
      return;
    }

    setIsSubmitting(true);
    setAdminError('');

    setTimeout(() => {
      if (adminUsername === 'mohnish' && adminPassword === 'mohnish2007') {
        const session: UserSession = {
          role: 'admin',
          name: 'Chief Admin (Principal Office)',
          loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        onLoginSuccess(session);
      } else {
        setAdminError('Invalid admin username or password.');
      }
      setIsSubmitting(false);
    }, 400);
  };

  // Quick Demo Admin Sign In
  const handleQuickAdminLogin = () => {
    const session: UserSession = {
      role: 'admin',
      name: 'Campus Administrator',
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    onLoginSuccess(session);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#05070a] text-black dark:text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans transition-colors duration-300">
      
      {/* Background Radial Glow Effects */}
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />

      {/* Top Header Branding Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-900 text-white dark:bg-gradient-to-br dark:from-emerald-500 dark:via-green-600 dark:to-teal-800 flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-900/20 dark:shadow-emerald-500/20">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-xl text-black dark:text-white tracking-tight">
                SaraConnect
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-900/10 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-900/30 dark:border-emerald-500/30 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-spin" /> AI Portal Gateway
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-400 font-medium">
              Saranathan College of Engineering, Trichy
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-slate-400 bg-emerald-50 dark:bg-slate-900/80 px-3 py-1.5 rounded-full border border-emerald-900/20 dark:border-slate-800">
            <Building2 className="w-3.5 h-3.5 text-emerald-900 dark:text-emerald-400" />
            <span>Counseling Code: <strong className="text-emerald-950 dark:text-white font-bold">2615</strong></span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-emerald-950 dark:text-slate-300 bg-emerald-100 dark:bg-slate-800 hover:bg-emerald-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-emerald-900/20 dark:border-slate-700"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-emerald-950" />
            )}
          </button>
        </div>
      </header>

      {/* Main Authentication Card Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10 my-4">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: College Welcome Banner & Quick Features */}
          <div className="lg:col-span-5 text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/10 text-emerald-950 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-900/30 dark:border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Freshers Academic Year 2026-30</span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl text-black dark:text-white leading-tight tracking-tight">
              Welcome to Your <br />
              <span className="bg-gradient-to-r from-emerald-950 via-emerald-800 to-green-900 dark:from-emerald-400 dark:via-teal-300 dark:to-green-400 bg-clip-text text-transparent">
                Digital Campus.
              </span>
            </h1>

            <p className="text-sm text-black dark:text-slate-300 leading-relaxed font-normal">
              Sign in to unlock personalized AI campus navigation, interactive course timetables, faculty connects, event registration passes, and academic progress tracking.
            </p>

            {/* Quick Portal Feature List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-emerald-50/80 dark:bg-slate-900/50 border border-emerald-900/20 dark:border-slate-800/80">
                <div className="p-2 rounded-lg bg-emerald-900 text-white dark:bg-emerald-500/10 dark:text-emerald-400 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-black dark:text-white">Gemini AI Campus Assistant</h4>
                  <p className="text-[11px] text-slate-700 dark:text-slate-400">Instant answers on syllabus, hostel, regulations & map</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-emerald-50/80 dark:bg-slate-900/50 border border-emerald-900/20 dark:border-slate-800/80">
                <div className="p-2 rounded-lg bg-emerald-900 text-white dark:bg-teal-500/10 dark:text-teal-400 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-black dark:text-white">Freshers Induction & Events Pass</h4>
                  <p className="text-[11px] text-slate-700 dark:text-slate-400">One-click event registration & QR entrance passes</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-emerald-50/80 dark:bg-slate-900/50 border border-emerald-900/20 dark:border-slate-800/80">
                <div className="p-2 rounded-lg bg-emerald-900 text-white dark:bg-green-500/10 dark:text-green-400 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-black dark:text-white">Faculty Directory & Timetables</h4>
                  <p className="text-[11px] text-slate-700 dark:text-slate-400">Direct professor connect & department class slots</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Login Box */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-emerald-900 dark:bg-slate-900/90 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
              
              {/* Subtle top card glow accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-900 via-emerald-700 to-green-900 dark:from-emerald-500 dark:via-teal-400 dark:to-green-500" />

              {/* Mode Toggle Switcher */}
              <div className="flex p-1 bg-emerald-50/80 dark:bg-slate-950/80 rounded-2xl border border-emerald-900/20 dark:border-slate-800 mb-6">
                <button
                  type="button"
                  onClick={() => setLoginMode('student')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    loginMode === 'student'
                      ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-lg'
                      : 'text-black dark:text-slate-400 hover:text-emerald-900 dark:hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Sign-In</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLoginMode('admin')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    loginMode === 'admin'
                      ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-lg'
                      : 'text-black dark:text-slate-400 hover:text-emerald-900 dark:hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Sign-In</span>
                </button>
              </div>

              {/* STUDENT LOGIN FORM */}
              {loginMode === 'student' && (
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div className="text-left mb-2">
                    <h3 className="text-lg font-bold text-black dark:text-white flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-emerald-900 dark:text-emerald-400" />
                      Freshers Student Onboarding
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-slate-400 font-medium">
                      Enter your college roll number and details to access the portal.
                    </p>
                  </div>

                  {studentError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2 font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{studentError}</span>
                    </div>
                  )}

                  {/* Register Number */}
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-black dark:text-slate-300 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-emerald-900 dark:text-emerald-400" />
                      Register No. / Roll No. <span className="text-rose-600 dark:text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 813824104001"
                      value={registerNo}
                      onChange={(e) => setRegisterNo(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/80 border-2 border-slate-300 dark:border-slate-800 text-black dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-900 dark:focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Full Name */}
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-black dark:text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-900 dark:text-emerald-400" />
                      Student Full Name <span className="text-rose-600 dark:text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ananya Subramanian"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/80 border-2 border-slate-300 dark:border-slate-800 text-black dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-900 dark:focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Department & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-black dark:text-slate-300 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-900 dark:text-emerald-400" />
                        Department
                      </label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value as Department)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950/80 border-2 border-slate-300 dark:border-slate-800 text-black dark:text-white text-sm focus:outline-none focus:border-emerald-900 dark:focus:border-emerald-500 transition-colors"
                      >
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-black dark:text-slate-300">
                        College Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="student@saranathan.ac.in"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-950/80 border-2 border-slate-300 dark:border-slate-800 text-black dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-900 dark:focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-900 text-white hover:bg-emerald-800 dark:bg-emerald-500 dark:text-slate-950 font-bold text-sm tracking-wide uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>{isSubmitting ? 'Verifying Student Record...' : 'Open Campus Main Portal'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Quick Demo Student Sign In shortcut */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-700 dark:text-slate-400 font-medium">Don't have details ready?</span>
                    <button
                      type="button"
                      onClick={handleQuickStudentLogin}
                      className="px-3 py-1.5 rounded-lg bg-emerald-900/10 text-emerald-900 hover:bg-emerald-900 hover:text-white dark:bg-emerald-500/10 dark:text-emerald-400 hover:dark:bg-emerald-500/20 text-xs font-bold border border-emerald-900/30 dark:border-emerald-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Quick Demo Student Login</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ADMIN LOGIN FORM */}
              {loginMode === 'admin' && (
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="text-left mb-2">
                    <h3 className="text-lg font-bold text-black dark:text-white flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-900 dark:text-emerald-400" />
                      Faculty & Admin Command Center
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-slate-400 font-medium">
                      Access administrative management, event scheduling & student logs.
                    </p>
                  </div>

                  {adminError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs flex items-center gap-2 font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{adminError}</span>
                    </div>
                  )}

                  {/* Admin Username */}
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-black dark:text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-900 dark:text-emerald-400" />
                      Admin Username
                    </label>
                    <input
                      type="text"
                      placeholder="Enter admin username"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/80 border-2 border-slate-300 dark:border-slate-800 text-black dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-900 dark:focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Admin Password */}
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-black dark:text-slate-300 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-900 dark:text-emerald-400" />
                      Admin Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950/80 border-2 border-slate-300 dark:border-slate-800 text-black dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-900 dark:focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-900 text-white hover:bg-emerald-800 dark:bg-emerald-500 dark:text-slate-950 font-bold text-sm tracking-wide uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>{isSubmitting ? 'Authenticating Admin...' : 'Enter Admin Control Portal'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full py-4 border-t border-slate-200 dark:border-slate-900 text-center text-xs text-black dark:text-slate-400 font-medium z-10">
        <p>© 2026 Saranathan College of Engineering. All rights reserved. Powered by Google Gemini AI.</p>
      </footer>

    </div>
  );
};
