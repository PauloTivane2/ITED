import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { FadeUp, SlideIn, StaggerContainer, StaggerItem } from '../styles/effect/motionVariants';
import { FaChurch, FaGlobe, FaHeart } from 'react-icons/fa';

export const AboutSection: React.FC = () => {
  return (
    <SectionContainer background="white" id="sobre">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text Content */}
        <div className="flex flex-col gap-8">
          <FadeUp>
            <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">Sobre Nós</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
              Uma igreja feita de <span className="font-serif italic font-medium text-accent">Pessoas</span> e <span className="font-serif italic font-medium text-accent">Propósito</span>
            </h2>
          </FadeUp>
          
          <FadeUp delay={0.1}>
            <div className="text-secondary text-base lg:text-lg leading-relaxed space-y-4">
              <p>
                A Igreja Internacional Tenda do Encontro com Deus (I.I.T.E.D), sediada no 7º Bairro Matacuane, na cidade da Beira, Moçambique, é uma comunidade cristã em crescimento, fundada na fé e guiada pelo Espírito Santo. Sob a liderança do Apóstolo Rev. Clemente Raiva, a igreja vive o princípio de Atos 4:32-35 na versão King James (KJA), que detalha essa comunhão e a entrega dos bens aos apóstolos:
              </p>
              <blockquote className="pl-4 border-l-4 border-accent bg-accent/5 p-4 rounded-r-xl text-sm md:text-base text-secondary/90 italic space-y-2">
                <p><strong>32.</strong> Da multidão dos que creram, era um só o coração e uma só a alma. Ninguém considerava exclusivamente sua posse qualquer coisa que lhe pertencesse; ao contrário, tudo o que tinham era compartilhado.</p>
                <p><strong>33.</strong> Com grande poder os apóstolos continuavam a dar testemunho da ressurreição do Senhor Jesus, e sobre todos eles havia abundante graça.</p>
                <p><strong>34.</strong> Não havia, pois, nenhum necessitado entre eles, porquanto os que possuíam terras ou casas, vendendo-as, traziam os valores correspondentes à venda,</p>
                <p><strong>35.</strong> e os depositavam aos pés dos apóstolos; e distribuía-se a qualquer um, à medida que alguém tivesse necessidade.</p>
              </blockquote>
              <p>
                Promovendo transformação espiritual, comunhão e serviço à comunidade.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer staggerDelay={0.15} className="flex flex-col gap-6 mt-4">
            {[
              { icon: <FaChurch />, title: 'Nossa Visão', desc: 'Sermos uma casa de adoração e restauração contínua para as nações.' },
              { icon: <FaHeart />, title: 'Nossos Valores', desc: 'Comunhão, Espiritualidade, Ensino da Palavra e Amor ao Próximo.' },
              { icon: <FaGlobe />, title: 'Nossa Missão', desc: 'Levar as boas novas do evangelho, acolher os feridos e transformar realidades locais.' }
            ].map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-1">{item.title}</h3>
                    <p className="text-secondary text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-4 lg:gap-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-accent/5 rounded-full blur-[100px] -z-10" />
          
          <SlideIn direction="left" className="flex flex-col gap-4 lg:gap-6 pt-12 lg:pt-20">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] relative shadow-strong">
              <img src="https://images.unsplash.com/photo-1437603568260-1950d3c00cb5?q=80&w=600&auto=format&fit=crop" alt="Igreja adoração" className="w-full h-full object-cover" />
            </div>
          </SlideIn>
          
          <SlideIn direction="right" className="flex flex-col gap-4 lg:gap-6">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] relative shadow-strong">
              <img src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=600&auto=format&fit=crop" alt="Comunidade unida" className="w-full h-full object-cover" />
            </div>
            <div className="bg-gradient-accent rounded-2xl p-6 md:p-8 text-white shadow-glow">
              <h4 className="text-3xl font-extrabold mb-1">10+</h4>
              <p className="text-sm text-white/80 font-medium">Anos transformando vidas em nossa comunidade.</p>
            </div>
          </SlideIn>
        </div>
      </div>
    </SectionContainer>
  );
};
