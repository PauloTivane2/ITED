import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { Carousel, CarouselItem } from '../shared/Carousel';
import { FadeUp, StaggerContainer, StaggerItem } from '../styles/effect/motionVariants';
import { useServices } from '@/shared/hooks';
import { ServiceCardSkeleton } from '@/shared/ui/Skeleton';
import { Clock, Calendar, Users, BookOpen, Flame, Heart, Sparkles, MapPin, ArrowRight } from 'lucide-react';

const getIconForDay = (day: string) => {
  const lowerDay = (day || '').toLowerCase();
  if (lowerDay.includes('segunda') || lowerDay.includes('intercess') || lowerDay.includes('oração')) {
    return <Flame className="w-5 h-5" />;
  }
  if (lowerDay.includes('quinta') || lowerDay.includes('ensino') || lowerDay.includes('doutrina')) {
    return <BookOpen className="w-5 h-5" />;
  }
  if (lowerDay.includes('sexta') || lowerDay.includes('mulher') || lowerDay.includes('família')) {
    return <Heart className="w-5 h-5" />;
  }
  if (lowerDay.includes('sábado') || lowerDay.includes('jejum') || lowerDay.includes('jovem')) {
    return <Sparkles className="w-5 h-5" />;
  }
  return <Users className="w-5 h-5" />;
};

export const ServiceTimes: React.FC = () => {
  const { services, isLoading } = useServices();

  return (
    <SectionContainer background="dark" id="horarios">
      {/* Section Header */}
      <FadeUp className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-2xs uppercase tracking-[0.22em] font-bold text-accent bg-accent/10 border border-accent/25 mb-4 shadow-subtle">
          <Calendar className="w-3.5 h-3.5" />
          <span>Programação Semanal</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
          Nossos <span className="font-serif italic font-normal text-accent">Cultos & Encontros</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Encontros estruturados para o fortalecimento espiritual, adoração genuína e comunhão fraterna na Tenda do Encontro.
        </p>
      </FadeUp>

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
          <ServiceCardSkeleton />
        </div>
      ) : (
        <>
          {/* Mobile: Horizontal Carousel */}
          <Carousel className="md:hidden -mx-4 pb-4" gap="gap-4" padding="px-4">
            {services.map((service) => {
              const isFeatured = (service.day || '').toLowerCase().includes('domingo');
              return (
                <CarouselItem key={service._id || service.name} className="min-w-[300px] max-w-[88vw]">
              <div className={`relative rounded-3xl p-7 flex flex-col justify-between h-full overflow-hidden transition-all duration-300 border ${
                isFeatured
                  ? 'bg-gradient-to-b from-[#111A30] to-[#0B101D] border-accent/40 shadow-glow'
                  : 'bg-[#0B101D] border-white/[0.08] shadow-dark-card'
              }`}>
                {/* Ambient Top Glow */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-accent/[0.07] rounded-full blur-2xl pointer-events-none" />

                <div>
                  {/* Top Meta Row */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      isFeatured ? 'bg-accent text-primary font-bold shadow-glow' : 'bg-accent/10 text-accent border border-accent/20'
                    }`}>
                      {getIconForDay(service.day)}
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-2xs font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border ${
                      isFeatured ? 'bg-accent/15 text-accent-light border-accent/40' : 'bg-white/[0.04] text-slate-300 border-white/10'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      {service.day}
                    </span>
                  </div>

                  {/* Title & Tag */}
                  <h3 className="text-xl font-bold text-white mb-2.5 tracking-tight leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Time Capsule */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-[#060911]/80 border border-white/[0.08] rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm font-bold text-white tracking-wide">{service.time}</span>
                    </div>
                    <span className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">
                      {service.modality || 'Presencial'}
                    </span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </Carousel>

      {/* Desktop: Enterprise Luxury Grid */}
      <StaggerContainer className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {services.map((service) => {
          const isFeatured = (service.day || '').toLowerCase().includes('domingo');
          return (
            <StaggerItem key={service._id || service.name} className="h-full">
              <div className={`relative group h-full rounded-3xl p-8 lg:p-9 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:-translate-y-1.5 border ${
                isFeatured
                  ? 'bg-gradient-to-b from-[#111A30] to-[#0B101D] border-accent/35 hover:border-accent shadow-dark-card hover:shadow-glow-lg'
                  : 'bg-gradient-to-b from-[#0E1528] to-[#0B101D] border-white/[0.08] hover:border-accent/40 shadow-dark-card hover:shadow-glow'
              }`}>
                {/* Ambient Glow Orbs */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-accent/[0.06] rounded-full blur-3xl group-hover:bg-accent/[0.14] transition-all duration-700 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/[0.03] rounded-full blur-2xl pointer-events-none" />

                {/* Top Section */}
                <div className="relative z-10">
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isFeatured
                        ? 'bg-accent text-primary shadow-glow group-hover:scale-105'
                        : 'bg-accent/10 text-accent border border-accent/20 group-hover:bg-accent group-hover:text-primary group-hover:border-accent group-hover:shadow-glow'
                    }`}>
                      {getIconForDay(service.day)}
                    </div>
                    
                    <span className={`inline-flex items-center gap-1.5 text-2xs font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border transition-colors ${
                      isFeatured
                        ? 'bg-accent/15 text-accent-light border-accent/40'
                        : 'bg-white/[0.04] text-slate-300 border-white/10 group-hover:border-accent/30 group-hover:text-accent'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      {service.day}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3.5 tracking-tight group-hover:text-accent transition-colors duration-300">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 font-normal line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Time Capsule & Location Badge */}
                <div className="relative z-10 pt-6 border-t border-white/[0.06] flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-[#060911]/90 border border-white/[0.08] group-hover:border-accent/30 group-hover:bg-[#060911] rounded-2xl px-5 py-3.5 transition-all duration-300 shadow-inner">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                        <Clock className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-white tracking-wide font-mono">
                        {service.time}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-2xs font-semibold text-slate-400 uppercase tracking-wider">
                      <span>{service.modality || 'Presencial'}</span>
                    </div>
                  </div>

                  {/* Subtle Sub-Footer Info */}
                  <div className="flex items-center justify-between text-2xs text-slate-500 px-1 pt-1">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-accent/80" />
                      Sede Matacuane
                    </span>
                    <a
                      href="#contato"
                      className="inline-flex items-center gap-1 text-accent hover:text-accent-light font-semibold transition-colors"
                    >
                      <span>Participar</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
        </>
      )}
    </SectionContainer>
  );
};

export default ServiceTimes;
