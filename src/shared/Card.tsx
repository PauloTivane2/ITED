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
      subtle: "shadow-[0_2px_10px_rgba(0,0,0,0.3)]",
      soft: "shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
      medium: "shadow-[0_8px_30px_rgba(0,0,0,0.5)]",
      strong: "shadow-[0_16px_48px_rgba(0,0,0,0.65)]",
    };

    const hoverClass = hoverable 
      ? "hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.12)] cursor-pointer" 
      : "";

    const glowClass = glowing 
      ? "border-[#D4AF37]/35 shadow-[0_0_25px_rgba(212,175,55,0.15)]"
      : "";

    return (
      <div
        ref={ref}
        className={`bg-[#080E1C]/65 backdrop-blur-xl rounded-2xl border border-white/[0.08] text-slate-100 transition-all duration-300 ease-out shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] active:scale-[0.99] ${elevations[elevation]} ${hoverClass} ${glowClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
