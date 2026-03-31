import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { SectionContainer } from '../shared/SectionContainer';

import { FaLock, FaPray, FaEnvelope } from 'react-icons/fa';
import { MapContent } from '../widgets/sections/mapa/mapa';
import { emailApi } from '../services/email/email.service';

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
    if (!formData.message.trim()) newErrors.message = 'A descrição não pode estar vazia.';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof ContactData]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
      // Clear grouped error if email or phone is filled
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
        email: formData.email, // Deixa vazio se não tiver para usar o fallback backend
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
  // Se o que o utilizador digitou não está na lista e não está vazio, adicionamos como opção
  const showCustomOption = formData.subject.trim().length > 0 && !defaultSubjects.some(s => s.toLowerCase() === formData.subject.toLowerCase());

  if (isSuccess) {
    return (
      <SectionContainer background="white" id="contato">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-surface rounded-3xl border border-muted/40 p-10 sm:p-14 shadow-soft">
            <div className="w-20 h-20 bg-highlight/10 text-highlight rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
              <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-primary mb-4 tracking-tight">Mensagem Enviada!</h3>
            <p className="text-secondary leading-relaxed mb-10">
              Agradecemos o seu contacto. A nossa equipa irá ler atentamente e retornaremos com a maior brevidade possível.
            </p>
            <Button onClick={() => setIsSuccess(false)} variant="outline" fullWidth size="lg">
              Enviar outra mensagem
            </Button>
          </div>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer background="white" id="contato">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        
        {/* Left Side */}
        <div className="flex-1 max-w-xl lg:max-w-none lg:sticky lg:top-32">
          <span className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4">Contato</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-6 tracking-tight">
            Fale <span className="font-serif italic font-medium text-accent">Conosco</span>
          </h2>
          
          <div className="relative pl-6 border-l-4 border-accent/20 mb-8">
            <p className="text-secondary text-lg leading-relaxed font-sans font-medium">
              "Alegrai-vos na esperança, sedes pacientes na tribulação, perseverai na oração"
            </p>
            <span className="text-accent text-sm font-semibold mt-3 block not-italic">— Romanos 12:12</span>
          </div>

          <p className="text-secondary leading-relaxed mb-8">
            Seja para um pedido de oração, necessidade de apoio pastoral, dúvidas sobre os ministérios ou qualquer outra questão. Estamos aqui para ajudar.
          </p>

          <div className="flex lg:flex flex-col gap-4">
            {[
              { icon: <FaLock />, text: 'Confidencialidade garantida em assuntos ministeriais.' },
              { icon: <FaPray />, text: 'Pedidos de oração encaminhados diretamente à intercessão.' },
              { icon: <FaEnvelope />, text: 'Respostas rápidas para todas as suas dúvidas.' },
            ].map((signal) => (
              <div key={signal.text} className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-surface border border-muted/30">
                <span className="text-xl sm:text-2xl text-accent opacity-80 shrink-0">{signal.icon}</span>
                <span className="text-xs sm:text-sm text-secondary font-medium">{signal.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 w-full max-w-xl">
          <div className="bg-surface rounded-3xl p-7 sm:p-10 shadow-soft border border-muted/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <form onSubmit={handleSubmit} className="relative flex flex-col gap-6">
              <Input 
                label="Nome Completo *"
                name="name"
                placeholder="Como podemos te chamar?"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                disabled={isSubmitting}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input 
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={isSubmitting}
                />
                <Input 
                  label="Contato Telefônico"
                  name="phone"
                  placeholder="+258 84 000 0000"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  disabled={isSubmitting}
                />
              </div>

              {/* Assunto Combobox */}
              <div className="flex flex-col gap-2 w-full group relative" ref={dropdownRef}>
                <label htmlFor="subject" className="text-sm font-semibold text-secondary group-focus-within:text-accent transition-colors duration-fast">
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
                      w-full rounded-xl border-2 text-base px-4 py-3.5 pr-10
                      bg-white text-primary transition-all duration-normal ease-smooth
                      focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent focus:shadow-glow
                      placeholder:text-secondary/40
                      hover:border-secondary/30
                      ${errors.subject ? 'border-red-400 focus:ring-red-500/10 focus:border-red-500 focus:shadow-none' : 'border-muted'}
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white
                    `}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary/50 transition-transform duration-normal" style={{ transform: isDropdownOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)' }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.subject && (
                  <span className="text-sm font-medium text-red-500">{errors.subject}</span>
                )}
                
                {/* Dropdown Menu */}
                <div className={`
                  absolute z-20 top-[calc(100%+0.5rem)] left-0 right-0 bg-white rounded-xl shadow-strong border border-muted/40 overflow-hidden text-sm font-medium
                  transition-all duration-normal origin-top
                  ${isDropdownOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}
                `}>
                  <div className="max-h-56 overflow-y-auto w-full flex flex-col p-1.5 custom-scrollbar">
                    {filteredSubjects.length === 0 && !showCustomOption && (
                      <div className="px-3 py-2 text-secondary/60">Nenhuma opção encontrada</div>
                    )}
                    {filteredSubjects.map(sub => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => handleSubjectSelect(sub)}
                        className="text-left px-3 py-2.5 rounded-lg hover:bg-surface hover:text-accent transition-colors duration-fast"
                      >
                        {sub}
                      </button>
                    ))}
                    {showCustomOption && (
                      <button
                        type="button"
                        onClick={() => handleSubjectSelect(formData.subject)}
                        className="text-left px-3 py-2.5 rounded-lg bg-surface/50 hover:bg-accent/10 hover:text-accent transition-colors duration-fast border border-accent/10 mt-1"
                      >
                        Usar assunto: <span className="font-bold">"{formData.subject}"</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Descrição Textarea */}
              <div className="flex flex-col gap-2 w-full group">
                <label htmlFor="message" className="text-sm font-semibold text-secondary group-focus-within:text-accent transition-colors duration-fast">
                  Descrição *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={`
                    w-full rounded-xl border-2 text-base px-4 py-3.5
                    bg-white text-primary transition-all duration-normal ease-smooth resize-none
                    focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent focus:shadow-glow
                    placeholder:text-secondary/40
                    hover:border-secondary/30
                    ${errors.message ? 'border-red-400 focus:ring-red-500/10 focus:border-red-500 focus:shadow-none' : 'border-muted'}
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white
                  `}
                  placeholder="Descreva aqui com detalhes a sua necessidade, dúvida ou pedido..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <span className="text-sm font-medium text-red-500">{errors.message}</span>
                )}
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                fullWidth
                disabled={isSubmitting}
                className="mt-3 h-14"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando mensagem...
                  </span>
                ) : (
                  <>
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    Enviar Mensagem
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-secondary/50 mt-1">
                A sua mensagem será tratada com todo o cuidado e privacidade.
              </p>

              {submitError && (
                <div className="mt-2 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 font-medium text-center">
                  {submitError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Map Integration */}
      <div className="w-full mt-12 pt-10 sm:mt-20 sm:pt-16 border-t border-muted/30">
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-primary mb-3 italic font-serif leading-tight px-4">
            Venha nos <span className="text-accent underline decoration-accent/20 decoration-2 underline-offset-4">Visitar</span>
          </h3>
          <p className="text-secondary text-sm sm:text-base px-6 sm:px-0">
            Será uma honra receber a sua visita na nossa sede em <span className="text-primary font-bold">Matacuanne</span>.
          </p>
        </div>
        <MapContent />
        <div className="mt-12 text-center">
          <p className="text-secondary text-base mb-6">
            Procura por outra localização? Temos igrejas na  Munhava, Muthindire e mais.
          </p>
          <a 
            href="/paroquias" 
            className="inline-flex items-center gap-2 text-accent font-bold hover:underline decoration-2 underline-offset-4"
          >
            Ver todas as Paróquias
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </SectionContainer>
  );
};
