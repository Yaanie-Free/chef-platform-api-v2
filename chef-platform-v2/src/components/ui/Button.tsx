'use client';

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * Button Variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Button Props Interface
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Loading state */
  isLoading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
  rightIcon?: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Children */
  children?: React.ReactNode;
}

/**
 * Variant styles
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-950 disabled:bg-gray-400',
  secondary: 'bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50 active:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300',
  ghost: 'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-400',
  outline: 'bg-transparent text-gray-900 border border-gray-300 hover:border-gray-900 hover:bg-gray-50 active:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-300',
};

/**
 * Size styles
 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  xl: 'h-14 px-8 text-lg',
};

/**
 * Production-grade Button component
 * - Fully typed with TypeScript
 * - Accessibility compliant
 * - Loading states
 * - Multiple variants and sizes
 * - Responsive
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 font-medium rounded-lg',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-60',
          
          // Variant styles
          variantStyles[variant],
          
          // Size styles
          sizeStyles[size],
          
          // Full width
          fullWidth && 'w-full',
          
          // Custom className
          className
        )}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <Loader2 
            className="w-4 h-4 animate-spin" 
            aria-label="Loading"
          />
        )}

        {/* Left icon */}
        {!isLoading && leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Button text */}
        {children && <span>{children}</span>}

        {/* Right icon */}
        {!isLoading && rightIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Icon Button - Square button for icons only
 */
interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children'> {
  icon: React.ReactNode;
  'aria-label': string; // Required for accessibility
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', className, ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-14 h-14',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-60',
          variantStyles[props.variant || 'ghost'],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

/**
 * Button Group - For grouped buttons
 */
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function ButtonGroup({ 
  children, 
  className, 
  orientation = 'horizontal' 
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        'inline-flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        '[&>button]:rounded-none',
        orientation === 'horizontal' 
          ? '[&>button:first-child]:rounded-l-lg [&>button:last-child]:rounded-r-lg'
          : '[&>button:first-child]:rounded-t-lg [&>button:last-child]:rounded-b-lg',
        '[&>button:not(:last-child)]:border-r-0',
        className
      )}
      role="group"
    >
      {children}
    </div>
  );
}
