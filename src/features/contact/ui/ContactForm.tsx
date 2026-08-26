import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../../../shared/Input';
import { Button } from '../../../shared/Button';
import { SectionContainer } from '../../../shared/SectionContainer';
import { Lock, HeartHandshake, Mail, Send, CheckCircle2, ChevronDown, ArrowRight } from 'lucide-react';
import { MapContent } from '../../../widgets/sections/mapa/mapa';
import { emailApi } from '../../../services/email/email.service';

interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const defaultSubjects = [
  'Pedido de Oração',
  'Informações Gerais',
  'Apoio Pastoral',
  'Dízimos e Ofertas',
  'Voluntariado',
  'Ministérios',
];

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactData>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Combobox state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validate = () => {
    const newErrors: Partial<ContactData> = {};
    if (!formData.name.trim()) newErrors.name = 'O nome é obrigatório.';
    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.email = 'Forneça e-mail ou telefone.';
      newErrors.phone = 'Forneça e-mail ou telefone.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'O assunto é obrigatório.';
    if (!formData.message.trim()) newErrors.message = 'A mensagem não pode estar vazia.';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof ContactData]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
      if (e.target.name === 'email' || e.target.name === 'phone') {
        setErrors((prev) => ({ ...prev, email: undefined, phone: undefined }));
      }
    }
  };

  const handleSubjectSelect = (subject: string) => {
    setFormData((prev) => ({ ...prev, subject }));
    setIsDropdownOpen(false);
    if (errors.subject) {
      setErrors((prev) => ({ ...prev, subject: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await emailApi.sendEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('Erro ao enviar contacto:', error);
      setSubmitError('Ocorreu um problema ao enviar a mensagem. Por favor, tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredSubjects = defaultSubjects.filter(sub =>
    sub.toLowerCase().includes(formData.subject.toLowerCase())
  );
  const showCustomOption = formData.subject.trim().length > 0 && !defaultSubjects.some(s => s.toLowerCase() === formData.subject.toLowerCase());

  if (isSuccess) {
    return (
      <SectionContainer background="dark" id="contato">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-[#0B101D] rounded-3xl border border-white/[0.08] p-10 sm:p-14 shadow-dark-card">
            <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">Mensagem Enviada!</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Agradecemos o seu contacto. A nossa equipe irá ler atentamente e retornará com a maior brevidade possível.
            </p>
            <Button onClick={() => setIsSuccess(false)} variant="outline" fullWidth size="lg">
              Enviar Outra Mensagem
            </Button>
          </div>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer background="dark" id="contato">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Side (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full text-2xs uppercase tracking-[0.22em] font-bold text-accent bg-accent/10 border border-accent/25 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Canal de Atendimento
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
              Fale <span className="font-serif italic font-normal text-accent">Conosco</span>
            </h2>

            <div className="p-5 rounded-2xl bg-[#0B101D] border border-white/[0.08] mb-6">
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic font-serif">
                "Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração."
              </p>
              <span className="text-accent text-xs font-bold mt-2 block tracking-wider uppercase not-italic">— Romanos 12:12</span>
            </div>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
              Seja para um pedido de oração, apoio pastoral ou esclarecimento de dúvidas sobre a congregação, nossa equipe ministerial está à sua disposição.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { icon: <Lock className="w-4 h-4" />, text: 'Confidencialidade e sigilo pastoral garantidos.' },
              { icon: <HeartHandshake className="w-4 h-4" />, text: 'Pedidos encaminhados diretamente ao ministério de intercessão.' },
              { icon: <Mail className="w-4 h-4" />, text: 'Retorno célere e atencioso por parte da nossa equipe.' },
            ].map((signal) => (
              <div key={signal.text} className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#0B101D] border border-white/[0.08] shadow-dark-card">
                <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  {signal.icon}
                </div>
                <span className="text-xs text-slate-300 font-medium">{signal.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form (7 cols) */}
        <div className="lg:col-span-7 w-full">
          <div className="bg-[#080E1C]/65 backdrop-blur-xl rounded-2xl p-6 sm:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.4)] border border-white/[0.08] relative overflow-hidden">
            <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
              <Input
                label="Nome Completo *"
                name="name"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                disabled={isSubmitting}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <Input
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={isSubmitting}
                />
                <Input
                  label="Telefone / WhatsApp"
                  name="phone"
                  placeholder="+258 84 000 0000"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  disabled={isSubmitting}
                />
              </div>

              {/* Assunto Combobox */}
              <div className="flex flex-col gap-1.5 w-full group relative" ref={dropdownRef}>
                <label htmlFor="subject" className="text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400 group-focus-within:text-[#D4AF37] transition-colors duration-150">
                  Assunto *
                </label>
                <div className="relative">
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="Selecione ou digite o assunto..."
                    disabled={isSubmitting}
                    autoComplete="off"
                    className={`
                      w-full rounded-xl border text-sm px-4 py-3 pr-10 min-h-[44px]
                      bg-[#070C18]/85 backdrop-blur-md text-slate-100 placeholder:text-slate-500
                      transition-all duration-200 ease-out
                      focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]
                      hover:border-white/[0.18]
                      ${errors.subject ? 'border-red-400/80' : 'border-white/[0.09]'}
                      disabled:opacity-50 disabled:cursor-not-allowed
                      shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]
                    `}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
                {errors.subject && (
                  <span className="text-xs font-medium text-red-400 mt-0.5">{errors.subject}</span>
                )}

                {/* Dropdown Menu */}
                <div className={`
                  absolute z-20 top-[calc(100%+0.5rem)] left-0 right-0 bg-[#0A1020] rounded-xl shadow-2xl border border-white/[0.12] overflow-hidden text-sm font-medium
                  transition-all duration-200 origin-top backdrop-blur-2xl
                  ${isDropdownOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}
                `}>
                  <div className="max-h-56 overflow-y-auto w-full flex flex-col p-1.5">
                    {filteredSubjects.length === 0 && !showCustomOption && (
                      <div className="px-3 py-2 text-xs text-slate-400">Nenhuma opção encontrada</div>
                    )}
                    {filteredSubjects.map(sub => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => handleSubjectSelect(sub)}
                        className="text-left px-3.5 py-2.5 rounded-lg hover:bg-white/[0.06] hover:text-[#D4AF37] transition-colors text-xs font-medium text-slate-200"
                      >
                        {sub}
                      </button>
                    ))}
                    {showCustomOption && (
                      <button
                        type="button"
                        onClick={() => handleSubjectSelect(formData.subject)}
                        className="text-left px-3.5 py-2.5 rounded-lg bg-[#070C18] hover:bg-white/[0.06] hover:text-[#D4AF37] transition-colors text-xs border border-[#D4AF37]/30 mt-1"
                      >
                        Usar assunto: <span className="font-bold text-[#D4AF37]">"{formData.subject}"</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Descrição Textarea */}
              <div className="flex flex-col gap-1.5 w-full group">
                <label htmlFor="message" className="text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400 group-focus-within:text-[#D4AF37] transition-colors duration-150">
                  Mensagem / Descrição *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`
                    w-full rounded-xl border text-sm px-4 py-3
                    bg-[#070C18]/85 backdrop-blur-md text-slate-100 placeholder:text-slate-500
                    transition-all duration-200 ease-out resize-none
                    focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]
                    hover:border-white/[0.18]
                    ${errors.message ? 'border-red-400/80' : 'border-white/[0.09]'}
                    disabled:opacity-50 disabled:cursor-not-allowed
                    shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]
                  `}
                  placeholder="Escreva sua mensagem com detalhes..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <span className="text-xs font-medium text-red-400 mt-0.5">{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 h-11 px-6 rounded-xl font-semibold text-[#070C18] bg-[#D4AF37] hover:bg-[#E2BE4B] border border-[#FFF5DC]/50 shadow-[0_1px_2px_rgba(0,0,0,0.4),0_0_16px_rgba(212,175,55,0.22)] hover:shadow-[0_0_24px_rgba(212,175,55,0.38)] transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] text-sm"
              >
                {isSubmitting ? (
                  <span>Enviando mensagem...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </button>

              <p className="text-center text-2xs text-slate-500 mt-0.5">
                Todas as informações são confidenciais e protegidas.
              </p>

              {submitError && (
                <div className="mt-2 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-400 font-medium text-center">
                  {submitError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Map Integration */}
      <div className="w-full mt-16 pt-12 sm:mt-20 sm:pt-16 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full text-2xs uppercase tracking-[0.22em] font-bold text-accent bg-accent/10 border border-accent/25 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Localização & Acesso
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Venha nos <span className="font-serif italic font-normal text-accent">Visitar</span>
          </h3>
          <p className="text-slate-400 text-sm">
            Nossa sede principal está localizada em <span className="text-white font-bold">Matacuane, Beira</span>.
          </p>
        </div>
        
        <MapContent />
        
        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Procura outras congregações? Temos templos ativos em diversos bairros e províncias.
          </p>
          <a
            href="/paroquias"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline decoration-2 underline-offset-4"
          >
            <span>Ver Todas as Paróquias</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </SectionContainer>
  );
};
