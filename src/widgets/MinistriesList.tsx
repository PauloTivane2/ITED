import React, { useState, useEffect } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { Carousel, CarouselItem } from '../shared/Carousel';
import { sanityClient, queries } from '../cms/sanity/client';
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

const fallbackMinistries = [
  {
    _id: "m1",
    title: 'Ministério Infantil',
    description: 'Cuidando da próxima geração com princípios bíblicos sólidos, ambiente seguro, acolhimento pastoral e aprendizado prático da palavra de Deus.',
    image: '/images/ministries/ministry_children_1774776653967.png',
  },
  {
    _id: "m2",
    title: 'Jovens e Adolescentes',
    description: 'Encontros dinâmicos e mentoria bíblica para capacitar a juventude a viver com firmeza de propósito, fé e integridade nos desafios contemporâneos.',
    image: '/images/ministries/ministry_youth_1774776798722.png',
  },
  {
    _id: "m3",
    title: 'Ação Social',
    description: 'Impactando vidas em vulnerabilidade na comunidade através de campanhas solidárias, voluntariado, doações de alimentos e suporte humanitário contínuo.',
    image: '/images/ministries/ministry_social_1774777423721.png',
  },
  {
    _id: "m4",
    title: 'Louvor e Adoração',
    description: 'Conduzindo toda a congregação a um encontro profundo e transformador na presença de Deus através da música, artes e adoração genuína.',
    image: '/images/ministries/ministry_worship_1774776893962.png',
  },
  {
    _id: "m5",
    title: 'Intercessão',
    description: 'Guerreiros de oração que levantam clamor diário, cobertura espiritual permanente para as famílias, a liderança e o avivamento contínuo da nação.',
    image: '/images/ministries/ministry_prayer_1774777667476.png',
  },
  {
    _id: "m6",
    title: 'Casais e Família',
    description: 'Fortalecendo casamentos, aconselhamento conjugal e cultivando lares edificados sob os princípios sagrados da palavra de Deus.',
    image: '/images/ministries/ministry_worship_1774776893962.png',
  }
];

export const MinistriesList: React.FC = () => {
  const [data, setData] = useState<any[]>(fallbackMinistries);

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const result = await sanityClient.fetch(queries.ministries);
        if (result && result.length > 0) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching ministries:", error);
      }
    };
    fetchMinistries();
  }, []);

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
          className="hidden sm:inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-accent/10 border border-white/10 hover:border-accent/40 text-sm font-semibold text-slate-200 hover:text-white transition-all shrink-0 group shadow-subtle"
        >
          <span>Conhecer Todos os Ministérios</span>
          <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Mobile: Horizontal Carousel */}
      <Carousel className="sm:hidden -mx-4 pb-4" gap="gap-4" padding="px-4">
        {data.map((m) => (
          <CarouselItem
            key={m._id || m.title}
            className="w-[290px] max-w-[85vw] h-auto flex"
          >
            <div className="relative w-full min-h-[420px] rounded-3xl overflow-hidden shadow-dark-card bg-[#0B101D] flex flex-col justify-end flex-1 border border-white/[0.08]">
              <img
                src={m.image || '/images/ministries/ministry_worship_1774776893962.png'}
                alt={m.title}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060911] via-[#060911]/75 to-transparent" />
              
              {/* Top Icon */}
              <div className="absolute top-5 left-5 z-10">
                <div className="w-10 h-10 rounded-xl bg-[#060911]/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-accent shadow-subtle">
                  {getMinistryIcon(m.title)}
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative p-6 z-10 mt-auto">
                <div className="w-8 h-0.5 bg-accent mb-2.5 rounded-full" />
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  {m.title}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </Carousel>

      {/* Desktop: Enterprise Luxury Cards with Hover Expansion */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {data.map((m) => (
          <div 
            key={m._id || m.title} 
            className="group relative min-h-[440px] aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer bg-[#0B101D] shadow-dark-card hover:shadow-glow-lg border border-white/[0.08] hover:border-accent/50 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Background Image with Smooth Zoom */}
            <img 
              src={m.image || '/images/ministries/ministry_worship_1774776893962.png'} 
              alt={m.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.85] group-hover:brightness-90"
            />
            
            {/* Ambient Multi-Stop Vignette (Deepens smoothly on hover for flawless full-text contrast) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060911] via-[#060911]/80 to-transparent group-hover:from-[#060911]/98 group-hover:via-[#060911]/85 group-hover:to-[#060911]/30 transition-all duration-500 pointer-events-none" />
            
            {/* Top Icon Badge */}
            <div className="relative p-7 z-10 flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#060911]/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-accent shadow-subtle group-hover:bg-accent group-hover:text-primary group-hover:border-accent transition-all duration-300">
                {getMinistryIcon(m.title)}
              </div>
            </div>

            {/* Bottom Content Container (Reveals 100% full description seamlessly on hover) */}
            <div className="relative p-7 lg:p-8 z-10 mt-auto flex flex-col">
              <div className="transform transition-all duration-500 group-hover:-translate-y-1">
                {/* Gold Accent Line */}
                <div className="w-10 group-hover:w-16 h-0.5 bg-accent mb-3.5 rounded-full transition-all duration-500" />
                
                {/* Ministry Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2.5 tracking-tight group-hover:text-accent transition-colors duration-300 leading-snug">
                  {m.title}
                </h3>
                
                {/* Description: Clean default display, expands to 100% full text on hover without clipping */}
                <div className="relative overflow-hidden transition-all duration-500">
                  <p className="text-slate-300 text-sm leading-relaxed font-normal line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                    {m.description}
                  </p>
                </div>

                {/* Sub-Action Bar (Smoothly reveals on hover) */}
                <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-accent uppercase tracking-wider text-2xs">Engajar & Servir</span>
                  <span className="text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all flex items-center gap-1">
                    <span>Participar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default MinistriesList;
