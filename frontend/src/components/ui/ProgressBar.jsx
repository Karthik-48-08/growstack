import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export function ProgressBar({ progress = 0, className, colorClass = "bg-primary" }) {
  // progress should be between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn("w-full bg-glassBorder rounded-full h-2 overflow-hidden", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${normalizedProgress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn("h-full rounded-full", colorClass)}
      />
    </div>
  );
}
