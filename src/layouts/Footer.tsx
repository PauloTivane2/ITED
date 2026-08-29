import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { sanityClient, queries } from '../cms/sanity/client';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const Footer: React.FC = () => {
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
  const address = config?.address || 'Matacuane, Beira — Moçambique';
  const facebookUrl = config?.socialLinks?.facebook || 'https://www.facebook.com/profile.php?id=61559318708114';
  const instagramUrl = config?.socialLinks?.instagram || '#';
  const youtubeUrl = config?.socialLinks?.youtube || 'https://www.youtube.com/@ITEDTV';
  const tagline = config?.tagline || 'Tenda do Encontro com Deus';
  const description = config?.metaDescription || 'Uma comunidade cristã dedicada à fé, comunhão e transformação espiritual. Nossa missão é aproximar pessoas de Deus através do amor e da palavra.';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const targetPath = path || '/';
      const isCurrentPage = window.location.pathname === targetPath || (window.location.pathname === '/' && targetPath === '/');

      if (isCurrentPage) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          const headerOffset = 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
          window.history.pushState(null, '', href);
        }
      }
    }
  };

  return (
    <footer className="relative bg-[#060911] text-white overflow-hidden border-t border-white/[0.08]">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-5 sm:px-8 lg:px-12 max-w-7xl pt-14 sm:pt-18 lg:pt-22 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16 mb-14 sm:mb-18">
          
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <a href="/" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 bg-[#0E1528] border border-white/20 rounded-xl flex items-center justify-center text-accent font-extrabold text-xl shadow-subtle group-hover:border-accent/60 transition-all">
                <span className="font-serif italic font-bold">I</span>
              </div>
              <div>
                <span className="font-black text-xl tracking-tight block text-white group-hover:text-accent transition-colors">ITED</span>
                <span className="text-slate-400 text-2xs uppercase tracking-[0.18em] font-semibold">{tagline}</span>
              </div>
            </a>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              {description}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-2">
              {[
                { label: 'facebook', icon: <FacebookIcon className="w-4 h-4 text-slate-300 group-hover:text-[#060911] transition-colors" />, href: facebookUrl },
                { label: 'instagram', icon: <InstagramIcon className="w-4 h-4 text-slate-300 group-hover:text-[#060911] transition-colors" />, href: instagramUrl },
                { label: 'youtube', icon: <YoutubeIcon className="w-4 h-4 text-slate-300 group-hover:text-[#060911] transition-colors" />, href: youtubeUrl },
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target={social.href !== '#' ? "_blank" : undefined}
                  rel={social.href !== '#' ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 min-w-[40px] min-h-[44px] rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:shadow-glow transition-all duration-normal group"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-[0.18em] mb-6 text-accent">Navegação Oficial</h3>
            <ul className="flex flex-col gap-3">
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
                  <a 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-slate-300 hover:text-white text-xs sm:text-sm transition-all duration-fast hover:translate-x-1 inline-flex items-center gap-2 group font-medium"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-fast rounded-full" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Schedule */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-[0.18em] mb-6 text-accent">Cultos & Encontros</h3>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm">
              {[
                { day: 'Segunda', service: 'Intercessão', time: '17:00' },
                { day: 'Quinta', service: 'Ensino', time: '17:30' },
                { day: 'Sexta', service: 'Mulheres', time: '16:00' },
                { day: 'Sábado', service: 'Jejum e Libert.', time: '09:00' },
                { day: 'Domingo', service: 'Culto de Manhã', time: '09:00' },
              ].map((item) => (
                <li key={item.day} className="flex items-center justify-between pb-2.5 border-b border-white/[0.06] last:border-0">
                  <div>
                    <span className="text-slate-200 font-semibold block">{item.day}</span>
                    <span className="text-slate-400 text-2xs">{item.service}</span>
                  </div>
                  <span className="font-bold text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-2xs">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-[0.18em] mb-6 text-accent">Contactos Oficiais</h3>
            <ul className="flex flex-col gap-4 text-xs sm:text-sm text-slate-300">
              {[
                { icon: <Phone className="w-4 h-4" />, text: phone, href: `tel:${phone.replace(/\D/g, '')}` },
                { icon: <Mail className="w-4 h-4" />, text: email, href: `mailto:${email}` },
                { icon: <MapPin className="w-4 h-4" />, text: address, href: 'https://maps.app.goo.gl/Vn6iaZRVSL9f9Hg69' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 group hover:text-white transition-colors">
                  <span className="mt-0.5 text-accent group-hover:text-accent-light transition-colors shrink-0">{item.icon}</span>
                  <a href={item.href} target={item.href.startsWith('http') ? "_blank" : undefined} rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined} className="hover:underline decoration-accent/40 underline-offset-4 font-medium">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p className="font-sans">© {new Date().getFullYear()} ITED — Igreja Internacional Tenda do Encontro com Deus. Todos os direitos reservados.</p>
          <div className="flex gap-6 font-medium">
            <a href="/termos" className="hover:text-accent transition-colors">Termos de Uso</a>
            <a href="/privacidade" className="hover:text-accent transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
