import React, { useEffect, useState } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { FadeUp, SlideIn } from '../styles/effect/motionVariants';
import { Church, Globe, Heart } from 'lucide-react';
import { sanityClient, queries, urlFor } from '../cms/sanity/client';

export const AboutSection: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const result = await sanityClient.fetch(queries.about);
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };
    fetchAboutData();
  }, []);

  const getIcon = (title: string) => {
    const t = (title || '').toLowerCase();
    if (t.includes('visão')) return <Church className="w-5 h-5" />;
    if (t.includes('valor')) return <Heart className="w-5 h-5" />;
    if (t.includes('missão')) return <Globe className="w-5 h-5" />;
    return <Church className="w-5 h-5" />;
  };

  const image1 = data?.images?.[0] ? urlFor(data.images[0]).url() : "https://images.unsplash.com/photo-1437603568260-1950d3c00cb5?q=80&w=600&auto=format&fit=crop";
  const image2 = data?.images?.[1] ? urlFor(data.images[1]).url() : "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=600&auto=format&fit=crop";

  return (
    <SectionContainer background="dark" id="sobre">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Main Content Cluster (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full text-2xs uppercase tracking-[0.22em] font-bold text-accent bg-accent/10 border border-accent/25 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {data?.kicker || 'Nossa Trajetória & Fé'}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-5">
              {data?.titleLine1 || 'Fundada na'} <span className="text-accent font-serif italic font-normal">{data?.titleHighlight1 || 'Palavra'}</span>,<br />
              {data?.titleLine2 || 'Movida pelo'} <span className="text-accent font-serif italic font-normal">{data?.titleHighlight2 || 'Amor'}</span>.
            </h2>
            <div className="h-0.5 w-16 bg-gradient-accent rounded-full opacity-70" />
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-5 text-slate-300">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                {data?.leadParagraph || (
                  <>A <span className="text-accent font-bold">ITED</span> é um altar de adoração genuína e transformação espiritual dedicado a aproximar pessoas de Deus e manifestar o Seu Reino em Moçambique.</>
                )}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm leading-relaxed text-slate-400">
                <p>
                  {data?.paragraph1 || (
                    <>Sediada no <span className="font-semibold text-slate-200">Matacuane, Beira</span>, nossa congregação nasceu de um chamado profético. Sob a liderança do <span className="font-semibold text-slate-200">Apóstolo Rev. Clemente Raiva</span>, vivemos uma fé prática e acolhedora.</>
                  )}
                </p>
                <p>
                  {data?.paragraph2 || (
                    <>Acreditamos no poder restaurador do Evangelho. Nossa comunidade oferece um ambiente onde cada vida encontra acolhimento pastoral, ensino edificante e direção divina.</>
                  )}
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Pillar Cards (Vision, Values, Mission) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {(data?.pillars || [
              { title: 'Visão', description: 'Ser casa de adoração e restauração espiritual.' },
              { title: 'Valores', description: 'Comunhão, Santidade e Amor ao Próximo.' },
              { title: 'Missão', description: 'Edificar vidas e expandir o Reino de Deus.' }
            ]).map((item: any, idx: number) => (
              <FadeUp key={idx} delay={0.2 + idx * 0.08}>
                <div className="p-6 rounded-2xl bg-[#0B101D] border border-white/[0.08] hover:border-accent/40 transition-all duration-normal group hover:shadow-glow flex flex-col justify-between h-full">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-primary transition-all shrink-0">
                    {getIcon(item.title)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Image Grid (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
          <SlideIn direction="left" className="flex flex-col gap-4 pt-8">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] relative shadow-dark-card border border-white/[0.08]">
              <img src={image1} alt="Igreja adoração" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </SlideIn>
          
          <SlideIn direction="right" className="flex flex-col gap-4">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] relative shadow-dark-card border border-white/[0.08]">
              <img src={image2} alt="Comunidade unida" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="bg-[#0B101D] border border-white/[0.08] rounded-3xl p-6 text-white shadow-dark-card">
              <h4 className="text-2xl font-black text-white tracking-tight mb-1">{data?.statsNumber || '7+'}</h4>
              <p className="text-xs text-slate-400 leading-snug">{data?.statsLabel || 'Anos manifestando o amor de Deus e transformando vidas.'}</p>
            </div>
          </SlideIn>
        </div>
      </div>
    </SectionContainer>
  );
};
