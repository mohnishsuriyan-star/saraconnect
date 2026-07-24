import React, { useState } from 'react';
import { Sparkles, Sun, Moon, ShieldCheck, Menu, X, Compass, MessageSquare, Calendar, Users, Clock, UserCheck, PhoneCall, LogOut, User, GraduationCap, ShoppingBag, Calculator, Receipt } from 'lucide-react';
import { UserSession } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAdmin: () => void;
  onOpenRegistration: (eventId?: string) => void;
  userSession: UserSession | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  onOpenAdmin,
  onOpenRegistration,
  userSession,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'sarasell', label: 'SaraSell', icon: ShoppingBag, badge: 'Buy & Sell' },
    { id: 'fee-calculator', label: 'Fee Calculator', icon: Receipt, badge: 'Bill Quote' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: MessageSquare, badge: 'Gemini' },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'faculty', label: 'Faculty', icon: Users },
    { id: 'timetable', label: 'Timetable', icon: Clock },
    { id: 'register', label: 'Register', icon: UserCheck },
    { id: 'dashboard', label: 'Dashboard', icon: Sparkles },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3 pb-2">
        <nav className="glass-card rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg border border-emerald-500/20 backdrop-blur-xl">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-green-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300">
              <span className="font-heading font-extrabold text-xl tracking-wider">S</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-400 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-200">
                  SaraConnect
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 animate-pulse" /> AI Portal
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-tight hidden sm:block">
                Saranathan College of Engineering
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : ''}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-0.5 px-1.5 py-0.2 text-[9px] font-bold bg-amber-400 text-slate-950 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Tools: User Session, Admin Control, Dark Mode Toggle & Mobile Menu Trigger */}
          <div className="flex items-center gap-2">
            
            {/* User Session Profile Pill */}
            {userSession && (
              <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800/90 pl-2.5 pr-1.5 py-1 rounded-xl border border-emerald-500/30 text-xs">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-[11px]">
                  {userSession.role === 'admin' ? <ShieldCheck className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                </div>
                <div className="text-left hidden md:block">
                  <div className="font-bold text-slate-800 dark:text-slate-100 text-[11px] max-w-[120px] truncate">
                    {userSession.name}
                  </div>
                  <div className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 capitalize">
                    {userSession.role === 'admin' ? 'Campus Admin' : `${userSession.department || 'Student'}`}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Register CTA */}
            <button
              onClick={() => onOpenRegistration()}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 rounded-xl shadow-md shadow-emerald-600/25 transition-all hover:scale-105 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Event Pass</span>
            </button>

            {/* Admin Login/Control Button */}
            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-200/60 dark:bg-slate-800/80 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl border border-slate-300/60 dark:border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Admin Control Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden md:inline">Admin</span>
            </button>

            {/* Logout / Switch Account Button */}
            <button
              onClick={onLogout}
              className="px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl border border-rose-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Sign Out to Login Page"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-200/60 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-200/60 dark:bg-slate-800/80 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-3 glass-card rounded-2xl shadow-2xl border border-emerald-500/30 flex flex-col gap-1 animate-in slide-in-from-top-3 duration-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-left transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-slate-950 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            
            <div className="pt-2 mt-1 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegistration();
                }}
                className="w-full py-2.5 text-center text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl shadow"
              >
                Get Event Pass
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
