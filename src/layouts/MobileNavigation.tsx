import React, { useEffect } from 'react';
import { FaTimes, FaEnvelope } from 'react-icons/fa';
import { Button } from '../shared/Button';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{label: string, href: string}>;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose, links }) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-primary/30 backdrop-blur-sm transition-opacity duration-slow lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm bg-white shadow-strong flex flex-col transition-transform duration-slow ease-smooth lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-muted/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-accent rounded-lg flex items-center justify-center text-white font-bold text-sm">I</div>
            <span className="font-bold text-primary">I.I.T.E.D</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 min-w-[48px] min-h-[48px] flex items-center justify-center text-secondary hover:text-primary rounded-xl hover:bg-surface transition-all"
            aria-label="Fechar menu"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="px-4 py-4 rounded-xl text-base font-medium text-secondary hover:text-accent hover:bg-accent/5 transition-all duration-fast min-h-[48px] flex items-center"
              style={{ 
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="p-5 border-t border-muted/50 bg-surface/50">
          <Button fullWidth onClick={() => { onClose(); window.location.href='#contato'; }} variant="primary" size="lg">
            <FaEnvelope className="w-5 h-5" />
            Fale Conosco
          </Button>
        </div>
      </div>
    </>
  );
};
