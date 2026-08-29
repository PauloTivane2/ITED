import React, { useState } from 'react';
import { PageLayout } from '../../layouts/PageLayout';
import { ScrollText, ChevronDown, ChevronUp, BookOpen, FileText, Link2, Scale, Mail, RefreshCw, Cross } from 'lucide-react';
import { SEO } from '@/shared/ui/SEO/SEO';

const terms = [
  {
    id: 1,
    title: 'Aceitação dos Termos',
    icon: <BookOpen className="w-5 h-5" />,
    content:
      'Ao acessar e utilizar o website da ITED (Igreja Internacional Tenda do Encontro com Deus), você concorda em cumprir estes Termos de Uso, todas as leis e regulamentos aplicáveis. Caso discorde de algum termo, solicitamos que não utilize esta plataforma.',
  },
  {
    id: 2,
    title: 'Uso do Conteúdo Institucional',
    icon: <FileText className="w-5 h-5" />,
    content:
      'É concedida permissão para acessar os materiais (textos bíblicos, avisos, artigos e multimídia) presentes no website da ITED para fins estritamente pessoais e de edificação espiritual. É vedada a reprodução comercial sem prévia autorização.',
  },
  {
    id: 3,
    title: 'Links e Recursos Externos',
    icon: <Link2 className="w-5 h-5" />,
    content:
      'Nossa plataforma pode conter links para serviços externos (como transmissões no YouTube ou mapas). A ITED não se responsabiliza pelo conteúdo ou práticas de privacidade desses serviços.',
  },
  {
    id: 4,
    title: 'Responsabilidade e Integridade',
    icon: <Scale className="w-5 h-5" />,
    content:
      'Empenhamo-nos em manter todas as informações atualizadas e precisas. As informações sobre horários de cultos e eventos são fornecidas para benefício da comunidade e podem sofrer alterações conforme programação ministerial.',
  },
  {
    id: 5,
    title: 'Comunicações e Pedidos de Oração',
    icon: <Mail className="w-5 h-5" />,
    content:
      'Ao enviar mensagens através do formulário de contato ou pedidos de oração, você consente com o contato de retorno da equipe pastoral. Todas as solicitações são tratadas com sigilo e respeito.',
  },
  {
    id: 6,
    title: 'Atualizações dos Termos',
    icon: <RefreshCw className="w-5 h-5" />,
    content:
      'A ITED reserva-se o direito de atualizar estes termos periodicamente para refletir melhorias no site ou adequações legais.',
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof terms)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-3xl border transition-all duration-normal overflow-hidden backdrop-blur-2xl ${
        isOpen
          ? 'border-accent/50 shadow-glow bg-[#0E1528]/95'
          : 'border-white/[0.10] bg-[#0E1528]/90 hover:border-accent/40'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 sm:px-8 py-5 text-left group"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-normal ${
            isOpen ? 'bg-[#D4AF37] text-[#060911] font-bold' : 'bg-white/[0.05] text-slate-300 group-hover:bg-accent/15 group-hover:text-accent border border-white/10'
          }`}>
            {item.icon}
          </div>
          <span className="font-bold text-white text-base sm:text-lg">{item.title}</span>
        </div>
        <span
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-normal ${
            isOpen ? 'bg-accent/15 text-accent border border-accent/30' : 'bg-white/[0.05] text-slate-400 group-hover:text-accent'
          }`}
        >
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </span>
      </button>
      <div
        className={`transition-all duration-normal overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-6 sm:px-8 pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/[0.08] pt-4 font-normal">
          {item.content}
        </p>
      </div>
    </div>
  );
}

export const TermosPage: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <PageLayout>
      <SEO 
        title="Termos de Uso" 
        description="Termos e condições de uso do website e serviços da ITED (Igreja Internacional Tenda do Encontro com Deus)."
        canonical="/termos"
      />
      {/* Hero */}
      <div className="relative bg-[#060911] pt-36 pb-20 overflow-hidden border-b border-white/[0.08]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="relative container mx-auto px-5 md:px-10 max-w-4xl text-center z-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-full px-4 py-1.5 mb-6 shadow-subtle">
            <ScrollText className="w-3.5 h-3.5 text-accent" />
            <span className="text-accent text-2xs font-bold uppercase tracking-widest">
              Documentos Institucionais
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Termos de <span className="text-accent italic">Uso</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Diretrizes e princípios para uma convivência digital edificante, segura e respeitosa.
          </p>

          <p className="text-slate-500 text-xs mt-6">
            Última atualização: {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-5 md:px-10 max-w-3xl py-14 md:py-20">
        {/* Intro card */}
        <div className="bg-[#0E1528]/90 rounded-3xl border border-white/[0.10] p-6 md:p-8 mb-10 flex gap-4 items-start shadow-dark-card backdrop-blur-2xl">
          <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0 text-accent border border-accent/20">
            <Cross className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-white mb-1 text-base">Bem-vindo à ITED</p>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Estes termos visam assegurar um ambiente digital de respeito, transparência e fé mútua ao navegar em nossa plataforma.
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3.5">
          {terms.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
