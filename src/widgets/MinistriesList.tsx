import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { Carousel, CarouselItem } from '../shared/Carousel';
import { useMinistries } from '@/shared/hooks';
import { MinistryCardSkeleton } from '@/shared/ui/Skeleton';
import { ArrowRight, Baby, Flame, HandHeart, Music, Sparkles, Users, Heart } from 'lucide-react';

const getMinistryIcon = (title: string) => {
  const t = (title || '').toLowerCase();
  if (t.includes('infantil') || t.includes('criança')) return <Baby className="w-5 h-5" />;
  if (t.includes('jovem') || t.includes('adolescente')) return <Flame className="w-5 h-5" />;
  if (t.includes('social') || t.includes('ajuda') || t.includes('comunidade')) return <HandHeart className="w-5 h-5" />;
  if (t.includes('louvor') || t.includes('música') || t.includes('adoração')) return <Music className="w-5 h-5" />;
  if (t.includes('oração') || t.includes('intercessão')) return <Sparkles className="w-5 h-5" />;
  if (t.includes('casal') || t.includes('família')) return <Heart className="w-5 h-5" />;
  return <Users className="w-5 h-5" />;
};

export const MinistriesList: React.FC = () => {
  const { ministries, isLoading } = useMinistries();

  return (
    <SectionContainer background="dark" id="ministerios">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-2xs uppercase tracking-[0.22em] font-bold text-accent bg-accent/10 border border-accent/25 mb-4 shadow-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Serviço & Comunhão</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Nossos <span className="font-serif italic font-normal text-accent">Ministérios</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Cada ministério é uma oportunidade de servir com excelência, desenvolver seus dons e impactar vidas no Reino de Deus.
          </p>
        </div>
        
        <a 
          href="/ministerios" 
          className="hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#0A1020]/80 hover:bg-[#121B32]/90 border border-white/[0.12] hover:border-[#D4AF37]/50 text-xs font-semibold text-slate-200 hover:text-white transition-all duration-200 shrink-0 group shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        >
          <span>Conhecer Todos os Ministérios</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <MinistryCardSkeleton />
          <MinistryCardSkeleton />
          <MinistryCardSkeleton />
        </div>
      ) : (
        <>
          {/* Mobile: Horizontal Carousel */}
          <Carousel className="sm:hidden -mx-4 pb-4" gap="gap-4" padding="px-4">
            {ministries.map((m) => (
              <CarouselItem
                key={m._id || m.title}
                className="w-[300px] max-w-[85vw] h-auto flex"
              >
                <div className="group relative w-full min-h-[420px] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)] bg-[#080E1C]/80 border border-white/[0.10] flex flex-col justify-between flex-1">
                  <img
                    src={m.image || '/images/ministries/ministry_worship_1774776893962.png'}
                    alt={m.title}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.80]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-[#060A14]/75 to-transparent pointer-events-none" />
                  
                  {/* Top Badge */}
                  <div className="relative p-5 z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#05070E]/80 backdrop-blur-md border border-white/[0.12] text-accent text-2xs font-bold uppercase tracking-wider shadow-subtle">
                      {getMinistryIcon(m.title)}
                      <span>Ministério</span>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative p-6 z-10 mt-auto flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {m.title}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                      {m.description}
                    </p>
                    <div className="pt-3 mt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold">
                      <span className="text-2xs text-slate-400 uppercase tracking-wider">Atuação</span>
                      <span className="text-accent flex items-center gap-1">
                        <span>Participar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>

          {/* Desktop: Enterprise Luxury Cards with Precision Layout */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {ministries.map((m) => (
              <div 
                key={m._id || m.title} 
                className="group relative min-h-[440px] aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer bg-[#080E1C]/80 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_24px_rgba(212,175,55,0.14)] border border-white/[0.10] hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Background Image with Smooth Zoom */}
                <img 
                  src={m.image || '/images/ministries/ministry_worship_1774776893962.png'} 
                  alt={m.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.80] group-hover:brightness-90"
                />
                
                {/* Ambient Multi-Stop Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-[#060A14]/75 to-transparent/10 group-hover:from-[#060A14]/95 group-hover:via-[#060A14]/80 group-hover:to-transparent/20 transition-all duration-300 pointer-events-none" />
                
                {/* Top Badge */}
                <div className="relative p-6 z-10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#05070E]/80 backdrop-blur-md border border-white/[0.12] text-[#D4AF37] text-2xs font-semibold uppercase tracking-[0.14em] shadow-subtle group-hover:border-[#D4AF37]/40 transition-colors">
                    {getMinistryIcon(m.title)}
                    <span>Ministério</span>
                  </div>
                </div>

                {/* Bottom Content Container */}
                <div className="relative p-6 lg:p-7 z-10 mt-auto flex flex-col">
                  <div className="transform transition-all duration-300 group-hover:-translate-y-0.5">
                    {/* Ministry Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-200 leading-snug">
                      {m.title}
                    </h3>
                    
                    {/* Description */}
                    <div className="relative overflow-hidden transition-all duration-300 mb-4">
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        {m.description}
                      </p>
                    </div>

                    {/* Sub-Action Bar */}
                    <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-medium">
                      <span className="text-2xs font-semibold text-slate-400 uppercase tracking-[0.12em]">Servir & Comunhão</span>
                      <span className="text-slate-200 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all flex items-center gap-1.5 font-semibold">
                        <span>Participar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </SectionContainer>
  );
};

export default MinistriesList;
