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
      className={`relative py-3 px-5 sm:px-6 rounded-2xl bg-white/[0.04] border border-accent/20 backdrop-blur-md max-w-2xl shadow-subtle ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.35 }}
    >
      {/* Reference Header */}
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="h-0.5 w-6 bg-accent rounded-full" />
        <span className="text-accent-light font-bold text-xs sm:text-sm tracking-[0.2em] uppercase font-sans">
          {reference}
        </span>
      </div>
      
      {/* Verse Content */}
      <div className="relative">
        <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed font-verse italic">
          “{text.includes(highlightedWord) ? (
            <>
              {text.split(highlightedWord)[0]}
              <span className="text-accent font-semibold not-italic tracking-wide bg-accent/10 px-2 py-0.5 rounded-md mx-1 border border-accent/20">
                {highlightedWord}
              </span>
              {text.split(highlightedWord)[1]}
            </>
          ) : (
            text
          )}”
        </p>
      </div>
    </motion.div>
  );
};
