/**
 * Page-level Framer Motion wrappers.
 *
 * Usage:
 *   <PageTransition>   ← wraps entire pages / route entries
 *     ...
 *   </PageTransition>
 *
 *   <FadeUp delay={0.2}>  ← stagger-reveal individual elements
 *     ...
 *   </FadeUp>
 *
 *   <SlideIn direction="left">
 *     ...
 *   </SlideIn>
 *
 *   <ScaleIn>
 *     ...
 *   </ScaleIn>
 */

import React from 'react';
import { motion, Variants, MotionProps, HTMLMotionProps } from 'framer-motion';

// ─── shared easing ────────────────────────────────────────────────────────────
const easeSmooth = 'easeInOut' as const;
const easeOut    = 'easeOut' as const;

// ─── PageTransition ───────────────────────────────────────────────────────────
const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSmooth } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.3, ease: easeSmooth } },
};

interface PageTransitionProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
  ...rest
}) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="enter"
    exit="exit"
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

// ─── FadeUp ───────────────────────────────────────────────────────────────────
interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const FadeUp: React.FC<FadeUpProps & HTMLMotionProps<'div'>> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: '-80px' }}
    transition={{ duration, delay, ease: easeOut }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// ─── SlideIn ──────────────────────────────────────────────────────────────────
interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const slideOffset = (direction: SlideInProps['direction'], amount = 60) => {
  switch (direction) {
    case 'left':  return { x: -amount, y: 0 };
    case 'right': return { x:  amount, y: 0 };
    case 'down':  return { x: 0, y: amount };
    default:      return { x: 0, y: -amount }; // up
  }
};

export const SlideIn: React.FC<SlideInProps & HTMLMotionProps<'div'>> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  ...props
}) => {
  const offset = slideOffset(direction);
  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: easeOut }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ─── ScaleIn ──────────────────────────────────────────────────────────────────
interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  scale?: number;
}

export const ScaleIn: React.FC<ScaleInProps & HTMLMotionProps<'div'>> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
  scale = 0.85,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, scale }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once, margin: '-80px' }}
    transition={{ duration, delay, ease: easeOut }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// ─── StaggerContainer ─────────────────────────────────────────────────────────
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

const staggerVariants = (staggerDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay },
  },
});

const staggerChildVariants: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

export const StaggerContainer: React.FC<StaggerContainerProps & HTMLMotionProps<'div'>> = ({
  children,
  staggerDelay = 0.12,
  className = '',
  once = true,
  ...props
}) => (
  <motion.div
    variants={staggerVariants(staggerDelay)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once, margin: '-80px' }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/** Use this as direct child of <StaggerContainer> */
export const StaggerItem: React.FC<HTMLMotionProps<'div'>> = ({
  children,
  className = '',
  ...props
}) => (
  <motion.div variants={staggerChildVariants} className={className} {...props}>
    {children}
  </motion.div>
);
