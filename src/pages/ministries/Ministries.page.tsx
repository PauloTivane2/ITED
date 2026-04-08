import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../layouts/PageLayout';
import { FaChild, FaFire, FaHandsHelping, FaMusic, FaPray, FaHeart, FaBible, FaUsers, FaChevronDown } from 'react-icons/fa';
import { sanityClient, queries } from '../../cms/sanity/client';

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
  const [expanded, setExpanded] = useState<string | null>(null);

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
      {/* Hero */}
      <section className="relative bg-gradient-hero pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-m" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-m)" />
          </svg>
        </div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-highlight/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl">

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
                <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">{m.title}</h2>
                <p className="text-secondary text-sm leading-relaxed mb-4">{m.description}</p>

                {/* Quick info Fallbacks */}
                <div className="flex flex-col gap-1.5 mb-5 text-xs text-secondary">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span><strong className="text-primary">Participação:</strong> Aberta a todos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-highlight" />
                    <span><strong className="text-primary">Status:</strong> Ativo</span>
                  </div>
                </div>

                {/* Expand button */}
                <button
                  onClick={() => setExpanded(expanded === m._id ? null : m._id)}
                  className="w-full flex items-center justify-between text-sm text-accent font-semibold border-t border-muted/30 pt-4 hover:text-accent-dark transition-colors"
                >
                  {expanded === m._id ? 'Ver menos' : 'Saiba mais'}
                  <FaChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded === m._id ? 'rotate-180' : ''}`} />
                </button>

                {expanded === m._id && (
                  <p className="text-secondary text-sm leading-relaxed mt-4 pt-4 border-t border-muted/30">
                    {m.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 rounded-3xl bg-gradient-hero p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-cta" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-cta)" />
            </svg>
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Pronto para servir?</h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">Entre em contato conosco e descubra o ministério certo para você.</p>
            <Link
              to="/#contato"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-accent shadow-glow hover:shadow-glow-lg transition-shadow"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default MinistriesPage;
