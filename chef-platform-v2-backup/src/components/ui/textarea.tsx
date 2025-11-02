'use client';

import React, { memo, forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Textarea Component - Premium UI textarea for Table & Plate
 * Production-grade with accessibility, error handling, and character counting
 */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  showCharCount?: boolean;
  maxCharacters?: number;
}

export const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({
      className,
      error,
      showCharCount = false,
      maxCharacters,
      value,
      onChange,
      ...props
    }, ref) => {
      const currentLength = typeof value === 'string' ? value.length : 0;
      const hasError = !!error;

      return (
        <div className="w-full">
          <textarea
            ref={ref}
            className={cn(
              'flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2',
              'text-sm text-gray-900 placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-all duration-200',
              'resize-y',
              hasError && 'border-red-600 focus:ring-red-600',
              className
            )}
            value={value}
            onChange={onChange}
            maxLength={maxCharacters}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? 'textarea-error' : showCharCount ? 'textarea-count' : undefined
            }
            {...props}
          />

          {/* Error Message */}
          {hasError && (
            <p
              id="textarea-error"
              className="mt-1.5 text-xs text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Character Count */}
          {showCharCount && maxCharacters && (
            <p
              id="textarea-count"
              className={cn(
                'mt-1.5 text-xs text-right',
                currentLength > maxCharacters * 0.9 ? 'text-red-600' : 'text-gray-400'
              )}
              aria-live="polite"
            >
              {currentLength} / {maxCharacters}
            </p>
          )}
        </div>
      );
    }
  )
);

Textarea.displayName = 'Textarea';
