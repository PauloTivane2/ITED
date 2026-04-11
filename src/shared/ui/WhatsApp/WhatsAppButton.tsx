import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { sanityClient, queries } from '@/cms/sanity/client';

export const WhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [whatsappInfo, setWhatsappInfo] = useState<{ number: string; message: string }>({
    number: "258844203117", // Fallback
    message: "Olá ITED! Gostaria de obter mais informações."
  });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Buscar configurações do Sanity
  useEffect(() => {
    sanityClient.fetch(queries.siteConfig).then((config) => {
      if (config?.whatsapp) {
        setWhatsappInfo(prev => ({
          ...prev,
          number: config.whatsapp.replace(/\D/g, '') // Remove caracteres não numéricos
        }));
      }
    }).catch(err => console.error("Error fetching whatsapp config:", err));
  }, []);

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
    const initialShow = setTimeout(() => {
      showButton();
    }, 1000);

    const handleScroll = () => {
      showButton();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      clearTimeout(initialShow);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [showButton]);

  const whatsappUrl = `https://wa.me/${whatsappInfo.number}?text=${encodeURIComponent(whatsappInfo.message)}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          key="whatsapp-fixed-button"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5, y: 30, x: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30, x: 0 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          style={{ 
            zIndex: 999999,
          }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#25D366] text-white p-4 sm:p-5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2),0_4px_10px_rgba(37,211,102,0.3)] flex items-center justify-center group pointer-events-auto"
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-4 bg-white text-[#25D366] px-4 py-2 rounded-xl text-sm font-extrabold shadow-strong opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-4 group-hover:translate-x-0 whitespace-nowrap pointer-events-none border border-muted/50">
            Falar no WhatsApp
          </span>
          
          <FaWhatsapp className="w-8 h-8 md:w-9 md:h-9" />
          
          {/* Pulse Effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};
