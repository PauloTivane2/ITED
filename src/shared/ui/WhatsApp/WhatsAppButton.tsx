import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export const WhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showButton = () => {
    setIsVisible(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        showButton();
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const phoneNumber = "258844203117"; 
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Olá ITED! Gostaria de obter mais informações.')}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          whileHover={{ 
            scale: 1.15,
            boxShadow: "0 0 30px rgba(37, 211, 102, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] text-white p-4 sm:p-5 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.3)] flex items-center justify-center group pointer-events-auto"
          title="Fale no WhatsApp"
        >
          {/* Label Tooltip */}
          <span className="absolute right-full mr-4 bg-white text-[#25D366] px-4 py-2 rounded-xl text-sm font-bold shadow-strong opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none border border-muted/20">
            Fale Conosco
          </span>
          
          <FaWhatsapp className="w-7 h-7 sm:w-8 sm:h-8" />
          
          {/* Ping Effect Animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};
