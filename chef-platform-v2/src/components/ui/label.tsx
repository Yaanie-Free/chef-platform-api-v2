'use client';

import React, { memo, forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Label Component - Premium UI label for Table & Plate
 * Production-grade with accessibility and error states
 */

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  error?: boolean;
}

export const Label = memo(
  forwardRef<HTMLLabelElement, LabelProps>(
    ({
      className,
      required = false,
      error = false,
      children,
      ...props
    }, ref) => {
      return (
        <label
          ref={ref}
          className={cn(
            'text-sm font-medium leading-none text-gray-900',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            error && 'text-red-600',
            className
          )}
          {...props}
        >
          {children}
          {required && (
            <span className="ml-1 text-red-600" aria-label="required">
              *
            </span>
          )}
        </label>
      );
    }
  )
);

Label.displayName = 'Label';
