import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export function GlassCard({ children, className, hoverEffect = false, ...props }) {
  const Component = hoverEffect ? motion.div : 'div';
  
  const hoverProps = hoverEffect ? {
    whileHover: { y: -5, boxShadow: '0 10px 30px -10px rgba(255, 107, 0, 0.2)' },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component 
      className={cn("glass-panel p-6 sm:p-8", className)}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
}
