import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface IframeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
  poster?: string;
}

export const IframeModal: React.FC<IframeModalProps> = ({ isOpen, onClose, url, title, poster }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen to ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const isVideo = url.match(/\.(mp4|webm|ogg)$/) || url.includes('video');
  const isImage = url.match(/\.(jpeg|jpg|png|gif|webp|svg)$/) || url.includes('image');
  const isYoutube = url.includes('youtube.com') || url.includes('youtu.be') || url.includes('embed');
  const isInternalRoute = url.startsWith('/');

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop with Click-to-Close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#05070E]/85 backdrop-blur-2xl cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full max-w-6xl max-h-[92vh] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(197,155,39,0.15)] bg-[#080D1A]/95 backdrop-blur-2xl border border-[#C59B27]/30 flex flex-col z-10"
          >
            {/* Top Light Accent Hairline */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E5C368] to-transparent z-20" />

            {/* Header with Prominent Exit Actions */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 bg-[#05070E]/90 backdrop-blur-xl border-b border-[#C59B27]/15 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#C59B27]" />
                <h3 className="font-bold text-sm sm:text-base text-white truncate max-w-[200px] sm:max-w-md">
                  {title || 'Visualização'}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Optional Open in Full Page Link if Internal Route */}
                {isInternalRoute && (
                  <a
                    href={url}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-accent/15 border border-white/10 hover:border-accent/40 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                  >
                    <span>Abrir Página Completa</span>
                    <ExternalLink className="w-3.5 h-3.5 text-accent" />
                  </a>
                )}

                {/* Primary Close Button */}
                <button
                  onClick={onClose}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#B3881E] hover:text-[#05070E] text-white border border-[#C59B27]/25 font-bold text-xs transition-all duration-300 active:scale-95 shadow-subtle group"
                  aria-label="Fechar Modal"
                >
                  <span>Fechar</span>
                  <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 w-full h-full bg-[#05070E]/70 relative flex items-center justify-center overflow-hidden p-2 sm:p-4">
              {isYoutube ? (
                <iframe
                  src={url}
                  className="w-full h-full border-0 rounded-2xl"
                  title="YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : isVideo ? (
                <video
                  src={url}
                  poster={poster}
                  controls
                  autoPlay
                  className="max-w-full max-h-full rounded-2xl shadow-2xl"
                />
              ) : isImage ? (
                <img
                  src={url}
                  alt={title}
                  className="max-w-full max-h-full object-contain rounded-2xl"
                />
              ) : (
                <iframe
                  src={url}
                  className="absolute inset-0 w-full h-full border-0 rounded-b-2xl bg-[#060911]"
                  title="Content"
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
