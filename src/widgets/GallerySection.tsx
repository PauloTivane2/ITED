import React, { useState } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { IframeModal } from '../shared/IframeModal';
import { FadeUp, StaggerContainer, StaggerItem } from '../styles/effect/motionVariants';
import { FaExpandAlt } from 'react-icons/fa';

const galleryItems = [
  { url: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=600&auto=format&fit=crop', title: 'Louvor Semanal', span: 'col-span-1 md:col-span-2 row-span-2' },
  { url: 'https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=400&auto=format&fit=crop', title: 'Reunião de Casais', span: 'col-span-1 row-span-1' },
  { url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=400&auto=format&fit=crop', title: 'Estudo Bíblico', span: 'col-span-1 row-span-1' },
  { url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&auto=format&fit=crop', title: 'Comunhão', span: 'col-span-1 row-span-1' },
  { url: 'https://images.unsplash.com/photo-1456574808786-d2ba0a6af640?q=80&w=400&auto=format&fit=crop', title: 'Grupo de Jovens', span: 'col-span-1 md:col-span-2 row-span-2' },
  { url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=400&auto=format&fit=crop', title: 'Ação Social', span: 'col-span-1 row-span-1' },
];

export const GallerySection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SectionContainer background="surface" id="galeria">
      <FadeUp className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">Nossa Vivência</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-5 tracking-tight">
          Momentos da <span className="font-serif italic font-medium text-accent">Comunidade</span>
        </h2>
        <p className="text-secondary text-lg leading-relaxed">
          Um vislumbre da nossa caminhada juntos. Adoração, serviço, alegria e vida em comunhão.
        </p>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 grid-rows-auto gap-3 md:gap-5">
        {galleryItems.map((item, idx) => (
          <StaggerItem key={idx} className={`${item.span} relative group rounded-2xl md:rounded-3xl overflow-hidden aspect-square md:aspect-auto md:min-h-[240px] cursor-pointer`}>
            <img 
              src={item.url} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal" />
            
            {/* Hover Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-normal flex items-center justify-between">
              <span className="text-white font-bold text-lg">{item.title}</span>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                <FaExpandAlt className="w-4 h-4 text-white" />
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeUp delay={0.4} className="mt-12 text-center">
        <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 rounded-xl font-semibold text-primary bg-white border border-muted hover:border-accent hover:text-accent shadow-sm hover:shadow-medium transition-all duration-normal inline-flex items-center gap-2">
          Ver Álbum Completo
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m-7-7H3" />
          </svg>
        </button>
      </FadeUp>
      <IframeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} url="/galeria" />
    </SectionContainer>
  );
};
