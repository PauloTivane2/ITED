import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, icon, children, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-normal ease-smooth focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none active:scale-[0.97] overflow-hidden";
    
    const variants = {
      primary: "bg-gradient-accent text-white hover:shadow-glow hover:-translate-y-0.5",
      secondary: "bg-primary text-white hover:bg-secondary hover:shadow-medium hover:-translate-y-0.5",
      outline: "border-2 border-muted text-secondary hover:border-accent hover:text-accent hover:shadow-soft hover:-translate-y-0.5 bg-transparent",
      ghost: "text-secondary hover:bg-accent/5 hover:text-accent bg-transparent",
    };

    const sizes = {
      sm: "text-sm px-4 py-2 rounded-lg",
      md: "text-base px-6 py-3",
      lg: "text-lg px-8 py-4",
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
