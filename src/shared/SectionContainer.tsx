import React, { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

export interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  containerClass?: string;
  background?: 'white' | 'surface' | 'primary' | 'muted';
  animate?: boolean;
}

const easeOut = 'easeOut' as const;

export const SectionContainer: React.FC<SectionContainerProps> = ({ 
  children, 
  className = '', 
  containerClass = '',
  as: Component = 'section',
  background = 'white',
  animate = true,
  ...props 
}) => {
  const backgrounds = {
    white: 'bg-white',
    surface: 'bg-surface',
    primary: 'bg-gradient-hero text-white',
    muted: 'bg-muted/50',
  };

  return (
    <Component 
      className={`py-12 sm:py-16 md:py-20 lg:py-28 ${backgrounds[background]} ${className}`}
      {...props}
    >
      <motion.div
        className={`container mx-auto px-4 sm:px-5 md:px-8 lg:px-10 max-w-7xl ${containerClass}`}
        initial={animate ? { opacity: 0, y: 36 } : false}
        whileInView={animate ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        {children}
      </motion.div>
    </Component>
  );
};
