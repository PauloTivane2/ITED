import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';

const events = [
  {
    id: 1,
    date: '15',
    month: 'ABR',
    title: 'Conferência de Jovens 2026',
    time: 'Sábado, 14:00',
    location: 'Templo Principal',
    tag: 'Destaque',
    tagColor: 'bg-accent/10 text-accent',
  },
  {
    id: 2,
    date: '22',
    month: 'ABR',
    title: 'Café de Mulheres Virtuosas',
    time: 'Sábado, 09:00',
    location: 'Salão de Eventos',
    tag: 'Inscrições abertas',
    tagColor: 'bg-highlight/10 text-highlight',
  },
  {
    id: 3,
    date: '05',
    month: 'MAI',
    title: 'Batismo nas Águas e Confraternização',
    time: 'Domingo, 09:00',
    location: 'Chácara Peniel',
    tag: 'Especial',
    tagColor: 'bg-warm/10 text-warm',
  }
];

export const EventsSection: React.FC = () => {
  return (
    <SectionContainer background="surface" id="eventos">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left: Content */}
        <div className="flex-1 lg:max-w-md">
          <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">Agenda</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-6 tracking-tight">
            Próximos <span className="font-serif italic font-medium text-accent">Eventos</span>
          </h2>
          <p className="text-secondary text-lg mb-8 leading-relaxed">
            Fique por dentro de tudo o que acontece na comunidade. Eventos são oportunidades para comunhão, crescimento e celebração.
          </p>
          <a 
            href="#calendario" 
            className="inline-flex items-center gap-3 px-7 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-normal hover:shadow-medium group"
          >
            Ver Calendário Completo
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Right: Event List */}
        <div className="flex-1 flex flex-col gap-4">
          {events.map((event) => (
            <div 
              key={event.id}
              className="group bg-white rounded-2xl border border-muted/40 p-5 sm:p-6 flex gap-5 sm:gap-6 items-start hover:border-accent/20 hover:shadow-medium cursor-pointer transition-all duration-normal"
            >
              {/* Date Badge */}
              <div className="flex flex-col items-center justify-center bg-surface group-hover:bg-gradient-accent group-hover:text-white rounded-2xl w-[72px] h-[72px] min-w-[72px] transition-all duration-normal">
                <span className="font-extrabold text-2xl leading-none group-hover:text-white text-primary transition-colors">{event.date}</span>
                <span className="text-xs font-bold mt-1 tracking-wider group-hover:text-white/80 text-secondary transition-colors">{event.month}</span>
              </div>
              
              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${event.tagColor}`}>{event.tag}</span>
                </div>
                <h3 className="font-bold text-lg text-primary mb-2 group-hover:text-accent transition-colors truncate">
                  {event.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-secondary">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-secondary/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </div>
                  <span className="hidden sm:block w-1 h-1 rounded-full bg-muted" />
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-secondary/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                    </svg>
                    {event.location}
                  </div>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="hidden sm:flex items-center text-muted group-hover:text-accent transition-all duration-fast pr-1 self-center">
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};
