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
      <div className="flex flex-col gap-1.5 w-full group">
        {label && (
          <label 
            htmlFor={inputId} 
            className="text-xs font-semibold uppercase tracking-wider text-slate-300 group-focus-within:text-accent transition-colors duration-fast"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full rounded-xl border text-sm px-4 py-3.5 min-h-[48px]
            bg-[#060911] text-white transition-all duration-normal
            focus:outline-none focus:ring-1 focus:ring-accent/30 focus:border-accent
            placeholder:text-slate-500
            hover:border-white/20
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-white/10'}
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        {(error || helperText) && (
          <span className={`text-xs font-medium ${error ? 'text-red-400' : 'text-slate-400'}`}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
