import React, { useState, useEffect } from 'react';
import { PageLayout } from '../../layouts/PageLayout';
import { X, Maximize2 } from 'lucide-react';
import { useGalleryItems } from '@/shared/hooks';
import { GalleryCardSkeleton } from '@/shared/ui/Skeleton';
import { getYouTubeEmbedUrl } from '../../shared/lib/utils';
import { SEO } from '@/shared/ui/SEO/SEO';
import { Breadcrumbs } from '@/shared/ui/Navigation/Breadcrumbs';

export const GalleryPage: React.FC = () => {
  const { galleryItems, isLoading } = useGalleryItems();
  const [selected, setSelected] = useState('Todos');
  const [lightbox, setLightbox] = useState<null | { url: string; title: string; poster?: string }>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setLightbox(null);
      }
    };
    if (lightbox) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightbox]);

  const categories = ['Todos', 'Cultos', 'Eventos', 'Batismos', 'Ação Social', 'Jovens'];
  
  const filtered = selected === 'Todos' ? galleryItems : galleryItems.filter(item => {
    const c = (item.category || item.title || '').toLowerCase();
    const s = selected.toLowerCase();
    return c.includes(s);
  });

  return (
    <PageLayout>
      <SEO 
        title="Nossa Galeria" 
        description="Explore as fotos e vídeos dos momentos especiais, cultos, eventos sociais e vida em comunidade na ITED."
        canonical="/galeria"
      />
      {/* Hero Banner */}
      <section className="bg-[#060911] pt-32 sm:pt-36 pb-16 relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="relative container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl z-10">
          <Breadcrumbs items={[{ label: 'Galeria' }]} />

          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-2xs uppercase tracking-[0.22em] font-bold text-accent bg-accent/10 border border-accent/25 mb-4 shadow-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Registos & Memórias
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Galeria <span className="font-serif italic font-normal text-accent">Oficial</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
            Reviva os momentos marcantes da nossa congregação — cultos, baptismos, eventos sociais e comunhão.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-[#060911]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-dark-card">
        <div className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-3.5 flex gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`shrink-0 px-4.5 py-2 rounded-full text-xs font-bold transition-all duration-normal ${
                selected === cat
                  ? 'bg-[#D4AF37] text-[#060911] shadow-glow border border-[#FFF5DC]/50'
                  : 'bg-[#0E1528] text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.10]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-16">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <GalleryCardSkeleton aspect="portrait" />
            <GalleryCardSkeleton aspect="square" />
            <GalleryCardSkeleton aspect="video" />
            <GalleryCardSkeleton aspect="portrait" />
            <GalleryCardSkeleton aspect="square" />
            <GalleryCardSkeleton aspect="video" />
            <GalleryCardSkeleton aspect="portrait" />
            <GalleryCardSkeleton aspect="square" />
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((item, i) => {
              const displayUrl = item.imageUrl || 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=800&auto=format&fit=crop';
              const modalUrl = item.type === 'youtube' && item.youtubeUrl 
                ? getYouTubeEmbedUrl(item.youtubeUrl) 
                : (item.videoUrl || item.imageUrl || '');

              return (
                <div
                  key={item._id || i}
                  onClick={() => setLightbox({ 
                    url: modalUrl, 
                    title: item.title || item.albumTitle || '', 
                    poster: item.imageUrl 
                  })}
                  className="relative group rounded-3xl overflow-hidden cursor-pointer break-inside-avoid shadow-dark-card border border-white/[0.08] hover:border-accent/40 transition-all duration-300"
                >
                <img
                  src={displayUrl}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Play Button Overlay for Videos */}
                {(item.type === 'video' || item.type === 'youtube') && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-strong transition-all duration-300 group-hover:bg-accent group-hover:text-primary group-hover:scale-110">
                      <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[12px] border-l-current border-b-[7px] border-b-transparent ml-0.5" />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#060911]/90 via-[#060911]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between">
                  <span className="text-white font-semibold text-xs sm:text-sm">{item.title}</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-accent hover:text-primary text-white border border-white/20 text-xs font-bold transition-all shadow-glow"
            onClick={() => setLightbox(null)}
            aria-label="Fechar Visualização"
          >
            <span>Fechar</span>
            <X className="w-4 h-4" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            {lightbox.url.includes('youtube.com') || lightbox.url.includes('embed') ? (
               <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                  <iframe 
                    src={lightbox.url} 
                    className="w-full h-full" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
               </div>
            ) : lightbox.url.match(/\.(mp4|webm|ogg)$/) ? (
              <video 
                src={lightbox.url} 
                poster={lightbox.poster} 
                controls 
                className="w-full h-auto max-h-[80vh] rounded-2xl shadow-2xl" 
                autoPlay 
              />
            ) : (
              <img
                src={lightbox.url}
                alt={lightbox.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
            )}
            <p className="text-center text-white/70 mt-4 font-medium">{lightbox.title}</p>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default GalleryPage;
