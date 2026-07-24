import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Globe, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="mt-20 border-t border-emerald-500/20 bg-slate-950 text-slate-300 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                S
              </div>
              <span className="font-heading font-extrabold text-xl text-white bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                SaraConnect
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Official AI-Powered Freshers Portal for Saranathan College of Engineering, Tiruchirappalli. Streamlining campus orientation, AI answers, class timetables, and event passes.
            </p>

            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                <i className="fa-brands fa-youtube text-sm"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm">Freshers Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('fee-calculator')} className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1 font-bold text-emerald-300">
                  <span>Admission & Fee Estimator</span>
                  <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500 text-slate-950 rounded-full font-bold">Calculator</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sarasell')} className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1 font-bold text-emerald-400">
                  <span>SaraSell Buy & Sell Marketplace</span>
                  <span className="px-1.5 py-0.2 text-[9px] bg-amber-400 text-slate-950 rounded-full font-bold">New</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Campus Overview & Welcome
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-assistant')} className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1">
                  <span>Gemini AI Bot Assistant</span>
                  <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500/20 text-emerald-400 rounded-full">AI</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Orientation & Hackathons
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faculty')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Faculty Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('timetable')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Class Timetable & PDF Export
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Departments */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm">Engineering Departments</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Computer Science & Engg (CSE)</li>
              <li>Electronics & Comm Engg (ECE)</li>
              <li>Electrical & Electronics Engg (EEE)</li>
              <li>Information Technology (IT)</li>
              <li>AI & Data Science (AI & DS)</li>
              <li>Computer Science & Business Systems (CSBS)</li>
            </ul>
          </div>

          {/* Col 4: Address */}
          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="font-heading font-bold text-white text-sm">Campus Secretariat</h4>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Venkateswara Nagar, NH 45B, Panjappur, Tiruchirappalli - 620012</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-teal-500 shrink-0" />
              <span>+91 431 2473684</span>
            </p>
            <p className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-green-500 shrink-0" />
              <a href="https://saranathan.ac.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 underline">
                saranathan.ac.in
              </a>
            </p>

            <button
              onClick={onOpenAdmin}
              className="mt-2 text-[11px] text-slate-500 hover:text-emerald-400 transition-colors underline cursor-pointer"
            >
              Admin System Portal Sign In
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SaraConnect. Saranathan College of Engineering. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Freshers Batch 2026
          </p>
        </div>

      </div>
    </footer>
  );
};
