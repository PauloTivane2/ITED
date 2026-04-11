import React, { useState, useEffect } from 'react';
import { PageLayout } from '../../layouts/PageLayout';
import { FaChevronLeft, FaChevronRight, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { sanityClient, queries } from '../../cms/sanity/client';
import { SEO } from '@/shared/ui/SEO/SEO';

const MONTH_NAMES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const DAY_NAMES = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export const CalendarPage: React.FC = () => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch events from a bit before today to show slightly past ones in the current month if needed
        const startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        const result = await sanityClient.fetch(queries.upcomingEvents, { today: startDate });
        if (result) {
          setEvents(result);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDay(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const eventsThisMonth = events.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
  });

  const eventsByDate: Record<string, any[]> = {};
  events.forEach(e => {
    if (!eventsByDate[e.date]) eventsByDate[e.date] = [];
    eventsByDate[e.date].push(e);
  });

  const selectedEvents = selectedDate ? (eventsByDate[selectedDate] || []) : null;
  const upcomingEvents = events.filter(e => new Date(e.date) >= today).sort((a,b) => a.date.localeCompare(b.date));

  const pad = (n: number) => String(n).padStart(2, '0');
  const dateStr = (day: number) => `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`;

  return (
    <PageLayout>
      <SEO 
        title="Calendário de Eventos" 
        description="Fique por dentro de todos os eventos, cultos e programações especiais da ITED. Veja nossa agenda semanal e anual."
        canonical="/calendario"
      />
      {/* Hero */}
      <section className="relative bg-gradient-hero pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-c" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-c)" />
          </svg>
        </div>
        <div className="relative container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl">

          <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">Agenda</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5">
            Calendário <span className="font-serif italic font-medium text-accent">Completo</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Todos os eventos, cultos e programações da nossa comunidade num só lugar.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Calendar Widget */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-muted/40 shadow-sm overflow-hidden">
              {/* Calendar header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-muted/30">
                <button onClick={prevMonth} className="w-9 h-9 rounded-xl hover:bg-surface flex items-center justify-center text-secondary hover:text-primary transition-colors">
                  <FaChevronLeft className="w-4 h-4" />
                </button>
                <h2 className="font-bold text-lg text-primary">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </h2>
                <button onClick={nextMonth} className="w-9 h-9 rounded-xl hover:bg-surface flex items-center justify-center text-secondary hover:text-primary transition-colors">
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 border-b border-muted/20">
                {DAY_NAMES.map(d => (
                  <div key={d} className="py-3 text-center text-xs font-bold text-secondary/60 uppercase tracking-wider">{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="min-h-[72px] border-b border-r border-muted/10 last:border-r-0" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const ds = dateStr(day);
                  const hasEvent = !!eventsByDate[ds];
                  const isToday = ds === `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;
                  const isSelected = selectedDate === ds;
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(isSelected ? null : ds)}
                      className={`min-h-[72px] p-2 border-b border-r border-muted/10 text-left transition-colors relative group ${
                        isSelected
                          ? 'bg-accent/5 border-accent/20'
                          : 'hover:bg-surface'
                      } ${(i + firstDay + 1) % 7 === 0 ? 'border-r-0' : ''}`}
                    >
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors ${
                        isToday ? 'bg-gradient-accent text-white shadow-glow' :
                        isSelected ? 'bg-accent/10 text-accent' :
                        'text-primary group-hover:bg-accent/5 group-hover:text-accent'
                      }`}>
                        {day}
                      </span>
                      {hasEvent && (
                        <div className="flex gap-1 mt-1.5 flex-wrap">
                          {(eventsByDate[ds] || []).slice(0, 2).map((_, ei) => (
                            <span key={ei} className="w-1.5 h-1.5 rounded-full bg-accent" />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Day Events */}
            {selectedEvents !== null && (
              <div className="mt-6">
                <h3 className="font-bold text-primary mb-4 text-lg">
                  {selectedDate && `Eventos em ${new Date(selectedDate + 'T12:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}`}
                </h3>
                {selectedEvents.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-muted/30 p-8 text-center text-secondary">
                    Nenhum evento neste dia.
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {selectedEvents.map(e => (
                      <EventCard key={e._id} event={e} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* This month events */}
            {!selectedDate && eventsThisMonth.length > 0 && (
              <div className="mt-8">
                <h3 className="font-bold text-primary mb-4 text-lg">Eventos em {MONTH_NAMES[viewMonth]}</h3>
                <div className="flex flex-col gap-4">
                  {eventsThisMonth.map(e => <EventCard key={e._id} event={e} />)}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: upcoming */}
          <div>
            <h3 className="font-bold text-primary mb-6 text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              Próximos Eventos
            </h3>
            <div className="flex flex-col gap-4">
              {upcomingEvents.slice(0, 6).map(e => {
                const d = new Date(e.date + 'T12:00');
                return (
                  <div
                    key={e._id}
                    onClick={() => setSelectedDate(e.date)}
                    className="group bg-white rounded-2xl border border-muted/30 p-4 flex gap-4 items-start cursor-pointer hover:border-accent/20 hover:shadow-sm transition-all"
                  >
                    <div className="flex flex-col items-center justify-center bg-surface group-hover:bg-gradient-accent rounded-xl w-14 h-14 min-w-[56px] transition-all">
                      <span className="font-extrabold text-xl leading-none group-hover:text-white text-primary transition-colors">{d.getDate()}</span>
                      <span className="text-xs font-bold mt-0.5 tracking-wider group-hover:text-white/80 text-secondary transition-colors">{MONTH_NAMES[d.getMonth()].slice(0,3).toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${e.tagColor || 'bg-accent/10 text-accent'}`}>{e.tag}</span>
                      <h4 className="font-semibold text-sm text-primary mt-1 group-hover:text-accent transition-colors line-clamp-2">{e.title}</h4>
                      <div className="flex items-center gap-1 text-xs text-secondary mt-1">
                        <FaClock className="w-3 h-3" /> {e.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

function EventCard({ event }: { event: any }) {
  const d = new Date(event.date + 'T12:00');
  return (
    <div className="bg-white rounded-2xl border border-muted/30 p-5 flex gap-5 items-start hover:border-accent/20 hover:shadow-sm transition-all">
      <div className="flex flex-col items-center justify-center bg-surface rounded-2xl w-16 h-16 min-w-[64px]">
        <span className="font-extrabold text-xl leading-none text-primary">{d.getDate()}</span>
        <span className="text-xs font-bold mt-0.5 tracking-wider text-secondary">{MONTH_NAMES[d.getMonth()].slice(0,3).toUpperCase()}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${event.tagColor || 'bg-accent/10 text-accent'}`}>{event.tag}</span>
        </div>
        <h4 className="font-bold text-primary mb-1">{event.title}</h4>
        <p className="text-secondary text-sm leading-relaxed mb-2">{event.description}</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs text-secondary">
          <span className="flex items-center gap-1.5"><FaClock className="w-3.5 h-3.5 text-accent/50" />{event.time}</span>
          <span className="flex items-center gap-1.5"><FaMapMarkerAlt className="w-3.5 h-3.5 text-accent/50" />{event.location}</span>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
