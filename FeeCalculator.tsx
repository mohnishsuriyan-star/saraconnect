@import "tailwindcss";

@layer base {
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background-color: #ffffff;
    color: #000000;
  }
  .dark body {
    background-color: #05070a;
    color: #f8fafc;
  }
  h1, h2, h3, h4, h5, h6, .font-heading {
    font-family: 'Poppins', 'Helvetica Neue', sans-serif;
  }
}

/* Light Mode Contrast Enforcement for White Boxes & Cards */
html:not(.dark) body,
html:not(.dark) .glass-card,
html:not(.dark) .bg-white,
html:not(.dark) .bg-slate-50,
html:not(.dark) .bg-slate-100,
html:not(.dark) .bg-emerald-50 {
  color: #000000;
}

/* Ensure subtext, muted slate text inside white containers is black in light theme */
html:not(.dark) .glass-card p,
html:not(.dark) .glass-card span:not(.text-white),
html:not(.dark) .glass-card div,
html:not(.dark) .glass-card label,
html:not(.dark) .glass-card td,
html:not(.dark) .glass-card th,
html:not(.dark) .bg-white p,
html:not(.dark) .bg-white span:not(.text-white),
html:not(.dark) .bg-white div,
html:not(.dark) .bg-white label,
html:not(.dark) .text-slate-600,
html:not(.dark) .text-slate-500,
html:not(.dark) .text-slate-400,
html:not(.dark) .text-slate-300,
html:not(.dark) .text-slate-200,
html:not(.dark) .text-slate-700,
html:not(.dark) .text-slate-800,
html:not(.dark) .text-slate-900 {
  color: #000000;
}

/* Input, Select, Textarea text color in Light Mode */
html:not(.dark) input,
html:not(.dark) select,
html:not(.dark) textarea,
html:not(.dark) option {
  color: #000000 !important;
}

html:not(.dark) input::placeholder,
html:not(.dark) textarea::placeholder {
  color: #334155 !important;
}

/* Radial Glow Background Effect */
.bg-glow {
  position: absolute;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, #065f46 0%, transparent 70%);
  opacity: 0.12;
  filter: blur(70px);
  z-index: 0;
  pointer-events: none;
}

.dark .bg-glow {
  background: radial-gradient(circle, #10b981 0%, transparent 70%);
  opacity: 0.15;
}

.glow-1 {
  top: -100px;
  right: -100px;
}

.glow-2 {
  bottom: -100px;
  left: -100px;
}

/* Editorial Typography Display Gradient */
.display-text {
  font-weight: 900;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #022c22 0%, #065f46 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark .display-text {
  background: linear-gradient(135deg, #ffffff 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Glassmorphism & Custom Glow Effects */
.glass-card {
  background: #ffffff;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1.5px solid #064e3b;
  box-shadow: 0 8px 30px 0 rgba(6, 78, 59, 0.08);
  color: #000000;
}

.dark .glass-card {
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.5);
  color: #f8fafc;
}

.glass-pill {
  background: #f0fdf4;
  backdrop-filter: blur(8px);
  border: 1.5px solid #064e3b;
  color: #064e3b;
}

.dark .glass-pill {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #6ee7b7;
}

/* Editorial Buttons */
.cta-button {
  background: #064e3b;
  color: #ffffff;
  padding: 14px 28px;
  border-radius: 9999px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  transition: all 0.2s ease-in-out;
}

.cta-button:hover {
  background: #047857;
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(6, 78, 59, 0.3);
}

.dark .cta-button {
  background: #10b981;
  color: #05070a;
}

.dark .cta-button:hover {
  background: #34d399;
  box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.4);
}

.secondary-cta {
  background: #ffffff;
  border: 2px solid #064e3b;
  color: #064e3b;
}

.secondary-cta:hover {
  background: #ecfdf5;
  border-color: #047857;
}

.dark .secondary-cta {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.dark .secondary-cta:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.4);
}

/* Custom Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(2deg); }
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulseGlow 8s ease-in-out infinite;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(6, 78, 59, 0.4);
  border-radius: 9999px;
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.3);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(6, 78, 59, 0.7);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.6);
}

