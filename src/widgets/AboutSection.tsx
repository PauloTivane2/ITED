import React, { useEffect, useState } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { FadeUp, SlideIn } from '../styles/effect/motionVariants';
import { FaChurch, FaGlobe, FaHeart } from 'react-icons/fa';
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
    const t = title.toLowerCase();
    if (t.includes('visão')) return <FaChurch />;
    if (t.includes('valor')) return <FaHeart />;
    if (t.includes('missão')) return <FaGlobe />;
    return <FaChurch />;
  };

  const image1 = data?.images?.[0] ? urlFor(data.images[0]).url() : "https://images.unsplash.com/photo-1437603568260-1950d3c00cb5?q=80&w=600&auto=format&fit=crop";
  const image2 = data?.images?.[1] ? urlFor(data.images[1]).url() : "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=600&auto=format&fit=crop";

  return (
    <SectionContainer background="white" id="sobre">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text Content */}
          {/* Main Content Cluster */}
          <div className="flex flex-col gap-10">
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[1.5px] bg-accent" />
                <span className="text-kicker">{data?.kicker || 'Excelência & Fé'}</span>
              </div>
              <h2 className="text-h2 text-primary mb-6">
                {data?.titleLine1 || 'Fundada na'} <span className="text-accent font-medium font-verse">{data?.titleHighlight1 || 'Palavra'}</span>,<br />
                {data?.titleLine2 || 'Movida pelo'} <span className="text-accent font-medium font-verse">{data?.titleHighlight2 || 'Amor'}</span>.
              </h2>
              <div className="h-1 w-20 bg-gradient-accent rounded-full opacity-60" />
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <div className="prose prose-lg text-secondary max-w-none">
                <p className="text-lg lg:text-xl text-primary/80 mb-6 leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 font-verse" style={{WebkitTextFillColor: 'initial'}}>
                  {data?.leadParagraph || (
                    <>A <span className="text-accent font-bold not-italic">ITED</span> é mais do que uma instituição; é um refúgio espiritual dedicado à manifestação genuína do Reino de Deus em Moçambique.</>
                  )}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm lg:text-base leading-relaxed text-secondary/70">
                  <p>
                    {data?.paragraph1 || (
                      <>Sediada no coração do <span className="font-semibold text-primary">Matacuanne, Beira</span>, nossa congregação nasceu de um chamado para a restauração. Sob a visão do <span className="font-semibold text-primary">Apóstolo Rev. Clemente Raiva</span>, cultivamos um ambiente onde a fé se traduz em atos práticos de serviço e comunhão.</>
                    )}
                  </p>
                  <p>
                    {data?.paragraph2 || (
                      <>Acreditamos em uma espiritualidade que transforma realidades. Nossa jornada é centrada na verdade bíblica, acolhendo cada pessoa como parte de uma família unida pelo propósito eterno de glorificar ao Senhor em todas as esferas da vida.</>
                    )}
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Pillar Cards (Vision, Values, Mission) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
              {(data?.pillars || [
                { title: 'Visão', description: 'Ser casa de adoração para as nações.' },
                { title: 'Valores', description: 'Comunhão, Ensino e Amor Próximo.' },
                { title: 'Missão', description: 'Levar o Evangelho e transformar vidas.' }
              ]).map((item: any, idx: number) => (
                <FadeUp key={idx} delay={0.2 + idx * 0.1}>
                  <div className="p-6 rounded-2xl bg-surface border border-muted/30 hover:border-accent/40 transition-all duration-medium group hover:shadow-soft">
                    <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-all">
                      {getIcon(item.title)}
                    </div>
                    <h3 className="text-sm font-black text-primary uppercase tracking-wider mb-2">{item.title}</h3>
                    <p className="text-xs lg:text-sm text-secondary leading-snug">{item.description}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-accent/5 rounded-full blur-[100px] -z-10" />
          
          <SlideIn direction="left" className="flex flex-col gap-3 sm:gap-4 lg:gap-6 pt-8 sm:pt-12 lg:pt-20">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] relative shadow-strong">
              <img src={image1} alt="Igreja adoração" className="w-full h-full object-cover" />
            </div>
          </SlideIn>
          
          <SlideIn direction="right" className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] relative shadow-strong">
              <img src={image2} alt="Comunidade unida" className="w-full h-full object-cover" />
            </div>
            <div className="bg-gradient-accent rounded-2xl p-5 sm:p-6 md:p-8 text-white shadow-glow">
              <h4 className="text-3xl font-extrabold mb-1">{data?.statsNumber || '10+'}</h4>
              <p className="text-sm text-white/80 font-verse">{data?.statsLabel || 'Anos transformando vidas em nossa comunidade.'}</p>
            </div>
          </SlideIn>
        </div>
      </div>
    </SectionContainer>
  );
};
