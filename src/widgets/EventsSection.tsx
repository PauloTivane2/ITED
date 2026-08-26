import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { useFeaturedEvents } from '@/shared/hooks';
import { EventCardSkeleton } from '@/shared/ui/Skeleton';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, Bell } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const { events, isLoading } = useFeaturedEvents();

  const formatDateInfo = (dateString: string) => {
    if (!dateString) return { day: '15', month: 'ABR' };
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return { day: '15', month: 'ABR' };
    const day = String(dateObj.getDate() + 1).padStart(2, '0');
    const month = dateObj.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
    return { day, month };
  };

  return (
    <SectionContainer background="dark" id="eventos">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left: Content & Context (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6 sm:gap-8">
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-2xs uppercase tracking-[0.22em] font-bold text-accent bg-accent/10 border border-accent/25 mb-4 shadow-subtle">
              <Calendar className="w-3.5 h-3.5" />
              <span>Agenda Ministerial</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
              Próximos <span className="font-serif italic font-normal text-accent">Eventos</span>
            </h2>
            
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-6">
              Acompanhe as conferências, seminários e celebrações especiais agendadas na nossa comunidade. Reserve as datas e participe.
            </p>

            {/* Notice Card */}
            <div className="bg-[#080D1A]/70 backdrop-blur-xl border border-[#C59B27]/20 rounded-3xl p-5 sm:p-6 mb-6 relative overflow-hidden shadow-dark-card">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0 mt-0.5 shadow-subtle">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Avisos & Inscrições</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Para conferências e retiros, entre em contato com a liderança ou através dos nossos canais oficiais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <a 
            href="/calendario" 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-[#FFF5DC]/30 bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#B3881E] text-[#05070E] font-bold shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 transition-all duration-normal group self-start active:scale-98 text-sm"
          >
            <span>Ver Calendário Completo</span>
            <ArrowRight className="w-4 h-4 text-[#05070E] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Right: Event List Cards (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {isLoading ? (
            <>
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </>
          ) : (
            events.map((event) => {
              const { day, month } = formatDateInfo(event.date);
              const title = event.title || 'Evento Especial ITED';
              const time = event.time || '17:30';
              const location = event.location || 'Sede Matacuane, Beira';
              const tag = event.tag || 'Destaque';
              
              return (
                <a 
                  key={event._id || title}
                  href="/calendario"
                  className="group bg-[#080D1A]/70 backdrop-blur-xl rounded-3xl border border-[#C59B27]/15 p-5 sm:p-6 flex gap-4 sm:gap-6 items-center hover:border-[#C59B27]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(197,155,39,0.15)] cursor-pointer transition-all duration-300 active:scale-[0.99]"
                >
                {/* Metallic Date Badge - Fixed Compact Dimensions */}
                <div className="flex flex-col items-center justify-center bg-white/[0.04] border border-white/10 group-hover:border-accent/30 group-hover:bg-accent/10 rounded-2xl w-16 h-16 min-w-[64px] sm:w-20 sm:h-20 sm:min-w-[80px] transition-all duration-normal shrink-0">
                  <span className="font-extrabold text-2xl sm:text-3xl leading-none text-white group-hover:text-accent font-mono transition-colors">
                    {day}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold mt-1 tracking-wider text-accent uppercase font-sans">
                    {month}
                  </span>
                </div>
                
                {/* Event Details */}
                <div className="flex-1 min-w-0">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-2xs font-bold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-accent" />
                      {tag}
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-white mb-2 group-hover:text-accent transition-colors truncate">
                    {title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{time}</span>
                    </div>
                    <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="truncate">{location}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow Action */}
                <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-accent group-hover:border-accent/40 transition-all shrink-0">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            );
          }))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default EventsSection;
