// src/components/ui/Input.tsx
'use client';

import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * Input Props Interface
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Success message */
  success?: string;
  /** Helper text */
  helperText?: string;
  /** Icon to display before input */
  leftIcon?: React.ReactNode;
  /** Icon to display after input */
  rightIcon?: React.ReactNode;
  /** Full width input */
  fullWidth?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
  /** Container className */
  containerClassName?: string;
}

/**
 * Size styles
 */
const sizeStyles = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

/**
 * Production-grade Input component
 * - Fully typed with TypeScript
 * - Accessibility compliant
 * - Validation states
 * - Password toggle
 * - Icon support
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      size = 'md',
      className,
      containerClassName,
      type = 'text',
      disabled,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;
    const isPasswordType = type === 'password';
    const inputType = isPasswordType && showPassword ? 'text' : type;

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium text-gray-700',
              disabled && 'text-gray-400',
              hasError && 'text-red-600'
            )}
          >
            {label}
            {required && <span className="text-red-600 ml-1" aria-label="required">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              // Base styles
              'w-full rounded-lg border bg-white transition-all duration-200',
              'text-gray-900 placeholder-gray-400',
              'focus:outline-none focus:ring-2',
              
              // Size
              sizeStyles[size],
              
              // With icons
              leftIcon && 'pl-10',
              (rightIcon || isPasswordType || hasError || hasSuccess) && 'pr-10',
              
              // States
              !hasError && !hasSuccess && !disabled && [
                'border-gray-300',
                'focus:border-gray-900 focus:ring-gray-900',
                'hover:border-gray-400'
              ],
              hasError && [
                'border-red-500',
                'focus:border-red-600 focus:ring-red-600'
              ],
              hasSuccess && [
                'border-green-500',
                'focus:border-green-600 focus:ring-green-600'
              ],
              disabled && [
                'bg-gray-100 cursor-not-allowed',
                'border-gray-200 text-gray-500'
              ],
              
              // Custom className
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : 
              success ? `${inputId}-success` : 
              helperText ? `${inputId}-helper` : 
              undefined
            }
            {...props}
          />

          {/* Right Icon / Status Icon / Password Toggle */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {hasError && (
              <AlertCircle 
                className="w-5 h-5 text-red-500" 
                aria-hidden="true"
              />
            )}
            {hasSuccess && !hasError && (
              <CheckCircle2 
                className="w-5 h-5 text-green-500" 
                aria-hidden="true"
              />
            )}
            {isPasswordType && !hasError && !hasSuccess && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
            {rightIcon && !isPasswordType && !hasError && !hasSuccess && (
              <div className="text-gray-400">
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p 
            id={`${inputId}-error`}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Success Message */}
        {success && !error && (
          <p 
            id={`${inputId}-success`}
            className="text-sm text-green-600"
          >
            {success}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && !success && (
          <p 
            id={`${inputId}-helper`}
            className="text-sm text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/**
 * Textarea Component
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  fullWidth?: boolean;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      fullWidth = false,
      containerClassName,
      disabled,
      required,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'text-sm font-medium text-gray-700',
              disabled && 'text-gray-400',
              hasError && 'text-red-600'
            )}
          >
            {label}
            {required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          required={required}
          className={cn(
            'w-full rounded-lg border bg-white transition-all duration-200',
            'text-gray-900 placeholder-gray-400',
            'focus:outline-none focus:ring-2',
            'px-4 py-3 text-sm min-h-[100px]',
            
            !hasError && !hasSuccess && !disabled && [
              'border-gray-300',
              'focus:border-gray-900 focus:ring-gray-900',
              'hover:border-gray-400'
            ],
            hasError && [
              'border-red-500',
              'focus:border-red-600 focus:ring-red-600'
            ],
            hasSuccess && [
              'border-green-500',
              'focus:border-green-600 focus:ring-green-600'
            ],
            disabled && [
              'bg-gray-100 cursor-not-allowed',
              'border-gray-200 text-gray-500'
            ],
            
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${textareaId}-error` : 
            success ? `${textareaId}-success` : 
            helperText ? `${textareaId}-helper` : 
            undefined
          }
          {...props}
        />

        {/* Error Message */}
        {error && (
          <p 
            id={`${textareaId}-error`}
            className="text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Success Message */}
        {success && !error && (
          <p 
            id={`${textareaId}-success`}
            className="text-sm text-green-600"
          >
            {success}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && !success && (
          <p 
            id={`${textareaId}-helper`}
            className="text-sm text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';