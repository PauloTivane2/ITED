import React, { useState, useEffect } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { IframeModal } from '../shared/IframeModal';
import { sanityClient, queries } from '../cms/sanity/client';

// Initial fallback mock data
const fallbackEvents = [
  {
    _id: "e1",
    date: '2026-04-15',
    title: 'Conferência de Jovens 2026',
    time: '14:00',
    location: 'Templo Principal',
    tag: 'Destaque',
    tagColor: 'accent',
  },
  {
    _id: "e2",
    date: '2026-04-22',
    title: 'Café de Mulheres Virtuosas',
    time: '09:00',
    location: 'Salão de Eventos',
    tag: 'Inscrições abertas',
    tagColor: 'highlight',
  },
  {
    _id: "e3",
    date: '2026-05-05',
    title: 'Batismo nas Águas e Confraternização',
    time: '09:00',
    location: 'Chácara Peniel',
    tag: 'Especial',
    tagColor: 'warm',
  }
];

export const EventsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<any[]>(fallbackEvents);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await sanityClient.fetch(queries.featuredEvents);
        if (result && result.length > 0) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const formatDateInfo = (dateString: string) => {
    if (!dateString) return { day: '00', month: '---' };
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate() + 1).padStart(2, '0'); // +1 to offset general timezone issues if just YYYY-MM-DD
    const month = dateObj.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
    return { day, month };
  };

  const getTagColorClass = (color: string) => {
    switch (color) {
      case 'accent': return 'bg-accent/10 text-accent';
      case 'highlight': return 'bg-highlight/10 text-highlight';
      case 'warm': return 'bg-warm/10 text-warm';
      case 'primary': return 'bg-primary/10 text-primary';
      default: return 'bg-accent/10 text-accent';
    }
  };

  return (
    <SectionContainer background="surface" id="eventos">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left: Content */}
        <div className="flex-1 lg:max-w-md">
          <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">Agenda</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4 sm:mb-6 tracking-tight">
            Próximos <span className="font-serif italic font-medium text-accent">Eventos</span>
          </h2>
          <p className="text-secondary text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed font-verse">
            Fique por dentro de tudo o que acontece na comunidade. Eventos são oportunidades para comunhão, crescimento e celebração.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="inline-flex items-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-normal hover:shadow-medium group min-h-[48px] active:scale-95"
          >
            Ver Calendário Completo
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Right: Event List */}
        <div className="flex-1 flex flex-col gap-4">
          {data.map((event) => {
            const { day, month } = formatDateInfo(event.date);
            return (
              <div 
                key={event._id}
                className="group bg-white rounded-2xl border border-muted/40 p-4 sm:p-5 md:p-6 flex gap-4 sm:gap-5 md:gap-6 items-start hover:border-accent/20 hover:shadow-medium cursor-pointer transition-all duration-normal active:scale-[0.98]"
              >
                {/* Date Badge */}
                <div className="flex flex-col items-center justify-center bg-surface group-hover:bg-gradient-accent group-hover:text-white rounded-2xl w-[60px] h-[60px] min-w-[60px] sm:w-[72px] sm:h-[72px] sm:min-w-[72px] transition-all duration-normal">
                  <span className="font-extrabold text-2xl leading-none group-hover:text-white text-primary transition-colors">{day}</span>
                  <span className="text-xs font-bold mt-1 tracking-wider group-hover:text-white/80 text-secondary transition-colors">{month}</span>
                </div>
                
                {/* Event Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getTagColorClass(event.tagColor)}`}>{event.tag || 'Evento'}</span>
                  </div>
                  <h3 className="font-bold text-lg text-primary mb-2 group-hover:text-accent transition-colors truncate font-verse">
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
            );
          })}
        </div>
      </div>
      <IframeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} url="/calendario" title="Calendário de Eventos" />
    </SectionContainer>
  );
};
