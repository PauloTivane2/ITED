import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { FadeUp, SlideIn } from '../styles/effect/motionVariants';
import { FaChurch, FaGlobe, FaHeart } from 'react-icons/fa';

export const AboutSection: React.FC = () => {
  return (
    <SectionContainer background="white" id="sobre">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text Content */}
          {/* Main Content Cluster */}
          <div className="flex flex-col gap-10">
            <FadeUp>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[1.5px] bg-accent" />
                <span className="text-accent font-bold text-xs sm:text-sm tracking-[0.3em] uppercase">Excelência & Fé</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary leading-[1.1] mb-6">
                Fundada na <span className="text-accent italic font-serif font-medium">Palavra</span>,<br />
                Movida pelo <span className="text-accent italic font-serif font-medium">Amor</span>.
              </h2>
              <div className="h-1 w-20 bg-gradient-accent rounded-full opacity-60" />
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <div className="prose prose-lg text-secondary max-w-none">
                <p className="text-lg lg:text-xl font-medium text-primary/80 mb-6 leading-relaxed">
                  A <span className="text-accent font-bold">ITED</span> é mais do que uma instituição; é um refúgio espiritual dedicado à manifestação genuína do Reino de Deus em Moçambique.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm lg:text-base leading-relaxed text-secondary/70">
                  <p>
                    Sediada no coração do <span className="font-semibold text-primary">Matacuanne, Beira</span>, nossa congregação nasceu de um chamado para a restauração. Sob a visão do <span className="font-semibold text-primary">Apóstolo Rev. Clemente Raiva</span>, cultivamos um ambiente onde a fé se traduz em atos práticos de serviço e comunhão.
                  </p>
                  <p>
                    Acreditamos em uma espiritualidade que transforma realidades. Nossa jornada é centrada na verdade bíblica, acolhendo cada pessoa como parte de uma família unida pelo propósito eterno de glorificar ao Senhor em todas as esferas da vida.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Pillar Cards (Vision, Values, Mission) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
              {[
                { icon: <FaChurch />, title: 'Visão', desc: 'Ser casa de adoração para as nações.' },
                { icon: <FaHeart />, title: 'Valores', desc: 'Comunhão, Ensino e Amor Próximo.' },
                { icon: <FaGlobe />, title: 'Missão', desc: 'Levar o Evangelho e transformar vidas.' }
              ].map((item, idx) => (
                <FadeUp key={idx} delay={0.2 + idx * 0.1}>
                  <div className="p-6 rounded-2xl bg-surface border border-muted/30 hover:border-accent/40 transition-all duration-medium group hover:shadow-soft">
                    <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <h3 className="text-sm font-black text-primary uppercase tracking-wider mb-2">{item.title}</h3>
                    <p className="text-xs lg:text-sm text-secondary leading-snug">{item.desc}</p>
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
              <img src="https://images.unsplash.com/photo-1437603568260-1950d3c00cb5?q=80&w=600&auto=format&fit=crop" alt="Igreja adoração" className="w-full h-full object-cover" />
            </div>
          </SlideIn>
          
          <SlideIn direction="right" className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] relative shadow-strong">
              <img src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=600&auto=format&fit=crop" alt="Comunidade unida" className="w-full h-full object-cover" />
            </div>
            <div className="bg-gradient-accent rounded-2xl p-5 sm:p-6 md:p-8 text-white shadow-glow">
              <h4 className="text-3xl font-extrabold mb-1">10+</h4>
              <p className="text-sm text-white/80 font-medium">Anos transformando vidas em nossa comunidade.</p>
            </div>
          </SlideIn>
        </div>
      </div>
    </SectionContainer>
  );
};
