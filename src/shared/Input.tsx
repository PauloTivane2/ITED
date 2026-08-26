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
            className="text-2xs font-semibold uppercase tracking-[0.14em] text-slate-400 group-focus-within:text-[#D4AF37] transition-colors duration-150"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full rounded-xl border text-sm px-4 py-3 min-h-[44px]
            bg-[#070C18]/85 backdrop-blur-md text-slate-100 placeholder:text-slate-500
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]
            hover:border-white/[0.18]
            ${error ? 'border-red-400/80 focus:border-red-400 focus:ring-red-400/20' : 'border-white/[0.09]'}
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]
            ${className}
          `}
          {...props}
        />
        {(error || helperText) && (
          <span className={`text-xs font-medium mt-0.5 ${error ? 'text-red-400' : 'text-slate-400'}`}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
