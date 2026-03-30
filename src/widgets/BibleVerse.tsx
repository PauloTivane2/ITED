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
      className={`relative flex flex-col gap-4 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.35 }}
    >
      {/* Reference Header */}
      <div className="flex items-center gap-3">
        <div className="h-px w-8 bg-highlight/30" />
        <span className="text-highlight font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
          {reference}
        </span>
      </div>
      
      {/* Verse Content */}
      <div className="relative">
        {/* Subtle quote icon decoration */}
        <div className="absolute -left-6 -top-2 text-white/5 text-6xl font-serif pointer-events-none">“</div>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-2xl font-light italic">
          {text.includes(highlightedWord) ? (
            <>
              "{text.split(highlightedWord)[0]}
              <span className="text-white font-semibold not-italic tracking-wide">
                {highlightedWord}
              </span>
              {text.split(highlightedWord)[1]}"
            </>
          ) : (
            `"${text}"`
          )}
        </p>
      </div>
    </motion.div>
  );
};
