import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Menu } from 'lucide-react';
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
    { label: 'Ministérios', href: '/ministerios' },
    { label: 'Eventos', href: '/calendario' },
    { label: 'Galeria', href: '/galeria' },
    { label: 'Paróquias', href: '/paroquias' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#060911]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-dark-card py-3' 
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        {/* Top Gold Horizon Hairline (Visible on Scroll) */}
        {isScrolled && (
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent pointer-events-none" />
        )}

        <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-7xl flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#0E1528] border border-white/15 group-hover:border-accent/50 flex items-center justify-center font-extrabold text-lg sm:text-xl text-white shadow-subtle group-hover:shadow-glow transition-all duration-300">
              <span className="font-serif italic font-bold text-accent">I</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-white group-hover:text-accent transition-colors">
                  ITED
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </div>
              <span className="text-[10px] sm:text-2xs font-semibold uppercase tracking-[0.22em] text-slate-400 group-hover:text-slate-300 transition-colors font-sans">
                Tenda do Encontro
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#0E1528]/60 border border-white/[0.06] backdrop-blur-xl shadow-inner">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;

              return (
                <Link 
                  key={link.label} 
                  to={link.href}
                  className={`relative px-4 py-2 text-xs uppercase tracking-[0.14em] font-semibold rounded-full transition-all duration-200 group ${
                    isActive 
                      ? 'text-accent bg-white/[0.08] shadow-subtle' 
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-accent rounded-full transition-all duration-300 ${
                    isActive ? 'w-3' : 'w-0 group-hover:w-3'
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Link 
                to="/#contato"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-accent text-white text-xs font-bold uppercase tracking-wider border border-accent/40 shadow-glow hover:shadow-glow-lg active:scale-95 transition-all duration-200 group"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Fale Conosco</span>
              </Link>
            </div>

            <button 
              className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 hover:border-accent/40 hover:bg-accent/10 flex items-center justify-center text-slate-200 hover:text-accent transition-all active:scale-95 shadow-subtle"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menu de navegação"
            >
              <Menu className="w-5 h-5" />
            </button>
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
