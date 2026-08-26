import React, { useState, useEffect } from 'react';
import { PageLayout } from '../../layouts/PageLayout';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { sanityClient, queries } from '../../cms/sanity/client';
import { CalendarSkeleton } from '@/shared/ui/Skeleton';
import { SEO } from '@/shared/ui/SEO/SEO';
import { Breadcrumbs } from '@/shared/ui/Navigation/Breadcrumbs';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      try {
        const startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        const result = await sanityClient.fetch(queries.upcomingEvents, { today: startDate });
        if (isMounted && result) {
          setEvents(result);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchEvents();
    return () => {
      isMounted = false;
    };
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
      <section className="bg-[#060911] pt-32 sm:pt-36 pb-16 relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="relative container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl z-10">
          <Breadcrumbs items={[{ label: 'Calendário de Eventos' }]} />

          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-2xs uppercase tracking-[0.22em] font-bold text-accent bg-accent/10 border border-accent/25 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Agenda & Programações
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Calendário <span className="font-serif italic font-normal text-accent">Geral</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Acompanhe todos os eventos, cultos e programações da nossa comunidade num só lugar.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-16">
        {isLoading ? (
          <CalendarSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Calendar Widget */}
          <div className="lg:col-span-2">
            <div className="bg-[#0B101D] rounded-3xl border border-white/[0.08] shadow-dark-card overflow-hidden">
              {/* Calendar header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] bg-white/[0.02]">
                <button onClick={prevMonth} className="w-10 h-10 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h2 className="font-bold text-lg text-white tracking-tight">
                  {MONTH_NAMES[viewMonth]} <span className="text-accent font-serif italic">{viewYear}</span>
                </h2>
                <button onClick={nextMonth} className="w-10 h-10 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 border-b border-white/[0.06] bg-white/[0.01]">
                {DAY_NAMES.map(d => (
                  <div key={d} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="min-h-[76px] border-b border-r border-white/[0.04] last:border-r-0 bg-white/[0.01]" />
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
                      className={`min-h-[76px] p-2 sm:p-2.5 border-b border-r border-white/[0.04] text-left transition-colors relative group ${
                        isSelected
                          ? 'bg-accent/10'
                          : 'hover:bg-white/[0.03]'
                      } ${(i + firstDay + 1) % 7 === 0 ? 'border-r-0' : ''}`}
                    >
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-sm font-semibold transition-all ${
                        isToday ? 'bg-gradient-accent text-white shadow-glow' :
                        isSelected ? 'bg-accent text-primary font-bold' :
                        'text-slate-300 group-hover:bg-accent/10 group-hover:text-accent'
                      }`}>
                        {day}
                      </span>
                      {hasEvent && (
                        <div className="flex gap-1 mt-1.5 flex-wrap">
                          {(eventsByDate[ds] || []).slice(0, 3).map((_, ei) => (
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
              <div className="mt-8">
                <h3 className="font-bold text-white mb-4 text-lg">
                  {selectedDate && `Eventos em ${new Date(selectedDate + 'T12:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}`}
                </h3>
                {selectedEvents.length === 0 ? (
                  <div className="bg-[#0B101D] rounded-2xl border border-white/[0.08] p-8 text-center text-slate-400 text-sm">
                    Nenhum evento agendado para este dia.
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
                <h3 className="font-bold text-white mb-4 text-lg">Eventos em {MONTH_NAMES[viewMonth]}</h3>
                <div className="flex flex-col gap-4">
                  {eventsThisMonth.map(e => <EventCard key={e._id} event={e} />)}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: upcoming */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
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
                    className="group bg-[#0B101D] rounded-2xl border border-white/[0.08] p-4 flex gap-4 items-start cursor-pointer hover:border-accent/40 hover:shadow-glow transition-all duration-normal"
                  >
                    <div className="flex flex-col items-center justify-center bg-white/[0.04] border border-white/10 group-hover:bg-gradient-accent rounded-xl w-14 h-14 min-w-[56px] transition-all">
                      <span className="font-extrabold text-xl leading-none group-hover:text-primary text-white transition-colors">{d.getDate()}</span>
                      <span className="text-[10px] font-bold mt-0.5 tracking-wider group-hover:text-primary/80 text-accent uppercase transition-colors">{MONTH_NAMES[d.getMonth()].slice(0,3)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 inline-block uppercase tracking-wider">{e.tag || 'Evento'}</span>
                      <h4 className="font-bold text-sm text-white mt-1 group-hover:text-accent transition-colors line-clamp-2">{e.title}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                        <Clock className="w-3.5 h-3.5 text-accent" /> {e.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        )}
      </section>
    </PageLayout>
  );
};

function EventCard({ event }: { event: any }) {
  const d = new Date(event.date + 'T12:00');
  return (
    <div className="bg-[#0B101D] rounded-2xl border border-white/[0.08] p-5 flex gap-5 items-start hover:border-accent/40 hover:shadow-glow transition-all duration-normal">
      <div className="flex flex-col items-center justify-center bg-white/[0.04] rounded-2xl w-16 h-16 min-w-[64px] border border-white/10">
        <span className="font-extrabold text-2xl leading-none text-white">{d.getDate()}</span>
        <span className="text-[11px] font-bold mt-1 tracking-wider text-accent">{MONTH_NAMES[d.getMonth()].slice(0,3).toUpperCase()}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 uppercase tracking-wider">{event.tag || 'Evento'}</span>
        </div>
        <h4 className="font-bold text-white text-base mb-1">{event.title}</h4>
        {event.description && <p className="text-slate-400 text-sm leading-relaxed mb-3">{event.description}</p>}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-accent" />{event.time}</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent" />{event.location}</span>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
