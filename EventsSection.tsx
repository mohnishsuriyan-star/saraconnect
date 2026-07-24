import React, { useState } from 'react';
import { 
  Calculator, 
  Building2, 
  Bus, 
  Home, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  Receipt, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  Share2, 
  Printer, 
  Percent, 
  UserCheck, 
  DollarSign, 
  AlertCircle,
  Wrench,
  Check,
  Banknote,
  FileText,
  CreditCard,
  FileSpreadsheet
} from 'lucide-react';
import { jsPDF } from 'jspdf';

export interface FeeBreakdown {
  tuitionFee: number;
  developmentFee: number;
  hostelFee: number;
  messFee: number;
  busFee: number;
  booksAndKitFee: number;
  uniformAndLabCoatFee: number;
  universityRegistrationFee: number;
  scholarshipDiscount: number;
  grandTotalAnnual: number;
  sem1Fee: number;
  sem2Fee: number;
}

export const FeeCalculator: React.FC = () => {
  // Input State
  const [admissionType, setAdmissionType] = useState<'counseling' | 'management' | 'lateral'>('counseling');
  const [department, setDepartment] = useState<string>('CSE');
  const [isFirstGraduate, setIsFirstGraduate] = useState<boolean>(false);
  const [isScStScholarship, setIsScStScholarship] = useState<boolean>(false);
  const [highCutoffDiscount, setHighCutoffDiscount] = useState<boolean>(false);
  
  // Accommodation & Transport State
  const [residenceType, setResidenceType] = useState<'dayScholarBus' | 'dayScholarSelf' | 'hostel'>('dayScholarBus');
  
  // Hostel Options
  const [hostelRoomType, setHostelRoomType] = useState<'nonAc4' | 'nonAc2' | 'acRoom'>('nonAc4');
  const [messPreference, setMessPreference] = useState<'standard' | 'special'>('standard');
  
  // Bus Transport Options
  const [busRouteZone, setBusRouteZone] = useState<'zone1' | 'zone2' | 'zone3' | 'zone4'>('zone2');
  
  // Optional Add-ons
  const [includeBookKit, setIncludeBookKit] = useState<boolean>(true);
  const [includeUniform, setIncludeUniform] = useState<boolean>(true);

  // Calculations
  const calculateFees = (): FeeBreakdown => {
    // Base Tuition Fee
    let baseTuition = 55000; // Standard Govt Fixed Counseling Fee
    if (admissionType === 'management') {
      if (['CSE', 'AI & DS', 'IT'].includes(department)) baseTuition = 85000;
      else if (['ECE', 'EEE'].includes(department)) baseTuition = 75000;
      else baseTuition = 65000; // Mech, Civil
    } else if (admissionType === 'lateral') {
      baseTuition = 50000;
    }

    // Development & Special Facility Fee
    const devFee = admissionType === 'management' ? 12000 : 5000;

    // Scholarships & Discounts
    let discount = 0;
    if (isFirstGraduate && admissionType === 'counseling') {
      discount += 27500; // Govt First Graduate Concession
    }
    if (isScStScholarship && admissionType === 'counseling') {
      discount += 50000; // Post-matric scholarship
    }
    if (highCutoffDiscount) {
      discount += 10000; // Saranathan Merit Scholarship (Cutoff > 185)
    }

    // Accommodation / Transport
    let hostelFee = 0;
    let messFee = 0;
    let busFee = 0;

    if (residenceType === 'hostel') {
      if (hostelRoomType === 'nonAc4') hostelFee = 38000;
      else if (hostelRoomType === 'nonAc2') hostelFee = 46000;
      else if (hostelRoomType === 'acRoom') hostelFee = 65000;

      messFee = messPreference === 'standard' ? 42000 : 48000;
    } else if (residenceType === 'dayScholarBus') {
      if (busRouteZone === 'zone1') busFee = 14000;
      else if (busRouteZone === 'zone2') busFee = 18000;
      else if (busRouteZone === 'zone3') busFee = 22000;
      else if (busRouteZone === 'zone4') busFee = 26000;
    } else if (residenceType === 'dayScholarSelf') {
      busFee = 500; // Campus Bike Parking Pass
    }

    // One-Time Freshers Kits
    const booksAndKitFee = includeBookKit ? 6500 : 0;
    const uniformAndLabCoatFee = includeUniform ? 3500 : 0;
    const universityRegistrationFee = 3000; // Anna Univ Reg & ID card

    // Net Tuition
    const netTuition = Math.max(0, baseTuition - discount);

    const grandTotalAnnual = netTuition + devFee + hostelFee + messFee + busFee + booksAndKitFee + uniformAndLabCoatFee + universityRegistrationFee;

    // Semester Division: Sem 1 pays 60% (due to one-time kit + reg), Sem 2 pays 40%
    const sem1Fee = Math.round(grandTotalAnnual * 0.55);
    const sem2Fee = grandTotalAnnual - sem1Fee;

    return {
      tuitionFee: baseTuition,
      developmentFee: devFee,
      hostelFee,
      messFee,
      busFee,
      booksAndKitFee,
      uniformAndLabCoatFee,
      universityRegistrationFee,
      scholarshipDiscount: discount,
      grandTotalAnnual,
      sem1Fee,
      sem2Fee
    };
  };

  const breakdown = calculateFees();

  const handleDownloadPDFReceipt = () => {
    const doc = new jsPDF();

    // Top Header Banner
    doc.setFillColor(6, 78, 59); // Emerald 900
    doc.rect(0, 0, 210, 32, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('SARANATHAN COLLEGE OF ENGINEERING', 14, 15);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Autonomous Institution | Counseling Code: 2615 | Panjappur, Trichy - 620012', 14, 23);
    doc.text('OFFICIAL FEE ESTIMATE RECEIPT - ACADEMIC YEAR 2026-2027', 14, 28);

    // Metadata
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Estimate Date: ${new Date().toLocaleDateString()}`, 14, 42);
    doc.text(`Department: ${department}`, 120, 42);
    doc.text(`Quota: ${admissionType.toUpperCase()}`, 14, 48);
    doc.text(`Residence: ${residenceType === 'hostel' ? 'Hostel Resident' : 'Day Scholar'}`, 120, 48);

    doc.setDrawColor(200, 200, 200);
    doc.line(14, 52, 196, 52);

    let y = 62;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('FEE HEAD BREAKDOWN', 14, y);
    doc.text('AMOUNT (INR)', 160, y, { align: 'right' });
    y += 6;

    doc.setDrawColor(16, 185, 129);
    doc.line(14, y, 196, y);
    y += 8;

    const row = (label: string, value: number, isDiscount = false) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(label, 16, y);
      if (isDiscount) {
        doc.setTextColor(180, 0, 0);
        doc.text(`- Rs. ${value.toLocaleString()}`, 160, y, { align: 'right' });
        doc.setTextColor(40, 40, 40);
      } else {
        doc.text(`Rs. ${value.toLocaleString()}`, 160, y, { align: 'right' });
      }
      y += 7;
    };

    row(`Annual Tuition Fee (${admissionType.toUpperCase()} Quota)`, breakdown.tuitionFee);
    row('Academic Development & Facility Charges', breakdown.developmentFee);
    
    if (breakdown.scholarshipDiscount > 0) {
      row('Scholarship / Govt Concession Discount', breakdown.scholarshipDiscount, true);
    }

    if (residenceType === 'hostel') {
      row(`Hostel Room Fee (${hostelRoomType.toUpperCase()})`, breakdown.hostelFee);
      row(`Mess & Catering Services (${messPreference.toUpperCase()})`, breakdown.messFee);
    } else if (residenceType === 'dayScholarBus') {
      row(`College Bus Transportation (${busRouteZone.toUpperCase()})`, breakdown.busFee);
    } else {
      row('Campus Two-Wheeler Pass', breakdown.busFee);
    }

    if (breakdown.booksAndKitFee > 0) {
      row('Textbooks, EG Drafter & Calculator Kit', breakdown.booksAndKitFee);
    }
    if (breakdown.uniformAndLabCoatFee > 0) {
      row('College Uniform & Cotton Lab Coat Stitching', breakdown.uniformAndLabCoatFee);
    }
    row('Anna University Registration & ID Portal Charges', breakdown.universityRegistrationFee);

    y += 4;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, y, 196, y);
    y += 10;

    // Grand Total Box
    doc.setFillColor(240, 253, 244);
    doc.rect(14, y - 6, 182, 16, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(6, 78, 59);
    doc.text('TOTAL ESTIMATED ANNUAL FEE:', 18, y + 4);
    doc.text(`Rs. ${breakdown.grandTotalAnnual.toLocaleString()}`, 190, y + 4, { align: 'right' });

    y += 24;

    // Semester Breakdown Box
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('SEMESTER INSTALLMENT PLAN:', 14, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Semester 1 Payable (Admission & Onboarding): Rs. ${breakdown.sem1Fee.toLocaleString()}`, 18, y);
    y += 6;
    doc.text(`Semester 2 Payable (Mid-Academic Year): Rs. ${breakdown.sem2Fee.toLocaleString()}`, 18, y);

    y += 20;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('* Note: This is an official advisory estimate generated by Saranathan College Fee Portal.', 14, y);
    y += 4;
    doc.text('* Actual fees may vary based on university notification updates and specialized elective labs.', 14, y);

    doc.save(`Saranathan_Fee_Estimate_${department}_${admissionType}.pdf`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-emerald-900 dark:border-emerald-500/40 shadow-2xl relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 text-white">
        
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 max-w-2xl">
            
            {/* Bill Logo Badge */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-300 p-0.5 shadow-xl shadow-emerald-500/30 flex items-center justify-center">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-[14px]" />
                  <Receipt className="w-7 h-7 sm:w-9 sm:h-9 text-emerald-400 transform -rotate-6 transition-transform group-hover:scale-110" />
                  <span className="text-[8px] font-black uppercase text-emerald-300 tracking-wider mt-0.5">SCE BILL</span>
                </div>
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-slate-950"></span>
              </span>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                <span>Official Saranathan Bill & Fee Estimator 2026</span>
              </div>

              <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white leading-tight">
                Freshers Fee & Bill Calculator
              </h1>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                Calculate your exact tuition, hostel, mess, college bus transport, first-graduate discounts, and kit charges in real-time. Print or download an official PDF bill quotation.
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleDownloadPDFReceipt}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs tracking-wider uppercase shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-105 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Bill Quote</span>
            </button>
          </div>
        </div>

      </div>

      {/* Main Grid: Controls vs Live Itemized Receipt */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Fee Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* STEP 1: Admission Quota & Department */}
          <div className="glass-card rounded-3xl p-6 border border-emerald-500/20 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="w-7 h-7 rounded-full bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-black text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="font-heading font-bold text-base text-black dark:text-white">
                Admission Type & Department
              </h3>
            </div>

            {/* Admission Type Radio Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-black dark:text-slate-300">Select Admission Quota *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <button
                  type="button"
                  onClick={() => setAdmissionType('counseling')}
                  className={`p-3.5 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                    admissionType === 'counseling'
                      ? 'bg-emerald-900 text-white border-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500 font-bold shadow-md'
                      : 'bg-white dark:bg-slate-900 text-black dark:text-slate-300 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <div className="font-extrabold flex items-center justify-between">
                    <span>TNEA Counseling</span>
                    {admissionType === 'counseling' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="text-[11px] opacity-80 mt-1">Govt Code 2615</div>
                </button>

                <button
                  type="button"
                  onClick={() => setAdmissionType('management')}
                  className={`p-3.5 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                    admissionType === 'management'
                      ? 'bg-emerald-900 text-white border-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500 font-bold shadow-md'
                      : 'bg-white dark:bg-slate-900 text-black dark:text-slate-300 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <div className="font-extrabold flex items-center justify-between">
                    <span>Management Quota</span>
                    {admissionType === 'management' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="text-[11px] opacity-80 mt-1">Direct Seat Allocation</div>
                </button>

                <button
                  type="button"
                  onClick={() => setAdmissionType('lateral')}
                  className={`p-3.5 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                    admissionType === 'lateral'
                      ? 'bg-emerald-900 text-white border-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500 font-bold shadow-md'
                      : 'bg-white dark:bg-slate-900 text-black dark:text-slate-300 border-slate-300 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <div className="font-extrabold flex items-center justify-between">
                    <span>Lateral Entry</span>
                    {admissionType === 'lateral' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="text-[11px] opacity-80 mt-1">Direct 2nd Year Diploma</div>
                </button>

              </div>
            </div>

            {/* Department Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-black dark:text-slate-300">Engineering Branch / Stream</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 text-black dark:text-white text-xs font-bold focus:outline-none focus:border-emerald-500"
              >
                <option value="CSE">Computer Science & Engineering (CSE)</option>
                <option value="CSBS">Computer Science & Business Systems (CSBS)</option>
                <option value="AI & DS">Artificial Intelligence & Data Science (AI & DS)</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="ECE">Electronics & Communication Engineering (ECE)</option>
                <option value="EEE">Electrical & Electronics Engineering (EEE)</option>
                <option value="MECH">Mechanical Engineering (MECH)</option>
                <option value="CIVIL">Civil Engineering (CIVIL)</option>
              </select>
            </div>

          </div>

          {/* STEP 2: Scholarships & Concessions */}
          <div className="glass-card rounded-3xl p-6 border border-emerald-500/20 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="w-7 h-7 rounded-full bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-black text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-heading font-bold text-base text-black dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Govt Scholarships & Concessions
              </h3>
            </div>

            <div className="space-y-3">
              
              {/* First Graduate */}
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 cursor-pointer">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-black dark:text-white">
                    First Graduate (FG) Concession
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    Tamil Nadu Govt Tuition Fee Waiver (-₹27,500/yr for Counseling Quota)
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isFirstGraduate}
                  onChange={(e) => setIsFirstGraduate(e.target.checked)}
                  disabled={admissionType !== 'counseling'}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
              </label>

              {/* SC / ST Post Matric */}
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 cursor-pointer">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-black dark:text-white">
                    SC / ST / SCC Post-Matric Scholarship
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    Government full tuition scholarship (-₹50,000/yr)
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isScStScholarship}
                  onChange={(e) => setIsScStScholarship(e.target.checked)}
                  disabled={admissionType !== 'counseling'}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
              </label>

              {/* Merit Cutoff Concession */}
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 cursor-pointer">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-black dark:text-white">
                    Saranathan Merit Cutoff Discount
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    Special scholarship for TNEA Cutoff &gt; 185 (-₹10,000/yr)
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={highCutoffDiscount}
                  onChange={(e) => setHighCutoffDiscount(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
              </label>

            </div>
          </div>

          {/* STEP 3: Accommodation (Hostel vs Day Scholar Transport) */}
          <div className="glass-card rounded-3xl p-6 border border-emerald-500/20 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="w-7 h-7 rounded-full bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-black text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="font-heading font-bold text-base text-black dark:text-white flex items-center gap-2">
                <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Residence & Transport Options
              </h3>
            </div>

            {/* Residence Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-300 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setResidenceType('dayScholarBus')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  residenceType === 'dayScholarBus'
                    ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow'
                    : 'text-black dark:text-slate-400 hover:text-emerald-900'
                }`}
              >
                College Bus
              </button>

              <button
                type="button"
                onClick={() => setResidenceType('hostel')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  residenceType === 'hostel'
                    ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow'
                    : 'text-black dark:text-slate-400 hover:text-emerald-900'
                }`}
              >
                Hostel Stay
              </button>

              <button
                type="button"
                onClick={() => setResidenceType('dayScholarSelf')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  residenceType === 'dayScholarSelf'
                    ? 'bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow'
                    : 'text-black dark:text-slate-400 hover:text-emerald-900'
                }`}
              >
                Self Transport
              </button>
            </div>

            {/* Hostel Customization Options */}
            {residenceType === 'hostel' && (
              <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-slate-900/80 border border-emerald-900/20 dark:border-slate-800 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-black dark:text-slate-300">Hostel Room Category</label>
                  <select
                    value={hostelRoomType}
                    onChange={(e) => setHostelRoomType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold text-black dark:text-white"
                  >
                    <option value="nonAc4">Standard Non-AC (4 Sharing) - ₹38,000/yr</option>
                    <option value="nonAc2">Deluxe Non-AC (2 Sharing) - ₹46,000/yr</option>
                    <option value="acRoom">Air Conditioned (3 Sharing) - ₹65,000/yr</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-black dark:text-slate-300">Mess & Food Plan</label>
                  <select
                    value={messPreference}
                    onChange={(e) => setMessPreference(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold text-black dark:text-white"
                  >
                    <option value="standard">Standard South Indian Veg & Non-Veg Mess (₹42,000/yr)</option>
                    <option value="special">Special Multi-Cuisine Feast Mess (₹48,000/yr)</option>
                  </select>
                </div>
              </div>
            )}

            {/* College Bus Routes Options */}
            {residenceType === 'dayScholarBus' && (
              <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-slate-900/80 border border-emerald-900/20 dark:border-slate-800 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-black dark:text-slate-300 flex items-center gap-1">
                    <Bus className="w-3.5 h-3.5 text-emerald-900 dark:text-emerald-400" />
                    Select Bus Route & Distance Zone
                  </label>
                  <select
                    value={busRouteZone}
                    onChange={(e) => setBusRouteZone(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-bold text-black dark:text-white"
                  >
                    <option value="zone1">Zone 1: Panjappur / Viralimalai Road / K.K. Nagar (₹14,000/yr)</option>
                    <option value="zone2">Zone 2: Central Bus Stand / Chatram / TVS Tolgate / Palakkarai (₹18,000/yr)</option>
                    <option value="zone3">Zone 3: Srirangam / Thiruvanaikoil / Thillai Nagar / Woraiyur (₹22,000/yr)</option>
                    <option value="zone4">Zone 4: Thuvakudi / NIT / Lalgudi / Manapparai / Kattur (₹26,000/yr)</option>
                  </select>
                </div>
              </div>
            )}

          </div>

          {/* STEP 4: One-Time Freshers Kits & Add-ons */}
          <div className="glass-card rounded-3xl p-6 border border-emerald-500/20 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="w-7 h-7 rounded-full bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-black text-xs flex items-center justify-center">
                4
              </span>
              <h3 className="font-heading font-bold text-base text-black dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Freshers Essential Kits (1st Year)
              </h3>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 cursor-pointer">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-black dark:text-white">
                    Textbooks, EG Drafter & Scientific Calculator Kit
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    Includes 1st Year Semester 1 Anna Univ Books, Mini Drafter & Casio FX-991EX (+₹6,500)
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeBookKit}
                  onChange={(e) => setIncludeBookKit(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 cursor-pointer">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-black dark:text-white">
                    College Uniform & Cotton Lab Coat
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    Includes 2 sets of uniform fabric, stitching & official SCE cotton lab coat (+₹3,500)
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeUniform}
                  onChange={(e) => setIncludeUniform(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Live Itemized Fee Receipt & Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          <div className="bg-white dark:bg-slate-900 border-2 border-emerald-900 dark:border-emerald-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden text-black dark:text-white">
            
            {/* Top Card Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-900 via-emerald-600 to-teal-800" />

            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                {/* Bill Logo Badge Icon */}
                <div className="w-10 h-10 rounded-xl bg-emerald-950 dark:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-md shrink-0">
                  <Receipt className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-black text-lg text-black dark:text-white">
                      Official Fee Bill
                    </h3>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      <Banknote className="w-3 h-3" /> VERIFIED
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Saranathan College Admission Receipt</p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-950 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-full border border-emerald-500/30 shrink-0">
                {admissionType.toUpperCase()}
              </span>
            </div>

            {/* Department Badge */}
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-slate-950 border border-emerald-900/20 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-600 dark:text-slate-400 block text-[11px]">Selected Branch:</span>
                <span className="font-bold text-black dark:text-white text-sm">{department} Department</span>
              </div>
              <Building2 className="w-5 h-5 text-emerald-900 dark:text-emerald-400" />
            </div>

            {/* Itemized Table */}
            <div className="space-y-3 text-xs divide-y divide-slate-100 dark:divide-slate-800">
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Base Tuition Fee ({admissionType.toUpperCase()})</span>
                <span className="font-bold text-black dark:text-white">₹{breakdown.tuitionFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Academic Development Charges</span>
                <span className="font-bold text-black dark:text-white">₹{breakdown.developmentFee.toLocaleString()}</span>
              </div>

              {breakdown.scholarshipDiscount > 0 && (
                <div className="flex justify-between items-center pt-2 text-rose-700 dark:text-rose-400 font-bold">
                  <span>Scholarships / Concessions</span>
                  <span>- ₹{breakdown.scholarshipDiscount.toLocaleString()}</span>
                </div>
              )}

              {residenceType === 'hostel' && (
                <>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Hostel Room Rent ({hostelRoomType.toUpperCase()})</span>
                    <span className="font-bold text-black dark:text-white">₹{breakdown.hostelFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Mess & Catering Services</span>
                    <span className="font-bold text-black dark:text-white">₹{breakdown.messFee.toLocaleString()}</span>
                  </div>
                </>
              )}

              {residenceType === 'dayScholarBus' && (
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">College Bus Transportation</span>
                  <span className="font-bold text-black dark:text-white">₹{breakdown.busFee.toLocaleString()}</span>
                </div>
              )}

              {residenceType === 'dayScholarSelf' && (
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Campus Bike Parking Pass</span>
                  <span className="font-bold text-black dark:text-white">₹{breakdown.busFee.toLocaleString()}</span>
                </div>
              )}

              {breakdown.booksAndKitFee > 0 && (
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Books, Calculator & EG Drafter Kit</span>
                  <span className="font-bold text-black dark:text-white">₹{breakdown.booksAndKitFee.toLocaleString()}</span>
                </div>
              )}

              {breakdown.uniformAndLabCoatFee > 0 && (
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Uniform & Cotton Lab Coat</span>
                  <span className="font-bold text-black dark:text-white">₹{breakdown.uniformAndLabCoatFee.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Anna Univ Reg & ID Charges</span>
                <span className="font-bold text-black dark:text-white">₹{breakdown.universityRegistrationFee.toLocaleString()}</span>
              </div>

            </div>

            {/* Grand Total Box */}
            <div className="p-4 rounded-2xl bg-emerald-900 text-white dark:bg-emerald-500 dark:text-slate-950 space-y-1 shadow-lg">
              <div className="text-xs font-bold uppercase opacity-90">Total Estimated Annual Fee</div>
              <div className="font-heading font-black text-2xl sm:text-3xl">
                ₹{breakdown.grandTotalAnnual.toLocaleString()}
              </div>
              <div className="text-[11px] opacity-80 pt-1 border-t border-white/20">
                Includes All Academic, Transport / Residence & Freshers Kit Fees
              </div>
            </div>

            {/* Semester Payment Installments */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-black dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-900 dark:text-emerald-400" />
                <span>Semester Installment Breakdown</span>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-600 dark:text-slate-400">Semester 1 (At Onboarding)</span>
                <span className="font-extrabold text-black dark:text-white">₹{breakdown.sem1Fee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Semester 2 (Mid-Academic)</span>
                <span className="font-extrabold text-black dark:text-white">₹{breakdown.sem2Fee.toLocaleString()}</span>
              </div>
            </div>

            {/* Download & Share Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleDownloadPDFReceipt}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-900 text-white hover:bg-emerald-800 dark:bg-emerald-500 dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Fee Receipt PDF</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Hi! Here is my estimated fee structure for Saranathan College of Engineering (${department} Dept - ${admissionType.toUpperCase()} Quota): Total Annual Fee = ₹${breakdown.grandTotalAnnual.toLocaleString()}. Generated on SaraConnect portal.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-black dark:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Breakdown on WhatsApp</span>
              </a>
            </div>

            <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center font-medium">
              Saranathan College Counseling Code: <strong>2615</strong> | Autonomous Institution
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};
