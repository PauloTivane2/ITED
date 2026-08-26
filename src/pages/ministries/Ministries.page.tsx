import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../layouts/PageLayout';
import { Baby, Flame, HandHeart, Music, Heart, BookOpen, Users, Sparkles } from 'lucide-react';
import { sanityClient, queries } from '../../cms/sanity/client';
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
  const [data, setData] = useState<any[]>([]);
  const [selected, setSelected] = useState('Todos');

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const result = await sanityClient.fetch(queries.ministries);
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching ministries:", error);
      }
    };
    fetchMinistries();
  }, []);

  const categories = ['Todos', 'Infantil', 'Jovens', 'Social', 'Louvor', 'Oração', 'Família', 'Ensino'];
  
  const filtered = selected === 'Todos' ? data : data.filter(m => {
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
      <div className="sticky top-16 sm:top-20 z-30 bg-[#060911]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-dark-card">
        <div className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-3.5 flex gap-2 overflow-x-auto scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-normal ${
                selected === cat
                  ? 'bg-gradient-accent text-white shadow-glow'
                  : 'bg-[#0B101D] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map(m => (
            <div
              key={m._id}
              className="group bg-[#0B101D] rounded-3xl border border-white/[0.08] overflow-hidden hover:border-accent/40 hover:shadow-glow transition-all duration-normal flex flex-col"
            >
              {/* Image & Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#060911]">
                <img
                  src={m.image || '/images/ministries/ministry_worship_1774776893962.png'}
                  alt={m.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060911]/95 via-[#060911]/30 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-accent text-xl shadow-subtle">
                    {getIconForTitle(m.title)}
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{m.title}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-7 flex-1 flex flex-col justify-between">
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{m.description}</p>
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-2xs font-semibold text-accent uppercase tracking-wider">Saiba Mais</span>
                  <Link
                    to="/#contato"
                    className="text-xs font-bold text-white group-hover:text-accent flex items-center gap-1.5 transition-colors"
                  >
                    Quero Servir →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

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
