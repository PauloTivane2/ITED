import React, { useState } from 'react';
import { PageLayout } from '../../layouts/PageLayout';
import { FaTimes, FaExpandAlt } from 'react-icons/fa';

const allPhotos = [
  { url: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=800&auto=format&fit=crop', title: 'Louvor Semanal', category: 'Louvor' },
  { url: 'https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=800&auto=format&fit=crop', title: 'Reunião de Casais', category: 'Casais' },
  { url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop', title: 'Estudo Bíblico', category: 'Ensino' },
  { url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop', title: 'Comunhão', category: 'Comunidade' },
  { url: 'https://images.unsplash.com/photo-1456574808786-d2ba0a6af640?q=80&w=800&auto=format&fit=crop', title: 'Grupo de Jovens', category: 'Jovens' },
  { url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop', title: 'Ação Social', category: 'Social' },
  { url: 'https://images.unsplash.com/photo-1478147427282-58a87a433b1e?q=80&w=800&auto=format&fit=crop', title: 'Culto Dominical', category: 'Culto' },
  { url: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=800&auto=format&fit=crop', title: 'Conferência Anual', category: 'Eventos' },
  { url: 'https://images.unsplash.com/photo-1522746029088-1e2b2c2fce7b?q=80&w=800&auto=format&fit=crop', title: 'Jovens em Adoração', category: 'Jovens' },
  { url: 'https://images.unsplash.com/photo-1468421870903-4df1664ac249?q=80&w=800&auto=format&fit=crop', title: 'Batismo', category: 'Especial' },
  { url: 'https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?q=80&w=800&auto=format&fit=crop', title: 'Oração em Família', category: 'Casais' },
  { url: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=800&auto=format&fit=crop', title: 'Ministério Infantil', category: 'Crianças' },
];

const categories = ['Todos', ...Array.from(new Set(allPhotos.map((p) => p.category)))];

export const GalleryPage: React.FC = () => {
  const [selected, setSelected] = useState('Todos');
  const [lightbox, setLightbox] = useState<null | { url: string; title: string }>(null);

  const filtered = selected === 'Todos' ? allPhotos : allPhotos.filter((p) => p.category === selected);

  return (
    <PageLayout>
      {/* Hero Banner */}
      <section className="relative bg-gradient-hero pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-g" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-g)" />
          </svg>
        </div>
        <div className="relative container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl">

          <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">Nossa Vivência</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5">
            Álbum <span className="font-serif italic font-medium text-accent">Completo</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Reviva cada momento especial da nossa comunidade — adoração, serviço, alegria e vida em comunhão.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-muted/40 shadow-sm">
        <div className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                selected === cat
                  ? 'bg-gradient-accent text-white shadow-glow'
                  : 'bg-surface text-secondary hover:text-accent border border-muted/40 hover:border-accent/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filtered.map((photo, i) => (
            <div
              key={i}
              onClick={() => setLightbox(photo)}
              className="relative group rounded-2xl overflow-hidden cursor-pointer break-inside-avoid shadow-sm hover:shadow-medium transition-shadow duration-300"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between">
                <span className="text-white font-semibold text-sm">{photo.title}</span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <FaExpandAlt className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <FaTimes className="w-5 h-5" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.url}
              alt={lightbox.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="text-center text-white/70 mt-4 font-medium">{lightbox.title}</p>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default GalleryPage;
