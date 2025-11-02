'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Badge Component - Premium UI badge for Table & Plate
 * Production-grade with variants and accessibility
 */

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const badgeVariants = {
  default: 'bg-gray-900 text-white hover:bg-gray-800',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  outline: 'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-50',
  success: 'bg-green-600 text-white hover:bg-green-700',
  warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
  error: 'bg-red-600 text-white hover:bg-red-700',
};

const badgeSizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
  lg: 'text-base px-3 py-1',
};

export const Badge = memo<BadgeProps>(({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      role="status"
      {...props}
    >
      {children}
    </div>
  );
});

Badge.displayName = 'Badge';
