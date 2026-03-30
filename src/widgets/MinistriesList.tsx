import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { Carousel, CarouselItem } from '../shared/Carousel';


const ministries = [
  {
    title: 'Ministério Infantil',
    description: 'Cuidando da próxima geração com princípios bíblicos, amor e diversão segura.',
    image: '/images/ministries/ministry_children_1774776653967.png',
  },
  {
    title: 'Jovens e Adolescentes',
    description: 'Encontros dinâmicos para ajudar a juventude a enfrentar os desafios modernos com fé.',
    image: '/images/ministries/ministry_youth_1774776798722.png',
  },
  {
    title: 'Ação Social',
    description: 'Impactando a comunidade através de doações, voluntariado e apoio às famílias.',
    image: '/images/ministries/ministry_social_1774777423721.png',
  },
  {
    title: 'Louvor e Adoração',
    description: 'Conduzindo a igreja a um encontro profundo com Deus através da música e artes.',
    image: '/images/ministries/ministry_worship_1774776893962.png',
  },
  {
    title: 'Intercessão',
    description: 'Guerreiros de oração que levantam clamor diário pelas famílias e pela nação.',
    image: '/images/ministries/ministry_prayer_1774777667476.png',
  },
  {
    title: 'Casais e Família',
    description: 'Fortalecendo casamentos e lares na presença de Deus e com base na palavra.',
    image: '/images/ministries/ministry_worship_1774776893962.png',
  },
];

export const MinistriesList: React.FC = () => {
  return (
    <SectionContainer background="white" id="ministerios">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
        <div className="max-w-2xl">
          <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-3 sm:mb-4">Servir é adorar</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4 sm:mb-5 tracking-tight">
            Nossos <span className="font-serif italic font-medium text-accent">Ministérios</span>
          </h2>
          <p className="text-secondary text-base sm:text-lg leading-relaxed">
            Acreditamos no serviço ativo e na importância de cada dom. Descubra onde você pode se conectar, crescer e servir.
          </p>
        </div>
       
      </div>

      {/* Mobile: Horizontal Carousel */}
      <Carousel className="sm:hidden -mx-4 pb-4" gap="gap-4" padding="px-4">
        {ministries.map((m) => (
          <CarouselItem
            key={m.title}
            className="min-w-[260px] max-w-[80vw]"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-lg">
              {/* Background Image */}
              <img 
                src={m.image} 
                alt={m.title}
                className="absolute inset-0 w-full h-full object-cover" 
              />
              
              {/* Permanent dark gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Static Content for Mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end">
                <h3 className="text-lg font-bold text-white mb-2">
                  {m.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                  {m.description}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </Carousel>

      {/* Desktop: Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ministries.map((m) => (
          <div 
            key={m.title} 
            className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer bg-primary shadow-xl"
          >
            {/* Background Image */}
            <img 
              src={m.image} 
              alt={m.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Dynamic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Hover Content for PC (Slide up) */}
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-8 sm:translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                {m.title}
              </h3>
              <p className="text-white/90 text-base leading-relaxed">
                {m.description}
              </p>
            </div>

            {/* Subtle indicator for Desktop (Before hover) */}
            <div className="absolute bottom-6 left-8 right-8 sm:group-hover:opacity-0 transition-opacity duration-300">
               <h3 className="text-xl font-bold text-white drop-shadow-md">
                {m.title}
              </h3>
              <div className="w-12 h-1 bg-accent mt-2 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default MinistriesList;
