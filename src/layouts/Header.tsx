import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaBars } from 'react-icons/fa';
import { MobileNavigation } from './MobileNavigation';
import { Button } from '../shared/Button';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#' },
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Ministérios', href: '#ministerios' },
    { label: 'Eventos', href: '#eventos' },
    { label: 'Galeria', href: '#galeria' },

  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-slow ease-smooth ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-2xl shadow-soft border-b border-muted/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-5 md:px-8 lg:px-10 max-w-7xl h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-xl transition-all duration-normal ${
            isScrolled 
              ? 'bg-gradient-accent text-white shadow-glow' 
              : 'bg-white/10 text-white border border-white/20'
          }`}>
            I
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-lg leading-tight tracking-tight transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}>
              I.I.T.E.D
            </span>
            <span className={`text-xs font-medium transition-colors ${isScrolled ? 'text-secondary' : 'text-white/70'}`}>
              Tenda do Encontro com Deus
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-fast hover:bg-accent/5 ${
                isScrolled ? 'text-secondary hover:text-accent' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button size="sm" variant="primary" onClick={() => window.location.href='#contato'}>
              <FaEnvelope className="w-4 h-4" />
              Fale Conosco
            </Button>
          </div>
          <button 
            className={`lg:hidden p-2.5 rounded-xl transition-all duration-fast ${
              isScrolled 
                ? 'text-secondary hover:text-primary hover:bg-surface' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>
      </div>

      <MobileNavigation 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        links={navLinks}
      />
    </header>
  );
};
