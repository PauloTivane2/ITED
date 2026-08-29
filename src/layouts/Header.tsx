import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Menu, MapPin, Phone } from 'lucide-react';
import { MobileNavigation } from './MobileNavigation';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '/' },
    { label: 'Sobre Nós', href: '/#sobre' },
    { label: 'Ministérios', href: '/#ministerios' },
    { label: 'Eventos', href: '/#eventos' },
    { label: 'Galeria', href: '/#galeria' },
    { label: 'Paróquias', href: '/paroquias' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const targetPath = path || '/';
      const isCurrentPage = location.pathname === targetPath || (location.pathname === '/' && targetPath === '/');

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
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        
        {/* 1. Top Institutional Utility Bar */}
        <div className="hidden lg:block bg-[#03050A] text-slate-300 border-b border-white/[0.08] text-[11px] py-1.5 transition-all">
          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-7xl flex items-center justify-between">
            <div className="flex items-center gap-3 font-semibold uppercase tracking-[0.15em] text-slate-400">
              <span className="text-accent font-bold">ITED</span>
              <span className="text-white/20">•</span>
              <span>Igreja Internacional Tenda do Encontro com Deus</span>
            </div>
            
            <div className="flex items-center gap-6 font-medium text-slate-300">
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MapPin className="w-3 h-3 text-accent" />
                <span>Matacuane, Beira — Moçambique</span>
              </span>
              <span className="text-white/20">|</span>
              <a href="tel:+258848083482" className="flex items-center gap-1.5 hover:text-accent transition-colors font-semibold">
                <Phone className="w-3 h-3 text-accent" />
                <span>+258 848083482</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. Main Institutional Navbar */}
        <div 
          className={`transition-all duration-300 border-b ${
            isScrolled 
              ? 'bg-[#060911]/98 backdrop-blur-2xl border-[#D4AF37]/30 shadow-[0_4px_30px_rgba(0,0,0,0.7)] py-3' 
              : 'bg-[#060911]/90 backdrop-blur-xl border-white/[0.08] py-4'
          }`}
        >
          {/* Top Horizon Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/70 to-transparent pointer-events-none" />

          <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-7xl flex items-center justify-between">
            
            {/* Brand Logo Lockup */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-lg bg-[#0E1528] border border-[#D4AF37]/40 group-hover:border-accent flex items-center justify-center font-extrabold text-xl text-white shadow-subtle group-hover:shadow-glow transition-all duration-300">
                <span className="font-serif italic font-bold text-accent">I</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl tracking-tight text-white group-hover:text-accent transition-colors">
                    ITED
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest bg-accent/15 text-accent border border-accent/30">
                    MOÇAMBIQUE
                  </span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400 group-hover:text-slate-200 transition-colors font-sans">
                  Tenda do Encontro com Deus
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;

                return (
                  <Link 
                    key={link.label} 
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative py-2 text-xs uppercase tracking-[0.16em] font-bold transition-all duration-200 group ${
                      isActive ? 'text-accent' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] transition-all duration-300 ${
                      isActive ? 'w-full shadow-glow' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                );
              })}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <Link 
                  to="/#contato"
                  onClick={(e) => handleNavClick(e, '/#contato')}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#E2BE4B] text-[#060911] text-xs font-extrabold uppercase tracking-wider border border-[#FFF5DC]/60 shadow-[0_2px_10px_rgba(0,0,0,0.3),0_0_18px_rgba(212,175,55,0.22)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_28px_rgba(212,175,55,0.38)] active:scale-[0.98] transition-all duration-200"
                >
                  <Mail className="w-3.5 h-3.5 text-[#060911]" />
                  <span>Fale Conosco</span>
                </Link>
              </div>

              <button 
                className="lg:hidden w-10 h-10 rounded-lg bg-[#0E1528] border border-white/15 hover:border-accent/50 hover:bg-accent/15 flex items-center justify-center text-slate-200 hover:text-accent transition-all active:scale-95 shadow-subtle"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Abrir menu de navegação"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNavigation 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        links={navLinks}
      />
    </>
  );
};

export default Header;
