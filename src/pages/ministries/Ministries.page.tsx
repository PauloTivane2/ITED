import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../layouts/PageLayout';
import { Baby, Flame, HandHeart, Music, Heart, BookOpen, Users, Sparkles } from 'lucide-react';
import { useMinistries } from '@/shared/hooks';
import { MinistryCardSkeleton } from '@/shared/ui/Skeleton';
import { SEO } from '@/shared/ui/SEO/SEO';
import { Breadcrumbs } from '@/shared/ui/Navigation/Breadcrumbs';

const getIconForTitle = (title: string) => {
  const t = (title || '').toLowerCase();
  if (t.includes('infantil') || t.includes('criança')) return <Baby className="w-6 h-6" />;
  if (t.includes('jovem') || t.includes('adolescente')) return <Flame className="w-6 h-6" />;
  if (t.includes('social') || t.includes('ajuda')) return <HandHeart className="w-6 h-6" />;
  if (t.includes('louvor') || t.includes('música') || t.includes('adoração')) return <Music className="w-6 h-6" />;
  if (t.includes('oração') || t.includes('intercessão')) return <Sparkles className="w-6 h-6" />;
  if (t.includes('casal') || t.includes('família')) return <Heart className="w-6 h-6" />;
  if (t.includes('bíblia') || t.includes('ensino')) return <BookOpen className="w-6 h-6" />;
  return <Users className="w-6 h-6" />;
};

export const MinistriesPage: React.FC = () => {
  const { ministries, isLoading } = useMinistries();
  const [selected, setSelected] = useState('Todos');

  const categories = ['Todos', 'Infantil', 'Jovens', 'Social', 'Louvor', 'Oração', 'Família', 'Ensino'];
  
  const filtered = selected === 'Todos' ? ministries : ministries.filter(m => {
      const t = (m.title || '').toLowerCase();
      if (selected === 'Infantil') return t.includes('infantil') || t.includes('criança');
      if (selected === 'Jovens') return t.includes('jovem') || t.includes('adolescente');
      if (selected === 'Social') return t.includes('social') || t.includes('ajuda');
      if (selected === 'Louvor') return t.includes('louvor') || t.includes('música') || t.includes('adoração');
      if (selected === 'Oração') return t.includes('oração') || t.includes('intercessão');
      if (selected === 'Família') return t.includes('casal') || t.includes('família');
      if (selected === 'Ensino') return t.includes('bíblia') || t.includes('ensino');
      return false;
  });

  return (
    <PageLayout>
      <SEO 
        title="Nossos Ministérios" 
        description="Descubra onde você pode servir e crescer na ITED. Conheça nossos ministérios Infantil, Jovem, Louvor, Ação Social e muito mais."
        canonical="/ministerios"
      />
      {/* Hero */}
      <section className="bg-[#060911] pt-32 sm:pt-36 pb-16 relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl relative z-10">
          <Breadcrumbs items={[{ label: 'Ministérios' }]} />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-2xs uppercase tracking-[0.22em] font-bold text-accent bg-accent/10 border border-accent/25 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Serviço & Adoração
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Nossos <span className="font-serif italic font-normal text-accent">Ministérios</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Cada dom é um chamado sagrado. Encontre seu lugar de serviço, comunhão e edificação na Casa do Senhor.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-16 sm:top-20 z-30 bg-[#05070E]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-dark-card">
        <div className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 ${
                selected === cat
                  ? 'bg-[#D4AF37] text-[#070C18] shadow-[0_0_14px_rgba(212,175,55,0.25)] border border-[#FFF5DC]/50'
                  : 'bg-[#080E1C]/80 text-slate-400 hover:text-white hover:bg-[#121B32]/90 border border-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            <MinistryCardSkeleton />
            <MinistryCardSkeleton />
            <MinistryCardSkeleton />
            <MinistryCardSkeleton />
            <MinistryCardSkeleton />
            <MinistryCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map(m => (
            <div
              key={m._id}
              className="group relative min-h-[440px] aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer bg-[#080E1C]/80 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_24px_rgba(212,175,55,0.14)] border border-white/[0.10] hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Background Image with Smooth Zoom */}
              <img
                src={m.image || '/images/ministries/ministry_worship_1774776893962.png'}
                alt={m.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.80] group-hover:brightness-90"
              />
              
              {/* Ambient Multi-Stop Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-[#060A14]/75 to-transparent/10 group-hover:from-[#060A14]/95 group-hover:via-[#060A14]/80 group-hover:to-transparent/20 transition-all duration-300 pointer-events-none" />
              
              {/* Top Badge */}
              <div className="relative p-6 z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#05070E]/80 backdrop-blur-md border border-white/[0.12] text-[#D4AF37] text-2xs font-semibold uppercase tracking-[0.14em] shadow-subtle group-hover:border-[#D4AF37]/40 transition-colors">
                  {getIconForTitle(m.title)}
                  <span>Ministério</span>
                </div>
              </div>

              {/* Bottom Content Container */}
              <div className="relative p-6 lg:p-7 z-10 mt-auto flex flex-col">
                <div className="transform transition-all duration-300 group-hover:-translate-y-0.5">
                  {/* Ministry Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-200 leading-snug">
                    {m.title}
                  </h3>
                  
                  {/* Description */}
                  <div className="relative overflow-hidden transition-all duration-300 mb-4">
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                      {m.description}
                    </p>
                  </div>

                  {/* Sub-Action Bar */}
                  <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-medium">
                    <span className="text-2xs font-semibold text-slate-400 uppercase tracking-[0.12em]">Servir & Comunhão</span>
                    <Link
                      to="/#contato"
                      className="text-slate-200 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all flex items-center gap-1.5 font-semibold"
                    >
                      <span>Quero Servir</span>
                      <span className="text-xs">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

        {/* CTA Banner */}
        <div className="mt-20 rounded-3xl bg-[#0B101D] border border-white/10 p-10 md:p-14 text-center relative overflow-hidden shadow-dark-card">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-accent/[0.08] rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 relative z-10 tracking-tight">Pronto para servir?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm sm:text-base leading-relaxed relative z-10">
            Entre em contato conosco e descubra como colocar seus dons em prática na nossa comunidade.
          </p>
          <Link
            to="/#contato"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-accent shadow-glow hover:shadow-glow-lg transition-all duration-normal hover:-translate-y-0.5 relative z-10 text-sm"
          >
            Fale Conosco
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default MinistriesPage;
