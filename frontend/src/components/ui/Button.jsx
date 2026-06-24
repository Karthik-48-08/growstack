import React from 'react';
import { cn } from '../../lib/utils';

export function Button({ children, className, variant = 'primary', ...props }) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary hover:bg-[#e66000] text-white shadow-[0_0_15px_rgba(255,107,0,0.4)] hover:shadow-[0_0_25px_rgba(255,107,0,0.6)]",
    secondary: "bg-secondary hover:bg-[#00bde6] text-black shadow-[0_0_15px_rgba(0,212,255,0.4)]",
    outline: "border border-glassBorder hover:bg-glass text-white",
    ghost: "hover:bg-glass text-white",
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
