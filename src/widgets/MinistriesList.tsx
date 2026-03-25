import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { FadeUp, StaggerContainer, StaggerItem } from '../styles/effect/motionVariants';
import { FaChild, FaFire, FaHandsHelping, FaMusic, FaPray, FaHeart } from 'react-icons/fa';

const ministries = [
  {
    title: 'Ministério Infantil',
    description: 'Cuidando da próxima geração com princípios bíblicos, amor e diversão segura.',
    icon: <FaChild />,
    color: 'from-pink-500/80 to-rose-600/80',
  },
  {
    title: 'Jovens e Adolescentes',
    description: 'Encontros dinâmicos para ajudar a juventude a enfrentar os desafios modernos com fé.',
    icon: <FaFire />,
    color: 'from-orange-500/80 to-amber-600/80',
  },
  {
    title: 'Ação Social',
    description: 'Impactando a comunidade através de doações, voluntariado e apoio às famílias.',
    icon: <FaHandsHelping />,
    color: 'from-highlight/80 to-emerald-600/80',
  },
  {
    title: 'Louvor e Adoração',
    description: 'Conduzindo a igreja a um encontro profundo com Deus através da música e artes.',
    icon: <FaMusic />,
    color: 'from-accent/80 to-accent-dark/80',
  },
  {
    title: 'Intercessão',
    description: 'Guerreiros de oração que levantam clamor diário pelas famílias e pela nação.',
    icon: <FaPray />,
    color: 'from-sky-500/80 to-blue-600/80',
  },
  {
    title: 'Casais e Família',
    description: 'Fortalecendo casamentos e lares na presença de Deus e com base na palavra.',
    icon: <FaHeart />,
    color: 'from-red-500/80 to-pink-600/80',
  },
];

export const MinistriesList: React.FC = () => {
  return (
    <SectionContainer background="white" id="ministerios">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl">
          <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">Servir é adorar</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-5 tracking-tight">
            Nossos <span className="font-serif italic font-medium text-accent">Ministérios</span>
          </h2>
          <p className="text-secondary text-lg leading-relaxed">
            Acreditamos no serviço ativo e na importância de cada dom. Descubra onde você pode se conectar, crescer e servir.
          </p>
        </div>
        <a href="#todos-ministerios" className="text-accent font-semibold hover:underline inline-flex items-center gap-2 group shrink-0 text-sm">
          Ver todos os ministérios
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {ministries.map((m) => (
          <div 
            key={m.title} 
            className="group relative rounded-2xl overflow-hidden cursor-pointer bg-surface border border-muted/40 hover:border-accent/20 hover:shadow-medium transition-all duration-normal"
          >
            {/* Top color strip */}
            <div className={`h-32 bg-gradient-to-br ${m.color} relative flex items-center justify-center`}>
              <span className="text-5xl text-white group-hover:scale-125 transition-transform duration-slow opacity-90">{m.icon}</span>
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
            </div>

            {/* Content */}
            <div className="p-6 lg:p-7">
              <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-fast">
                {m.title}
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                {m.description}
              </p>
              <div className="mt-5 flex items-center gap-2 text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-normal">
                Saiba mais
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};
