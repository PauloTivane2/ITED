import { FaScroll, FaChevronDown, FaChevronUp, FaBookOpen, FaFileAlt, FaLink, FaBalanceScale, FaEnvelope, FaSyncAlt, FaCross } from 'react-icons/fa';
import { useState } from 'react';

const terms = [
  {
    id: 1,
    title: 'Aceitação dos Termos',
    icon: <FaBookOpen className="w-5 h-5" />,
    content:
      'Ao acessar e utilizar o website da ITED (Igreja  Tenda do Encontro com Deus), você concorda em cumprir estes Termos de Uso, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum destes termos, está proibido de acessar este site.',
  },
  {
    id: 2,
    title: 'Uso do Conteúdo',
    icon: <FaFileAlt className="w-5 h-5" />,
    content:
      'É concedida permissão para acessar e utilizar os materiais (informações, textos e multimídia) presentes no website da ITED apenas para fins informativos e espirituais pessoais. Esta permissão não inclui a modificação ou cópia dos materiais, uso para fins comerciais ou a reprodução pública sem prévia autorização escrita da liderança da igreja.',
  },
  {
    id: 3,
    title: 'Conteúdo de Terceiros',
    icon: <FaLink className="w-5 h-5" />,
    content:
      'Nossa plataforma pode conter links para sites de terceiros ou recursos externos. Esses links são fornecidos apenas para sua conveniência. A ITED não tem controle sobre o conteúdo desses sites e não assume qualquer responsabilidade por eles ou por quaisquer perdas ou danos que possam surgir do seu uso.',
  },
  {
    id: 4,
    title: 'Responsabilidade',
    icon: <FaBalanceScale className="w-5 h-5" />,
    content:
      'Os materiais presentes no website da ITED são fornecidos "como estão". A ITED não oferece garantias, expressas ou implícitas, e por este meio renuncia e nega todas as outras garantias. Além disso, a ITED não garante nem faz quaisquer representações relativas à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu website.',
  },
  {
    id: 5,
    title: 'Comunicações e Privacidade',
    icon: <FaEnvelope className="w-5 h-5" />,
    content:
      'Ao se inscrever em nossas comunicações ou preencher formulários de contato, você consente em receber comunicações da ITED, incluindo boletins informativos, avisos de eventos e outras mensagens relacionadas às atividades da igreja. Você pode cancelar sua inscrição a qualquer momento.',
  },
  {
    id: 6,
    title: 'Alterações nos Termos',
    icon: <FaSyncAlt className="w-5 h-5" />,
    content:
      'A ITED reserva-se o direito de revisar estes termos de uso a qualquer momento sem aviso prévio. Ao usar este website, você concorda em ficar vinculado à versão atual destes Termos de Uso. Encorajamos você a verificar esta página periodicamente para quaisquer alterações.',
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
      className={`rounded-2xl border transition-all duration-normal overflow-hidden ${
        isOpen
          ? 'border-accent/40 shadow-glow bg-white'
          : 'border-muted bg-white hover:border-accent/20 hover:shadow-soft'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-normal ${
            isOpen ? 'bg-accent/10 text-accent' : 'bg-surface text-secondary group-hover:text-accent'
          }`}>
            {item.icon}
          </div>
          <span className="font-semibold text-primary text-base">{item.title}</span>
        </div>
        <span
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-normal ${
            isOpen ? 'bg-accent text-white' : 'bg-surface text-secondary group-hover:bg-accent/10 group-hover:text-accent'
          }`}
        >
          {isOpen ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
        </span>
      </button>
      <div
        className={`transition-all duration-normal overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-6 pb-6 text-secondary text-sm leading-relaxed border-t border-muted/40 pt-4">
          {item.content}
        </p>
      </div>
    </div>
  );
}

export const TermosPage = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <div className="relative bg-primary overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-5 md:px-10 max-w-4xl py-16 md:py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
            <FaScroll className="w-3.5 h-3.5 text-accent-light" />
            <span className="text-accent-light text-xs font-semibold uppercase tracking-widest">
              Documentos Legais
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Termos de Uso
          </h1>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Leia com atenção as condições que regem o uso do nosso website e serviços digitais.
          </p>

          {/* Divider ornament */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/50" />
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/50" />
          </div>

          <p className="text-white/30 text-xs mt-4">
            Última atualização: Março de 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-5 md:px-10 max-w-3xl py-14 md:py-20">
        {/* Intro card */}
        <div className="bg-accent/5 border border-accent/20 rounded-3xl p-6 md:p-8 mb-10 flex gap-4 items-start">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
            <FaCross className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="font-semibold text-primary mb-1 text-base">Bem-vindo à ITED</p>
            <p className="text-secondary text-sm leading-relaxed">
              Estes Termos de Uso foram elaborados para garantir um ambiente digital seguro e respeitoso, em harmonia com os valores cristãos que nos guiam. Ao navegar em nosso site, você faz parte da nossa comunidade digital.
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {terms.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 bg-muted" />
            <span className="text-muted text-lg">✦</span>
            <div className="h-px flex-1 bg-muted" />
          </div>
          <p className="text-secondary text-sm">
            Dúvidas? Entre em contato conosco através do{' '}
            <a href="/#contato" className="text-accent font-medium hover:underline">
              formulário de contato
            </a>
            .
          </p>
          <p className="text-muted text-xs mt-2 text-accentc">
            © {new Date().getFullYear()} ITED — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};
