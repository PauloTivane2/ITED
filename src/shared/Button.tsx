import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, icon, children, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center gap-2 font-medium tracking-wide rounded-xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:ring-offset-2 focus:ring-offset-[#05070E] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none active:scale-[0.98] select-none";
    
    const variants = {
      primary: "bg-[#D4AF37] hover:bg-[#E2BE4B] text-[#070C18] font-semibold border border-[#FFF5DC]/50 shadow-[0_1px_2px_rgba(0,0,0,0.4),0_0_16px_rgba(212,175,55,0.22)] hover:shadow-[0_0_24px_rgba(212,175,55,0.38)]",
      secondary: "bg-[#0A1020]/80 hover:bg-[#121B32]/90 text-slate-200 hover:text-white border border-white/[0.12] hover:border-[#D4AF37]/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md",
      outline: "border border-[#D4AF37]/35 text-[#E5C368] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] bg-transparent backdrop-blur-sm",
      ghost: "text-slate-300 hover:text-[#E5C368] hover:bg-white/[0.05] bg-transparent",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-2 min-h-[38px]",
      md: "text-sm px-5 py-2.5 min-h-[44px]",
      lg: "text-sm sm:text-base px-6 py-3.5 min-h-[48px]",
    };

    const widthClass = fullWidth ? "w-full" : "";

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

    return (
      <button
        ref={ref}
        className={classes.trim()}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
