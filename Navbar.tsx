import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AIAssistant } from './components/AIAssistant';
import { EventsSection } from './components/EventsSection';
import { FacultyDirectory } from './components/FacultyDirectory';
import { TimetableSection } from './components/TimetableSection';
import { RegistrationPortal } from './components/RegistrationPortal';
import { StudentDashboard } from './components/StudentDashboard';
import { ContactSection } from './components/ContactSection';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { LoginGateway } from './components/LoginGateway';
import { SaraSellMarketplace } from './components/SaraSellMarketplace';
import { FeeCalculator } from './components/FeeCalculator';

import { EventItem, FacultyMember, UserSession } from './types';
import { INITIAL_EVENTS, INITIAL_FACULTY } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [preselectedEventId, setPreselectedEventId] = useState<string | undefined>(undefined);

  // User session state with localStorage persistence
  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    try {
      const stored = localStorage.getItem('saraConnectSession');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [facultyList, setFacultyList] = useState<FacultyMember[]>(INITIAL_FACULTY);

  const handleLoginSuccess = (session: UserSession) => {
    setUserSession(session);
    try {
      localStorage.setItem('saraConnectSession', JSON.stringify(session));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    // If admin logged in, optionally open admin panel or stay on main page
    if (session.role === 'admin') {
      setIsAdminOpen(true);
    }
  };

  const handleLogout = () => {
    setUserSession(null);
    localStorage.removeItem('saraConnectSession');
    setActiveTab('home');
    setIsAdminOpen(false);
  };

  // Sync dark mode class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch initial data from backend API
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [eventsRes, facultyRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/faculty'),
      ]);

      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        if (Array.isArray(eventsData) && eventsData.length > 0) {
          setEvents(eventsData);
        }
      }

      if (facultyRes.ok) {
        const facultyData = await facultyRes.json();
        if (Array.isArray(facultyData) && facultyData.length > 0) {
          setFacultyList(facultyData);
        }
      }
    } catch (err) {
      console.warn('Using local fallback data:', err);
    }
  };

  const handleOpenRegistration = (eventId?: string) => {
    if (eventId) {
      setPreselectedEventId(eventId);
    }
    setActiveTab('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user is not authenticated, display the Student/Admin Login Gateway page
  if (!userSession) {
    return (
      <LoginGateway
        onLoginSuccess={handleLoginSuccess}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-black dark:text-slate-100 flex flex-col transition-colors duration-300">
      
      {/* Glassmorphism Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenRegistration={handleOpenRegistration}
        userSession={userSession}
        onLogout={handleLogout}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        
        {activeTab === 'home' && (
          <>
            <HeroSection
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenRegistration={handleOpenRegistration}
            />
            <EventsSection
              events={events}
              onOpenRegistration={handleOpenRegistration}
            />
            <FacultyDirectory facultyList={facultyList.slice(0, 3)} />
            <ContactSection />
          </>
        )}

        {activeTab === 'ai-assistant' && (
          <AIAssistant />
        )}

        {activeTab === 'sarasell' && (
          <SaraSellMarketplace />
        )}

        {activeTab === 'fee-calculator' && (
          <FeeCalculator />
        )}

        {activeTab === 'events' && (
          <EventsSection
            events={events}
            onOpenRegistration={handleOpenRegistration}
          />
        )}

        {activeTab === 'faculty' && (
          <FacultyDirectory facultyList={facultyList} />
        )}

        {activeTab === 'timetable' && (
          <TimetableSection />
        )}

        {activeTab === 'register' && (
          <RegistrationPortal
            events={events}
            preselectedEventId={preselectedEventId}
            onRegistrationSuccess={() => {
              // Refresh data after registration
              loadData();
            }}
          />
        )}

        {activeTab === 'dashboard' && (
          <StudentDashboard
            onNavigateToAI={() => {
              setActiveTab('ai-assistant');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToEvents={() => {
              setActiveTab('events');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToSaraSell={() => {
              setActiveTab('sarasell');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}

      </main>

      {/* Admin Panel Modal Dialog */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        events={events}
        facultyList={facultyList}
        onRefreshData={loadData}
      />

      {/* Glassmorphism Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

    </div>
  );
}
