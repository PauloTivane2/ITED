import React, { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

export interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  containerClass?: string;
  background?: 'dark' | 'surface' | 'primary' | 'card' | 'white' | 'muted';
  animate?: boolean;
}

const easeOut = 'easeOut' as const;

export const SectionContainer: React.FC<SectionContainerProps> = ({ 
  children, 
  className = '', 
  containerClass = '',
  as: Component = 'section',
  background = 'dark',
  animate = true,
  ...props 
}) => {
  const backgrounds = {
    dark: 'bg-transparent border-b border-white/[0.04]',
    surface: 'bg-white/[0.015] border-b border-white/[0.04]',
    primary: 'bg-transparent border-b border-white/[0.04]',
    card: 'bg-white/[0.02] border-b border-white/[0.04]',
    white: 'bg-transparent border-b border-white/[0.04]',
    muted: 'bg-transparent border-b border-white/[0.04]',
  };

  return (
    <Component 
      className={`scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden text-slate-200 ${backgrounds[background]} ${className}`}
      {...props}
    >
      <motion.div
        className={`container mx-auto px-5 sm:px-8 lg:px-12 max-w-7xl relative z-10 ${containerClass}`}
        initial={animate ? { opacity: 0, y: 28 } : false}
        whileInView={animate ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        {children}
      </motion.div>
    </Component>
  );
};
