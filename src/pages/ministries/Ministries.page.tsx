import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../layouts/PageLayout';
import { FaChild, FaFire, FaHandsHelping, FaMusic, FaPray, FaHeart, FaBible, FaUsers, FaChevronDown } from 'react-icons/fa';

const ministries = [
  {
    id: 1,
    title: 'Ministério Infantil',
    description: 'Cuidando da próxima geração com princípios bíblicos, amor e diversão segura. Nossas crianças são o futuro da igreja.',
    details: 'O Ministério Infantil é dedicado a crianças de 0 a 12 anos. Reuniões aos domingos durante o culto principal. Programação especial com histórias bíblicas, atividades artísticas e brincadeiras.',
    schedule: 'Domingos às 09:00',
    leader: 'Irmã Patricia',
    icon: <FaChild />,
    color: 'from-pink-500 to-rose-600',
    category: 'Especial',
  },
  {
    id: 2,
    title: 'Jovens e Adolescentes',
    description: 'Encontros dinâmicos para ajudar a juventude a enfrentar os desafios modernos com fé, propósito e identidade.',
    details: 'O ministério de jovens é um espaço seguro para adolescentes e jovens adultos se conectarem, crescerem na fé e descobrirem seu propósito. Atividades dinâmicas, retiros anuais e células semanais.',
    schedule: 'Sextas-feiras às 19:30',
    leader: 'Pr. André',
    icon: <FaFire />,
    color: 'from-orange-500 to-amber-600',
    category: 'Jovens',
  },
  {
    id: 3,
    title: 'Ação Social',
    description: 'Impactando a comunidade através de doações, voluntariado e apoio às famílias em situação de vulnerabilidade.',
    details: 'O braço social da igreja que arrecada alimentos, roupas e realiza ações em bairros carentes. Participe como voluntário e ajude a transformar vidas.',
    schedule: 'Sábados às 08:00 (quinzenal)',
    leader: 'Diác. Fátima',
    icon: <FaHandsHelping />,
    color: 'from-emerald-500 to-green-600',
    category: 'Social',
  },
  {
    id: 4,
    title: 'Louvor e Adoração',
    description: 'Conduzindo a igreja a um encontro profundo com Deus através da música, artes e adoração genuína.',
    details: 'O ministério musical da igreja, composto por vocalistas, instrumentistas e equipe de som. Ensaios semanais e participação em todos os cultos e eventos.',
    schedule: 'Treinos: Quartas às 19:00',
    leader: 'Msc. Elias',
    icon: <FaMusic />,
    color: 'from-violet-500 to-purple-600',
    category: 'Culto',
  },
  {
    id: 5,
    title: 'Intercessão',
    description: 'Guerreiros de oração que levantam clamor diário pelas famílias, pela nação e pelas necessidades da comunidade.',
    details: 'A equipe de intercessão se reúne para oração coletiva e cobertura espiritual de todas as atividades da igreja. Um ministério fundamental na vida da comunidade.',
    schedule: 'Segundas às 17:00',
    leader: 'Pbr. Maria',
    icon: <FaPray />,
    color: 'from-sky-500 to-blue-600',
    category: 'Oração',
  },
  {
    id: 6,
    title: 'Casais e Família',
    description: 'Fortalecendo casamentos e lares na presença de Deus e com base na palavra, gerando famílias saudáveis.',
    details: 'Encontros mensais de casais com ensinamentos práticos, dinâmicas e momentos de comunhão. Seminários anuais e acompanhamento pastoral.',
    schedule: 'Sábados às 15:00 (mensal)',
    leader: 'Pr. Carlos & Pra. Ana',
    icon: <FaHeart />,
    color: 'from-red-500 to-pink-600',
    category: 'Família',
  },
  {
    id: 7,
    title: 'Escola Bíblica',
    description: 'Formação sólida na Palavra de Deus para todos os membros, com aulas, estudos e grupos de aprofundamento.',
    details: 'A Escola Bíblica Dominical oferece aulas para todas as idades. Materiais apostilados e professores treinados garantem um aprendizado de qualidade.',
    schedule: 'Domingos às 08:00',
    leader: 'Pbr. João',
    icon: <FaBible />,
    color: 'from-teal-500 to-cyan-600',
    category: 'Ensino',
  },
  {
    id: 8,
    title: 'Cuidado Pastoral',
    description: 'Uma rede de amor, aconselhamento e cuidado para membros em momentos de necessidade, dor ou transição.',
    details: 'O ministério de cuidado conecta pessoas em necessidade com líderes e conselheiros treinados para apoio emocional, espiritual e prático.',
    schedule: 'Quintas às 17:30',
    leader: 'Pr. Samuel',
    icon: <FaUsers />,
    color: 'from-slate-500 to-gray-600',
    category: 'Cuidado',
  },
];

const categories = ['Todos', ...Array.from(new Set(ministries.map(m => m.category)))];

export const MinistriesPage: React.FC = () => {
  const [selected, setSelected] = useState('Todos');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = selected === 'Todos' ? ministries : ministries.filter(m => m.category === selected);

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
        <div className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl py-4 flex gap-2 overflow-x-auto">
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
              key={m.id}
              className="group bg-white rounded-3xl border border-muted/30 overflow-hidden hover:border-accent/20 hover:shadow-medium transition-all duration-300"
            >
              {/* Top color strip */}
              <div className={`h-36 bg-gradient-to-br ${m.color} relative flex items-center justify-center`}>
                <span className="text-6xl text-white group-hover:scale-125 transition-transform duration-500 z-10 relative">
                  {m.icon}
                </span>
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
                <span className="absolute top-4 right-4 text-xs font-bold text-white/70 bg-white/10 px-3 py-1 rounded-full">
                  {m.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-7">
                <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">{m.title}</h2>
                <p className="text-secondary text-sm leading-relaxed mb-4">{m.description}</p>

                {/* Quick info */}
                <div className="flex flex-col gap-1.5 mb-5 text-xs text-secondary">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span><strong className="text-primary">Horário:</strong> {m.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-highlight" />
                    <span><strong className="text-primary">Líder:</strong> {m.leader}</span>
                  </div>
                </div>

                {/* Expand button */}
                <button
                  onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                  className="w-full flex items-center justify-between text-sm text-accent font-semibold border-t border-muted/30 pt-4 hover:text-accent-dark transition-colors"
                >
                  {expanded === m.id ? 'Ver menos' : 'Saiba mais'}
                  <FaChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded === m.id ? 'rotate-180' : ''}`} />
                </button>

                {expanded === m.id && (
                  <p className="text-secondary text-sm leading-relaxed mt-4 pt-4 border-t border-muted/30">
                    {m.details}
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
