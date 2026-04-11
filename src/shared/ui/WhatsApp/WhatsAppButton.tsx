import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export const WhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showButton = useCallback(() => {
    setIsVisible(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);
      
      // Sensibilidade aumentada para 3px para garantir que qualquer movimento ative
      if (diff > 3) {
        showButton();
      }
      
      lastScrollY = currentScrollY;
    };

    // Usar wheel e touchmove além de scroll para máxima compatibilidade
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [showButton]);

  const phoneNumber = "258844203117"; 
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Olá ITED! Gostaria de obter mais informações.')}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          key="whatsapp-fixed-button"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ zIndex: 999999 }}
          className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 sm:p-5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center group pointer-events-auto"
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-4 bg-white text-[#25D366] px-4 py-2 rounded-xl text-sm font-bold shadow-strong opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none border border-muted/20">
            Falar no WhatsApp
          </span>
          
          <FaWhatsapp className="w-7 h-7 sm:w-8 sm:h-8" />
          
          {/* Pulse Effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};
