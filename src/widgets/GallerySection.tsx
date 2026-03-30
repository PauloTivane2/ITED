import React, { useState } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { Carousel, CarouselItem } from '../shared/Carousel';
import { IframeModal } from '../shared/IframeModal';
import { FadeUp, StaggerContainer, StaggerItem } from '../styles/effect/motionVariants';
import { FaExpandAlt, FaPlay } from 'react-icons/fa';

type GalleryItemType = 'image' | 'youtube' | 'video';

interface GalleryItem {
  id: string;
  type: GalleryItemType;
  url: string; // The URL to display (img src, iframe src, or video src)
  thumbnail?: string; // High res thumbnail for videos
  title: string;
  span: string; // Desktop grid span
}

const galleryItems: GalleryItem[] = [
  { 
    id: '1',
    type: 'youtube', 
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ', 
    thumbnail: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=600&auto=format&fit=crop',
    title: 'Louvor Semanal (Video)', 
    span: 'col-span-1 md:col-span-2 row-span-2' 
  },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=400&auto=format&fit=crop', title: 'Reunião de Casais', span: 'col-span-1 row-span-1' },
  { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=400&auto=format&fit=crop', title: 'Estudo Bíblico', span: 'col-span-1 row-span-1' },
  { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&auto=format&fit=crop', title: 'Comunhão', span: 'col-span-1 row-span-1' },
  { 
    id: '5',
    type: 'video', 
    url: 'https://www.w3schools.com/html/mov_bbb.mp4', 
    thumbnail: 'https://images.unsplash.com/photo-1456574808786-d2ba0a6af640?q=80&w=600&auto=format&fit=crop',
    title: 'Grupo de Jovens (Video)', 
    span: 'col-span-1 md:col-span-2 row-span-2' 
  },
  { id: '6', type: 'image', url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=400&auto=format&fit=crop', title: 'Ação Social', span: 'col-span-1 row-span-1' },
];

export const GallerySection: React.FC = () => {
  const [modalState, setModalState] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  const openModal = (url: string, title: string) => {
    setModalState({ isOpen: true, url, title });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const renderMedia = (item: GalleryItem) => {
    switch (item.type) {
      case 'youtube':
      case 'video':
        return (
          <>
            <img 
              src={item.thumbnail || item.url} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
              loading="lazy"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-strong group-hover:scale-110 group-hover:bg-accent/80 transition-all duration-normal">
                <FaPlay className="w-5 h-5 ml-1" />
              </div>
            </div>
          </>
        );
      case 'image':
      default:
        return (
          <img 
            src={item.url} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110"
            loading="lazy"
          />
        );
    }
  };

  return (
    <SectionContainer background="surface" id="galeria">
      <FadeUp className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
        <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">Nossa Vivência</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-4 sm:mb-5 tracking-tight">
          Momentos da <span className="font-serif italic font-medium text-accent">Comunidade</span>
        </h2>
        <p className="text-secondary text-base sm:text-lg leading-relaxed">
          Um vislumbre da nossa caminhada juntos. Adoração, serviço, alegria e vida em comunhão.
        </p>
      </FadeUp>

      {/* Mobile: Carousel */}
      <Carousel className="md:hidden -mx-4 pb-4" gap="gap-4" padding="px-4">
        {galleryItems.map((item) => (
          <CarouselItem key={item.id} className="min-w-[80vw] sm:min-w-[60vw]">
            <div 
              onClick={() => openModal(item.url, item.title)}
              className="relative group rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-subtle hover:shadow-medium transition-all duration-normal active:scale-[0.98]"
            >
              {renderMedia(item)}
              
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal z-0" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-normal flex items-center justify-between z-20">
                <span className="text-white font-bold text-lg">{item.title}</span>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <FaExpandAlt className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </Carousel>

      {/* Desktop: Masonry-style Grid */}
      <StaggerContainer className="hidden md:grid md:grid-cols-4 grid-rows-auto gap-3 md:gap-5">
        {galleryItems.map((item) => (
          <StaggerItem 
            key={item.id} 
            onClick={() => openModal(item.url, item.title)}
            className={`${item.span} relative group rounded-3xl overflow-hidden min-h-[240px] cursor-pointer shadow-sm hover:shadow-medium transition-all duration-normal`}
          >
            {renderMedia(item)}
            
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal z-0" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-normal flex items-center justify-between z-20">
              <span className="text-white font-bold text-lg">{item.title}</span>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                <FaExpandAlt className="w-4 h-4 text-white" />
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeUp delay={0.4} className="mt-12 text-center">
        <button onClick={() => openModal('/galeria', 'Galeria Completa')} className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-semibold text-primary bg-white border border-muted hover:border-accent hover:text-accent shadow-sm hover:shadow-medium transition-all duration-normal inline-flex items-center gap-2 min-h-[48px] active:scale-95">
          Ver Álbum Completo
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m-7-7H3" />
          </svg>
        </button>
      </FadeUp>
      <IframeModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        url={modalState.url} 
        title={modalState.title} 
      />
    </SectionContainer>
  );
};
