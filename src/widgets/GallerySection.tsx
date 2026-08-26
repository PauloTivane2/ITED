import React, { useState } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { Carousel, CarouselItem } from '../shared/Carousel';
import { IframeModal } from '../shared/IframeModal';
import { FadeUp, StaggerContainer, StaggerItem } from '../styles/effect/motionVariants';
import { Maximize2, Play } from 'lucide-react';
import { useGalleryItems, GalleryItemData } from '@/shared/hooks';
import { GalleryCardSkeleton } from '@/shared/ui/Skeleton';
import { getYouTubeEmbedUrl } from '../shared/lib/utils';

export const GallerySection: React.FC = () => {
  const [modalState, setModalState] = useState<{ isOpen: boolean; url: string; title: string; poster?: string }>({
    isOpen: false,
    url: '',
    title: '',
    poster: '',
  });

  const { galleryItems, isLoading } = useGalleryItems();

  const openModal = (item: GalleryItemData) => {
    let targetUrl = '';
    
    if (item.type === 'youtube') targetUrl = getYouTubeEmbedUrl(item.youtubeUrl || '');
    else if (item.type === 'video') targetUrl = item.videoUrl || '';
    else targetUrl = item.imageUrl || '';

    setModalState({ 
      isOpen: true, 
      url: targetUrl, 
      title: item.title || item.albumTitle || '', 
      poster: item.thumbnailUrl || item.imageUrl || '' 
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const renderMedia = (item: GalleryItemData) => {
    switch (item.type) {
      case 'youtube':
      case 'video':
        return (
          <>
            <img 
              src={item.thumbnailUrl || item.imageUrl || "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=600&auto=format&fit=crop"} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
              loading="lazy"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-strong group-hover:scale-110 group-hover:bg-accent/80 transition-all duration-normal">
                <Play className="w-5 h-5 ml-1 fill-white" />
              </div>
            </div>
          </>
        );
      case 'image':
      default:
        return (
          <img 
            src={item.imageUrl || "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=400&auto=format&fit=crop"} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110"
            loading="lazy"
          />
        );
    }
  };

  return (
    <SectionContainer background="dark" id="galeria">
      <FadeUp className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full text-2xs uppercase tracking-[0.22em] font-bold text-accent bg-accent/10 border border-accent/25 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Registros & Memória
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
          Momentos da <span className="font-serif italic font-normal text-accent">Comunidade</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Registros visuais da adoração, comunhão, serviço social e vida congregacional da Tenda do Encontro.
        </p>
      </FadeUp>

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          <GalleryCardSkeleton aspect="video" />
          <GalleryCardSkeleton aspect="square" />
          <GalleryCardSkeleton aspect="square" />
          <GalleryCardSkeleton aspect="video" />
        </div>
      ) : (
        <>
          {/* Mobile: Carousel */}
          <Carousel className="md:hidden -mx-4 pb-4" gap="gap-4" padding="px-4">
            {galleryItems.map((item) => (
              <CarouselItem key={item._id || item.id} className="min-w-[80vw] sm:min-w-[60vw]">
                <div 
                  onClick={() => openModal(item)}
                  className="relative group rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer shadow-dark-card transition-all duration-normal active:scale-[0.98] border border-white/[0.08]"
                >
                  {renderMedia(item)}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060911]/95 via-[#060911]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal z-0" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-normal flex items-center justify-between z-20">
                    <span className="text-white font-bold text-base">{item.title}</span>
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>

          {/* Desktop: Masonry-style Grid */}
          <StaggerContainer className="hidden md:grid md:grid-cols-4 grid-rows-auto gap-4 md:gap-5">
            {galleryItems.map((item) => {
              const spanClass = item.featured ? 'col-span-1 md:col-span-2 row-span-2' : 'col-span-1 row-span-1';
              return (
                <StaggerItem 
                  key={item._id || item.id} 
                  onClick={() => openModal(item)}
                  className={`${spanClass} relative group rounded-3xl overflow-hidden min-h-[250px] cursor-pointer shadow-dark-card hover:shadow-glow border border-white/[0.08] hover:border-accent/40 transition-all duration-normal`}
                >
                  {renderMedia(item)}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060911]/95 via-[#060911]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal z-0" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-normal flex items-center justify-between z-20">
                    <span className="text-white font-bold text-base sm:text-lg">{item.title}</span>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </>
      )}

      <FadeUp delay={0.3} className="mt-12 text-center">
        <a 
          href="/galeria" 
          className="px-8 py-4 rounded-xl font-semibold text-white bg-[#0B101D] border border-white/10 hover:border-accent/40 hover:bg-accent/10 shadow-dark-card transition-all duration-normal inline-flex items-center gap-2.5 min-h-[48px] active:scale-98 text-sm"
        >
          <span>Ver Álbum Completo</span>
          <span className="text-accent font-bold">→</span>
        </a>
      </FadeUp>
      <IframeModal 
        isOpen={modalState.isOpen} 
        onClose={closeModal} 
        url={modalState.url} 
        title={modalState.title} 
        poster={modalState.poster}
      />
    </SectionContainer>
  );
};
