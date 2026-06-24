import React from 'react';
import { cn } from '../../lib/utils';

export function GradientText({ children, className, as = 'span', ...props }) {
  const Component = as;
  return (
    <Component className={cn("text-gradient", className)} {...props}>
      {children}
    </Component>
  );
}
