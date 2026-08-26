import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sanityClient, queries } from '@/cms/sanity/client';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export const WhatsAppButton: React.FC = () => {
  const [whatsappInfo, setWhatsappInfo] = useState<{ number: string; message: string }>({
    number: "258844203117",
    message: "A paz do Senhor! Gostaria de pedir uma oração ou obter mais informações sobre a ITED."
  });

  useEffect(() => {
    sanityClient.fetch(queries.siteConfig).then((config) => {
      if (config?.whatsapp) {
        setWhatsappInfo(prev => ({
          ...prev,
          number: config.whatsapp.replace(/\D/g, '')
        }));
      }
    }).catch(err => console.error("Error fetching whatsapp config:", err));
  }, []);

  const whatsappUrl = `https://wa.me/${whatsappInfo.number}?text=${encodeURIComponent(whatsappInfo.message)}`;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9990] pointer-events-auto">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="group relative flex items-center gap-3.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#0B101D]/95 hover:bg-[#0E1528] border border-white/10 hover:border-emerald-500/50 shadow-2xl backdrop-blur-2xl transition-all duration-300 overflow-hidden"
        aria-label="Atendimento Online via WhatsApp"
      >
        {/* Subtle Ambient Emerald Radial Glow */}
        <div className="absolute inset-0 bg-emerald-500/[0.06] group-hover:bg-emerald-500/[0.14] transition-all duration-500 pointer-events-none" />

        {/* Status Indicator & Icon */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shrink-0 shadow-subtle">
          <WhatsAppIcon className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse border-2 border-[#0B101D]" />
        </div>

        {/* Text Context (Responsive display) */}
        <div className="flex flex-col text-left">
          <span className="text-2xs uppercase tracking-[0.16em] font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
            Online
          </span>
          <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors leading-tight">
            Falar no WhatsApp
          </span>
        </div>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
