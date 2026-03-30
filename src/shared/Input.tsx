import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    
    const inputId = id || `input-${Math.random().toString(36).substring(7)}`;

    return (
      <div className="flex flex-col gap-2 w-full group">
        {label && (
          <label 
            htmlFor={inputId} 
            className="text-sm font-semibold text-secondary group-focus-within:text-accent transition-colors duration-fast"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full rounded-xl border-2 text-[16px] px-4 py-3.5 min-h-[48px]
            bg-white text-primary transition-all duration-normal ease-smooth
            focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent focus:shadow-glow
            placeholder:text-secondary/40
            hover:border-secondary/30
            ${error ? 'border-red-400 focus:ring-red-500/10 focus:border-red-500 focus:shadow-none' : 'border-muted'}
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface
            ${className}
          `}
          {...props}
        />
        {(error || helperText) && (
          <span className={`text-sm font-medium ${error ? 'text-red-500' : 'text-secondary/60'}`}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
