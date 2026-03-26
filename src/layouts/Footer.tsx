import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-glow">
                I
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight block">I.I.T.E.D</span>
                <span className="text-white/50 text-xs">Tenda do Encontro com Deus</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Uma comunidade cristã dedicada à fé, comunhão e transformação espiritual. Nossa missão é aproximar pessoas de Deus através do amor e da palavra.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-2">
              {['facebook', 'instagram', 'youtube'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:shadow-glow transition-all duration-normal group"
                  aria-label={social}
                >
                  {social === 'facebook' && <FaFacebookF className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />}
                  {social === 'instagram' && <FaInstagram className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />}
                  {social === 'youtube' && <FaYoutube className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-6 text-white/90">Links Rápidos</h3>
            <ul className="flex flex-col gap-3.5">
              {[
                { label: 'Sobre Nós', href: '#sobre' },
                { label: 'Nossos Ministérios', href: '#ministerios' },
                { label: 'Eventos', href: '#eventos' },
                { label: 'Galeria', href: '#galeria' },
                { label: 'Contato', href: '#contato' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/50 hover:text-white text-sm transition-all duration-fast hover:translate-x-1 inline-flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-accent transition-all duration-fast" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Schedule */}
          <div>
            <h3 className="font-bold text-base mb-6 text-white/90">Horários</h3>
            <ul className="flex flex-col gap-4 text-sm">
              {[
                { day: 'Segunda', service: 'Intercessão', time: '17:00' },
                { day: 'Quinta', service: 'Ensino', time: '17:30' },
                { day: 'Sexta', service: 'Mulheres', time: '16:00' },
                { day: 'Sábado', service: 'Jejum e Libert.', time: '09:00' },
                { day: 'Domingo', service: 'Culto de Manã', time: '09:00' },
              ].map((item) => (
                <li key={item.day} className="flex items-center justify-between pb-3 border-b border-white/5 last:border-0">
                  <div>
                    <span className="text-white/70 block">{item.day}</span>
                    <span className="text-white/40 text-xs">{item.service}</span>
                  </div>
                  <span className="font-semibold text-accent-light bg-accent/10 px-3 py-1 rounded-full text-xs">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base mb-6 text-white/90">Contato</h3>
            <ul className="flex flex-col gap-4 text-sm text-white/50">
              {[
                { icon: <FaPhoneAlt className="w-4 h-4" />, text: '+258 84 123 4567' },
                { icon: <FaEnvelope className="w-4 h-4" />, text: 'contato@iited.org' },
                { icon: <FaMapMarkerAlt className="w-4 h-4" />, text: 'Av. Principal, 123 — Maputo, MZ' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 group hover:text-white transition-colors">
                  <span className="mt-0.5 text-accent/60 group-hover:text-accent transition-colors shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} I.I.T.E.D. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/70 transition-colors">Termos</a>
            <a href="#" className="hover:text-white/70 transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
