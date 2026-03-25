import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: 'none' | 'subtle' | 'soft' | 'medium' | 'strong';
  hoverable?: boolean;
  glowing?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', elevation = 'soft', hoverable = false, glowing = false, children, ...props }, ref) => {
    
    const elevations = {
      none: "shadow-none",
      subtle: "shadow-subtle",
      soft: "shadow-soft",
      medium: "shadow-medium",
      strong: "shadow-strong",
    };

    const hoverClass = hoverable 
      ? "hover:-translate-y-2 hover:shadow-medium cursor-pointer" 
      : "";

    const glowClass = glowing 
      ? "hover:shadow-glow"
      : "";

    return (
      <div
        ref={ref}
        className={`bg-white rounded-2xl border border-muted/40 overflow-hidden transition-all duration-normal ease-smooth ${elevations[elevation]} ${hoverClass} ${glowClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
