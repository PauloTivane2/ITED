import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Mail, ChevronRight } from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ label: string; href: string }>;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose, links }) => {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Dark Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Obsidian Glass Drawer */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[88%] max-w-sm bg-[#060911] border-l border-[#D4AF37]/30 shadow-2xl flex flex-col transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.10] bg-[#03050A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0E1528] border border-[#D4AF37]/40 flex items-center justify-center text-white font-extrabold text-lg shadow-subtle">
              <span className="font-serif italic font-bold text-accent">I</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-base leading-tight tracking-tight">ITED</span>
                <span className="px-1.5 py-0.2 rounded text-[8px] font-bold uppercase tracking-widest bg-accent/15 text-accent border border-accent/30">
                  MOÇAMBIQUE
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">Tenda do Encontro com Deus</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white rounded-lg bg-white/[0.05] border border-white/15 hover:border-accent/50 hover:bg-accent/15 transition-all active:scale-95"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-5 flex flex-col gap-2">
          {links.map((link, index) => {
            const isActive = location.pathname === link.href;

            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={onClose}
                className={`px-4 py-3.5 rounded-xl text-xs uppercase tracking-[0.14em] font-bold transition-all flex items-center justify-between group ${
                  isActive 
                    ? 'text-accent bg-accent/15 border border-accent/30 shadow-subtle' 
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent'
                }`}
                style={{ 
                  transitionDelay: isOpen ? `${index * 40}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(16px)',
                }}
              >
                <span>{link.label}</span>
                <ChevronRight className={`w-4 h-4 transition-all ${
                  isActive ? 'text-accent' : 'text-slate-500 group-hover:text-accent group-hover:translate-x-0.5'
                }`} />
              </Link>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div className="p-6 border-t border-white/[0.10] bg-[#03050A]">
          <a
            href="/#contato"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#E2BE4B] text-[#060911] text-xs font-extrabold uppercase tracking-wider border border-[#FFF5DC]/60 shadow-[0_2px_10px_rgba(0,0,0,0.3),0_0_18px_rgba(212,175,55,0.22)] transition-all"
          >
            <Mail className="w-4 h-4 text-[#060911]" />
            <span>Fale Conosco</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
