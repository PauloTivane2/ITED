import { FaShieldAlt, FaUserSecret, FaDatabase, FaEnvelope, FaLock } from 'react-icons/fa';
import { SEO } from '@/shared/ui/SEO/SEO';

const sections = [
  {
    icon: <FaDatabase className="w-5 h-5" />,
    title: 'Informações que Coletamos',
    color: 'bg-accent/10 text-accent',
    content: [
      'Informações de identificação pessoal (nome, endereço de e-mail) fornecidas voluntariamente por você ao preencher formulários no nosso site.',
      'Dados de uso e navegação coletados automaticamente, como endereço IP, tipo de navegador e páginas visitadas, para fins de análise e melhoria contínua.',
      'Informações fornecidas ao se inscrever em eventos, programas ministeriais ou boletins informativos da igreja.',
    ],
  },
  {
    icon: <FaLock className="w-5 h-5" />,
    title: 'Como Usamos Suas Informações',
    color: 'bg-highlight/10 text-highlight',
    content: [
      'Enviar comunicações sobre eventos, cultos, reuniões e atividades ministeriais da ITED.',
      'Personalizar a sua experiência no nosso site e melhorar o nosso serviço com base no seu feedback.',
      'Responder às suas perguntas, solicitações de oração ou pedidos de informação de forma pastoral e cuidadosa.',
      'Cum prir obrigações legais ou regulatórias quando necessário.',
    ],
  },
  {
    icon: <FaUserSecret className="w-5 h-5" />,
    title: 'Proteção de Dados',
    color: 'bg-warm/10 text-warm',
    content: [
      'Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado.',
      'Seus dados são armazenados em servidores seguros e apenas colaboradores autorizados da ITED têm acesso a eles.',
      'Nunca venderemos, divulgaremos ou alugamos suas informações pessoais a terceiros sem o seu consentimento, exceto quando exigido por lei.',
    ],
  },
  {
    icon: <FaEnvelope className="w-5 h-5" />,
    title: 'Seus Direitos',
    color: 'bg-accent-light/10 text-accent-light',
    content: [
      'Você tem o direito de acessar, corrigir ou excluir os dados pessoais que a ITED mantém sobre você.',
      'Pode cancelar sua inscrição em nossas comunicações a qualquer momento através do link de cancelamento nos e-mails.',
      'Pode solicitar informações sobre como seus dados são utilizados entrando em contato diretamente com a nossa secretaria ou liderança.',
    ],
  },
];

export const PrivacityPage = () => {
  return (
    <div className="min-h-screen bg-surface">
      <SEO 
        title="Política de Privacidade" 
        description="Saiba como a ITED protege e trata os seus dados pessoais com respeito e transparência."
        canonical="/privacidade"
      />
      {/* Hero */}
      <div className="relative bg-primary overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-5 md:px-10 max-w-4xl py-16 md:py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-highlight/10 border border-highlight/20 rounded-full px-4 py-1.5 mb-6">
            <FaShieldAlt className="w-3.5 h-3.5 text-highlight" />
            <span className="text-highlight text-xs font-semibold uppercase tracking-widest">
              Documentos Legais
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Política de Privacidade
          </h1>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Comprometemo-nos com a transparência e o respeito pela sua privacidade, em linha com os valores cristãos que nos guiam.
          </p>

          {/* Divider ornament */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-highlight/50" />
            <div className="w-2 h-2 rounded-full bg-highlight" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-highlight/50" />
          </div>

          <p className="text-white/30 text-xs mt-4">
            Última atualização: Março de 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-5 md:px-10 max-w-3xl py-14 md:py-20">
        {/* Intro card */}
        <div className="bg-highlight/5 border border-highlight/20 rounded-3xl p-6 md:p-8 mb-12 flex gap-4 items-start">
          <div className="w-12 h-12 rounded-2xl bg-highlight/10 flex items-center justify-center shrink-0">
            <FaShieldAlt className="w-6 h-6 text-highlight" />
          </div>
          <div>
            <p className="font-semibold text-primary mb-1 text-base">O seu bem-estar é a nossa prioridade</p>
            <p className="text-secondary text-sm leading-relaxed">
              A ITED valoriza profundamente a sua confiança. Esta política explica de forma clara e transparente como tratamos os seus dados pessoais, em conformidade com a legislação vigente e com os princípios éticos que fundamentam o nosso ministério.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-muted shadow-soft p-6 md:p-8 hover:shadow-medium transition-all duration-normal hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color}`}>
                  {section.icon}
                </div>
                <h2 className="font-bold text-primary text-lg">{section.title}</h2>
              </div>
              <ul className="flex flex-col gap-3">
                {section.content.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-secondary text-sm leading-relaxed">
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/40" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 bg-muted" />
            <span className="text-muted text-lg">✦</span>
            <div className="h-px flex-1 bg-muted" />
          </div>
        
          <p className="text-muted text-xs mt-2">
            © {new Date().getFullYear()} ITED — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};
