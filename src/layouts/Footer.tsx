import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { IframeModal } from '../shared/IframeModal';
import { sanityClient, queries } from '../cms/sanity/client';

export const Footer: React.FC = () => {
  const [modalState, setModalState] = useState<{ title: string; url: string } | null>(null);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const result = await sanityClient.fetch(queries.siteConfig);
        if (result) {
          setConfig(result);
        }
      } catch (error) {
        console.error("Error fetching site config:", error);
      }
    };
    fetchConfig();
  }, []);

  const phone = config?.phone || '+258 848083482';
  const email = config?.email || 'itedmidia@gmail.com';
  const address = config?.address || 'Matacuanne, Beira — Moçambique';
  const facebookUrl = config?.socialLinks?.facebook || 'https://www.facebook.com/profile.php?id=61559318708114';
  const instagramUrl = config?.socialLinks?.instagram || '#';
  const youtubeUrl = config?.socialLinks?.youtube || 'https://www.youtube.com/@ITEDTV';
  const tagline = config?.tagline || 'Tenda do Encontro com Deus';
  const description = config?.metaDescription || 'Uma comunidade cristã dedicada à fé, comunhão e transformação espiritual. Nossa missão é aproximar pessoas de Deus através do amor e da palavra.';

  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-5 md:px-8 lg:px-10 max-w-7xl pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16 mb-12 sm:mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-glow">
                I
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight block">ITED</span>
                <span className="text-white/50 text-xs font-verse">{tagline}</span>
              </div>
            </a>
            <p className="text-white/60 text-sm leading-relaxed font-verse">
              {description}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-2">
              {[
                { label: 'facebook', icon: <FaFacebookF className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />, href: facebookUrl },
                { label: 'instagram', icon: <FaInstagram className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />, href: instagramUrl },
                { label: 'youtube', icon: <FaYoutube className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />, href: youtubeUrl },
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target={social.href !== '#' ? "_blank" : undefined}
                  rel={social.href !== '#' ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:shadow-glow transition-all duration-normal group"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-6 text-white/90">Links Rápidos</h3>
            <ul className="flex flex-col gap-3.5">
              {[
                { label: 'Início', href: '/' },
                { label: 'Sobre Nós', href: '/#sobre' },
                { label: 'Nossos Ministérios', href: '/#ministerios' },
                { label: 'Eventos', href: '/#eventos' },
                { label: 'Galeria', href: '/#galeria' },
                { label: 'Paróquias', href: '/paroquias' },
                { label: 'Contato', href: '/#contato' },
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
                { icon: <FaPhoneAlt className="w-4 h-4" />, text: phone, href: `tel:${phone.replace(/\D/g, '')}` },
                { icon: <FaEnvelope className="w-4 h-4" />, text: email, href: `mailto:${email}` },
                { icon: <FaMapMarkerAlt className="w-4 h-4" />, text: address, href: 'https://maps.app.goo.gl/Vn6iaZRVSL9f9Hg69' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 group hover:text-white transition-colors">
                  <span className="mt-0.5 text-accent/60 group-hover:text-accent transition-colors shrink-0">{item.icon}</span>
                  <a href={item.href} target={item.href.startsWith('http') ? "_blank" : undefined} rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined} className="hover:underline decoration-accent/30 underline-offset-4">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p className="font-verse">© {new Date().getFullYear()} ITED. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <button onClick={(e) => { e.preventDefault(); setModalState({ title: 'Termos de Uso', url: '/termos' }); }} className="hover:text-white/70 transition-colors">Termos</button>
            <button onClick={(e) => { e.preventDefault(); setModalState({ title: 'Política de Privacidade', url: '/privacidade' }); }} className="hover:text-white/70 transition-colors">Privacidade</button>
          </div>
        </div>
      </div>
      
      <IframeModal isOpen={!!modalState} onClose={() => setModalState(null)} url={modalState?.url || ''} title={modalState?.title} />
    </footer>
  );
};
