import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

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

  if (!mounted) return null;

  const isVideo = url.match(/\.(mp4|webm|ogg)$/) || url.includes('video');
  const isImage = url.match(/\.(jpeg|jpg|png|gif|webp|svg)$/) || url.includes('image');
  const isYoutube = url.includes('youtube.com') || url.includes('youtu.be') || url.includes('embed');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Blurred background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full h-full max-w-7xl rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col z-10"
          >
            {/* Header / close bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-surface border-b border-muted/20 shrink-0">
              <span className="font-semibold text-primary">{title || 'Navegação'}</span>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-muted/30 text-secondary hover:text-accent hover:border-accent hover:bg-accent/5 transition-all shadow-sm"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 w-full h-full bg-surface relative flex items-center justify-center overflow-hidden p-2 sm:p-4">
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
                  className="max-w-full max-h-full rounded-2xl shadow-lg"
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
                  className="absolute inset-0 w-full h-full border-0"
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
