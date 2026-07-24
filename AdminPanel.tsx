import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Users, Clock, Filter, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Share2, Info } from 'lucide-react';
import { EventItem } from '../types';

interface EventsSectionProps {
  events: EventItem[];
  onOpenRegistration: (eventId: string, eventTitle: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events, onOpenRegistration }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);

  // Countdown timer calculation for AARAMBH orientation
  const targetDate = new Date('2026-08-05T09:30:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Workshop', 'Club'];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Event Countdown Hero Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 mb-10 border border-emerald-500/20 shadow-2xl relative overflow-hidden bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-teal-950/60 text-white">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              <span>NEXT MEGA CAMPUS EVENT</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              AARAMBH 2026 – Freshers Orientation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
              Official Welcome Ceremony for the Batch of 2026-2030. Keynote address, student performance spotlights, and freshers talents showcase at JS Block Main Auditorium.
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-3 text-center">
            <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl px-3.5 py-2.5 min-w-[68px]">
              <div className="font-heading font-extrabold text-2xl text-emerald-400">{timeLeft.days}</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Days</div>
            </div>
            <span className="text-xl font-bold text-emerald-500">:</span>
            <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl px-3.5 py-2.5 min-w-[68px]">
              <div className="font-heading font-extrabold text-2xl text-emerald-400">{timeLeft.hours}</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Hours</div>
            </div>
            <span className="text-xl font-bold text-emerald-500">:</span>
            <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl px-3.5 py-2.5 min-w-[68px]">
              <div className="font-heading font-extrabold text-2xl text-emerald-400">{timeLeft.minutes}</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Mins</div>
            </div>
            <span className="text-xl font-bold text-emerald-500">:</span>
            <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl px-3.5 py-2.5 min-w-[68px]">
              <div className="font-heading font-extrabold text-2xl text-emerald-400">{timeLeft.seconds}</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Secs</div>
            </div>
          </div>
        </div>

      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, workshops, hackathons..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="glass-card rounded-3xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
          >
            {/* Event Image Banner */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-800">
              <img
                src={evt.image}
                alt={evt.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                {evt.category}
              </div>

              {evt.featured && (
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 shadow">
                  FEATURED
                </div>
              )}

              <div className="absolute bottom-3 left-3 text-white font-semibold text-xs flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{evt.date}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-500 transition-colors">
                  {evt.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                <div className="mt-4 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    <span>{evt.registeredCount} / {evt.capacity} registered</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setSelectedEventModal(evt)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Details</span>
                </button>

                <button
                  onClick={() => onOpenRegistration(evt.id, evt.title)}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Register Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 glass-card rounded-3xl border border-slate-200 dark:border-slate-800">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="font-heading font-bold text-slate-800 dark:text-slate-200 text-lg">
            No events found matching your filter
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or selecting a different category.
          </p>
        </div>
      )}

      {/* Event Details Popup Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl max-w-lg w-full overflow-hidden border border-emerald-500/30 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative h-48 w-full bg-slate-900">
              <img
                src={selectedEventModal.image}
                alt={selectedEventModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedEventModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 text-white flex items-center justify-center hover:bg-rose-600 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
                {selectedEventModal.category}
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                {selectedEventModal.title}
              </h3>

              <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedEventModal.description}
              </p>

              <div className="mt-5 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span><strong>Date:</strong> {selectedEventModal.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-500" />
                  <span><strong>Time:</strong> {selectedEventModal.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span><strong>Venue:</strong> {selectedEventModal.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-500" />
                  <span><strong>Organizer:</strong> {selectedEventModal.organizer}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setSelectedEventModal(null)}
                  className="flex-1 py-3 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const evt = selectedEventModal;
                    setSelectedEventModal(null);
                    onOpenRegistration(evt.id, evt.title);
                  }}
                  className="flex-1 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-md cursor-pointer"
                >
                  Register Now
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
