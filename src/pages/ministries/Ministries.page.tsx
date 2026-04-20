import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../layouts/PageLayout';
import { FaChild, FaFire, FaHandsHelping, FaMusic, FaPray, FaHeart, FaBible, FaUsers } from 'react-icons/fa';
import { sanityClient, queries } from '../../cms/sanity/client';
import { SEO } from '@/shared/ui/SEO/SEO';

const getIconForTitle = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('infantil') || t.includes('criança')) return <FaChild />;
  if (t.includes('jovem') || t.includes('adolescente')) return <FaFire />;
  if (t.includes('social') || t.includes('ajuda')) return <FaHandsHelping />;
  if (t.includes('louvor') || t.includes('música') || t.includes('adoração')) return <FaMusic />;
  if (t.includes('oração') || t.includes('intercessão')) return <FaPray />;
  if (t.includes('casal') || t.includes('família')) return <FaHeart />;
  if (t.includes('bíblia') || t.includes('ensino')) return <FaBible />;
  return <FaUsers />;
};

const getColorForTitle = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('infantil')) return 'from-pink-500 to-rose-600';
  if (t.includes('jovem')) return 'from-orange-500 to-amber-600';
  if (t.includes('social')) return 'from-emerald-500 to-green-600';
  if (t.includes('louvor')) return 'from-violet-500 to-purple-600';
  if (t.includes('oração')) return 'from-sky-500 to-blue-600';
  if (t.includes('casal')) return 'from-red-500 to-pink-600';
  if (t.includes('bíblia')) return 'from-teal-500 to-cyan-600';
  return 'from-slate-500 to-gray-600';
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

  const categories = ['Todos', 'Especial', 'Jovens', 'Social', 'Culto', 'Oração', 'Família', 'Ensino', 'Cuidado'];
  
  // Since category is not in schema, we'll just show all or implement a heuristic if needed
  // For now, let's just keep 'Todos' functional and others as empty or heuristic
  const filtered = selected === 'Todos' ? data : data.filter(m => {
      const t = m.title.toLowerCase();
      if (selected === 'Especial') return t.includes('infantil');
      if (selected === 'Jovens') return t.includes('jovem');
      if (selected === 'Social') return t.includes('social');
      if (selected === 'Culto') return t.includes('louvor');
      if (selected === 'Oração') return t.includes('oração');
      if (selected === 'Família') return t.includes('casal');
      if (selected === 'Ensino') return t.includes('bíblia');
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
      <section className="bg-gradient-hero pt-36 pb-20">
        <div className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl">
          <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">Servir é adorar</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5">
            Todos os <span className="font-serif italic font-medium text-accent">Ministérios</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Cada dom é um chamado. Encontre onde Deus te colocou e faça parte de algo maior.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-muted/40 shadow-sm">
        <div className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-4 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
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

      {/* Grid */}
      <section className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(m => (
            <div
              key={m._id}
              className="group bg-white rounded-3xl border border-muted/30 overflow-hidden hover:border-accent/20 hover:shadow-medium transition-all duration-300"
            >
              {/* Top color strip */}
              <div className={`h-36 bg-gradient-to-br ${getColorForTitle(m.title)} relative flex items-center justify-center`}>
                <span className="text-6xl text-white group-hover:scale-125 transition-transform duration-500 z-10 relative">
                  {getIconForTitle(m.title)}
                </span>
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-7">
                <h2 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">{m.title}</h2>
                <p className="text-secondary text-sm leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 rounded-3xl bg-gradient-hero p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Pronto para servir?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">Entre em contato conosco e descubra o ministério certo para você.</p>
          <Link
            to="/#contato"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-accent shadow-glow hover:shadow-glow-lg transition-shadow"
          >
            Fale Conosco
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default MinistriesPage;
