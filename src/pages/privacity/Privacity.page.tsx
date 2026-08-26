import React from 'react';
import { PageLayout } from '../../layouts/PageLayout';
import { ShieldCheck, UserCheck, Database, Mail, Lock } from 'lucide-react';
import { SEO } from '@/shared/ui/SEO/SEO';

const sections = [
  {
    icon: <Database className="w-5 h-5" />,
    title: 'Informações Coletadas',
    content: [
      'Informações de identificação pessoal fornecidas voluntariamente ao preencher formulários no nosso website.',
      'Dados de navegação coletados para fins de segurança, estabilidade e melhoria contínua da plataforma.',
      'Informações fornecidas ao se inscrever em eventos, ministérios ou pedidos de oração.',
    ],
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: 'Finalidade do Uso',
    content: [
      'Envio de avisos e comunicações sobre cultos, eventos e atividades da ITED.',
      'Atendimento e acompanhamento pastoral aos pedidos de oração.',
      'Cumprimento de deveres institucionais e regulatórios aplicáveis.',
    ],
  },
  {
    icon: <UserCheck className="w-5 h-5" />,
    title: 'Proteção e Sigilo',
    content: [
      'Implementamos rigorosas medidas de segurança para proteger suas informações contra acesso indevido.',
      'Sigilo absoluto e confidencialidade nos atendimentos e pedidos de oração.',
      'Não comercializamos nem compartilhamos dados pessoais com terceiros.',
    ],
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: 'Seus Direitos',
    content: [
      'Direito de consultar, atualizar ou solicitar a exclusão de seus dados a qualquer momento.',
      'Cancelamento simples de comunicações através dos canais de atendimento.',
      'Contato direto com a liderança para esclarecimento de dúvidas sobre privacidade.',
    ],
  },
];

export const PrivacityPage: React.FC = () => {
  return (
    <PageLayout>
      <SEO 
        title="Política de Privacidade" 
        description="Saiba como a ITED protege e trata os seus dados pessoais com respeito, sigilo e transparência."
        canonical="/privacidade"
      />
      {/* Hero */}
      <div className="relative bg-[#060911] pt-36 pb-20 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="relative container mx-auto px-5 md:px-10 max-w-4xl text-center z-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-full px-4 py-1.5 mb-6">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-accent text-2xs font-bold uppercase tracking-widest">
              Documentos Institucionais
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Política de <span className="text-accent italic">Privacidade</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Comprometemo-nos com a integridade, o sigilo e o respeito pela sua privacidade em todas as interações.
          </p>

          <p className="text-slate-500 text-xs mt-6">
            Última atualização: {new Date().getFullYear()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-5 md:px-10 max-w-3xl py-14 md:py-20">
        {/* Intro card */}
        <div className="bg-[#0B101D] rounded-3xl border border-white/[0.08] p-6 md:p-8 mb-10 flex gap-4 items-start shadow-dark-card">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 text-accent">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-white mb-1 text-base">Transparência e Respeito</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              A ITED valoriza a sua confiança. Esta política esclarece como tratamos seus dados pessoais em conformidade com as boas práticas éticas e a legislação aplicável.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-[#0B101D] rounded-3xl border border-white/[0.08] shadow-dark-card p-6 md:p-8 hover:border-accent/40 hover:shadow-glow transition-all duration-normal"
            >
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-accent/10 text-accent">
                  {section.icon}
                </div>
                <h2 className="font-bold text-white text-lg">{section.title}</h2>
              </div>
              <ul className="flex flex-col gap-3">
                {section.content.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                    <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
