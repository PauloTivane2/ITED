import React, { useEffect, useState } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { Card } from '../shared/Card';
import { Carousel, CarouselItem } from '../shared/Carousel';
import { FadeUp, StaggerContainer, StaggerItem } from '../styles/effect/motionVariants';
import { sanityClient, queries } from '../cms/sanity/client';

// Keep icons mapping since Sanity doesn't store the exact SVG component
const getIconForDay = (day: string) => {
  const lowerDay = day.toLowerCase();
  if (lowerDay.includes('segunda') || lowerDay.includes('intercess')) {
    return (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253" />
      </svg>
    );
  }
  if (lowerDay.includes('quinta') || lowerDay.includes('ensino')) {
    return (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    );
  }
  if (lowerDay.includes('sexta') || lowerDay.includes('mulher')) {
    return (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    );
  }
  if (lowerDay.includes('sábado') || lowerDay.includes('jejum')) {
    return (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );
};

const getColorClass = (theme: string, type: 'gradient' | 'text') => {
  if (type === 'gradient') {
    switch (theme) {
      case 'accent': return 'from-accent/10 to-accent/5';
      case 'warm': return 'from-warm/10 to-warm/5';
      case 'highlight': return 'from-highlight/10 to-highlight/5';
      default: return 'from-accent/10 to-accent/5';
    }
  } else {
    switch (theme) {
      case 'accent': return 'text-accent';
      case 'warm': return 'text-warm';
      case 'highlight': return 'text-highlight';
      default: return 'text-accent';
    }
  }
}

// Fallback initial data
const fallbackServices = [
  {
    _id: 'fallback-1',
    day: 'Domingo',
    name: 'Culto de Adoração',
    time: '09:00 — 12:30',
    description: 'Momento especial de adoração, louvor e ministração da palavra.',
    colorTheme: 'accent',
  }
];

export const ServiceTimes: React.FC = () => {
  const [data, setData] = useState<any[]>(fallbackServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceTimes = async () => {
      try {
        const result = await sanityClient.fetch(queries.serviceTimes);
        if (result && result.length > 0) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching service times:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceTimes();
  }, []);

  return (
    <SectionContainer background="surface" id="horarios">
      {/* Section Header */}
      <FadeUp className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
        <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-3 sm:mb-4">Programação</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4 sm:mb-5 tracking-tight">
          Nossos <span className="font-serif italic font-medium text-accent">Horários</span>
        </h2>
        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          Temos encontros semanais pensados para edificar sua vida. Escolha o melhor horário e venha estar conosco.
        </p>
      </FadeUp>

      {/* Mobile: Horizontal Carousel | Desktop: Grid */}
      <Carousel className="md:hidden -mx-4 pb-4" gap="gap-4" padding="px-4">
        {data.map((service) => (
          <CarouselItem key={service._id} className="min-w-[280px] max-w-[85vw]">
            <Card hoverable glowing className="group p-0 h-full">
              <div className={`h-1.5 bg-gradient-to-r ${getColorClass(service.colorTheme, 'gradient')}`} />
              <div className="p-6 flex flex-col gap-4 h-full">
                <div className={`w-12 h-12 bg-gradient-to-br ${getColorClass(service.colorTheme, 'gradient')} rounded-2xl flex items-center justify-center ${getColorClass(service.colorTheme, 'text')} group-hover:scale-110 transition-transform duration-normal`}>
                  {getIconForDay(service.day)}
                </div>
                <div>
                  <div className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 ${getColorClass(service.colorTheme, 'text')}`}>{service.day}</div>
                  <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">{service.name}</h3>
                  <p className="text-secondary leading-relaxed text-sm">{service.description}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-muted/50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center">
                    <svg className="w-4 h-4 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-bold text-primary">{service.time}</span>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </Carousel>

      {/* Desktop: Grid */}
      <StaggerContainer className="hidden md:grid md:grid-cols-3 gap-5 lg:gap-8">
        {data.map((service) => (
          <StaggerItem key={service._id}>
            <Card hoverable glowing className="group p-0 h-full">
              {/* Gradient top bar */}
              <div className={`h-1.5 bg-gradient-to-r ${getColorClass(service.colorTheme, 'gradient')}`} />
              
              <div className="p-6 lg:p-10 flex flex-col gap-5 h-full">
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${getColorClass(service.colorTheme, 'gradient')} rounded-2xl flex items-center justify-center ${getColorClass(service.colorTheme, 'text')} group-hover:scale-110 transition-transform duration-normal`}>
                  {getIconForDay(service.day)}
                </div>
                
                {/* Content */}
                <div>
                  <div className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 ${getColorClass(service.colorTheme, 'text')}`}>{service.day}</div>
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">{service.name}</h3>
                  <p className="text-secondary leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
                
                {/* Time footer */}
                <div className="mt-auto pt-6 border-t border-muted/50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center">
                    <svg className="w-4 h-4 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-bold text-primary">{service.time}</span>
                </div>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionContainer>
  );
};
