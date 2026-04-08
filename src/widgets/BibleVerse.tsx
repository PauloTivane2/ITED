import React from 'react';
import { motion } from 'framer-motion';

interface BibleVerseProps {
  reference: string;
  text: string;
  highlightedWord?: string;
  className?: string;
}

export const BibleVerse: React.FC<BibleVerseProps> = ({ 
  reference, 
  text, 
  highlightedWord = "'Tenda do Encontro'",
  className = "" 
}) => {
  // Split text to highlight specific words if needed, or just use string manipulation
  // For simplicity and matching the user's specific text, we'll handle the span manually or via a prop
  
  return (
    <motion.div
      className={`relative py-2 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.35 }}
    >
      {/* Reference Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-8 bg-highlight/30" />
        <span className="text-highlight font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
          {reference}
        </span>
      </div>
      
      {/* Verse Content */}
      <div className="relative pl-0 sm:pl-2">
        {/* Decorative opening quote */}
        <span className="absolute -left-4 -top-6 text-white/10 text-7xl font-serif pointer-events-none select-none">“</span>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-2xl font-verse italic">
          {text.includes(highlightedWord) ? (
            <>
              {text.split(highlightedWord)[0]}
              <span className="text-white font-bold not-italic tracking-wide bg-white/5 px-1.5 py-0.5 rounded-md mx-0.5 border border-white/10 shadow-sm">
                {highlightedWord}
              </span>
              {text.split(highlightedWord)[1]}
            </>
          ) : (
            text
          )}
          {/* Decorative closing quote */}
          <span className="inline-block translate-y-2 ml-1 text-white/10 text-4xl font-serif select-none">”</span>
        </p>
      </div>
    </motion.div>
  );
};
