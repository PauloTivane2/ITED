import React, { HTMLAttributes } from 'react';

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /** Gap between items (Tailwind class) */
  gap?: string;
  /** Horizontal padding (Tailwind class) */
  padding?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  className = '',
  gap = 'gap-4',
  padding = 'px-4',
  ...props
}) => {
  return (
    <div
      className={`flex ${gap} overflow-x-auto snap-x snap-mandatory ${padding} scrollbar-none ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/** Wrapper for carousel items — adds snap alignment */
export const CarouselItem: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`snap-start shrink-0 ${className}`} {...props}>
      {children}
    </div>
  );
};
