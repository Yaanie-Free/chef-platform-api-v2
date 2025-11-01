// src/lib/error-handler.ts
// Centralized error handling and logging

import type { ApiError } from '@/types';

/**
 * Custom error classes
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = 'INTERNAL_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTHENTICATION_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(message, 'CONFLICT', 409);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 'RATE_LIMIT_EXCEEDED', 429);
    this.name = 'RateLimitError';
  }
}

/**
 * Logger utility
 */
class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Log info message
   */
  info(message: string, meta?: any): void {
    if (this.isDevelopment) {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta || '');
    }
    // In production, send to logging service (e.g., Sentry, LogRocket)
  }

  /**
   * Log warning
   */
  warn(message: string, meta?: any): void {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta || '');
    // In production, send to logging service
  }

  /**
   * Log error
   */
  error(error: Error | AppError, context?: string): void {
    const errorDetails = {
      message: error.message,
      name: error.name,
      stack: this.isDevelopment ? error.stack : undefined,
      context,
      timestamp: new Date().toISOString(),
    };

    console.error(`[ERROR] ${new Date().toISOString()}:`, errorDetails);

    // In production, send to error tracking service (Sentry)
    if (!this.isDevelopment) {
      this.sendToErrorTracker(error, context);
    }
  }

  /**
   * Log debug info (development only)
   */
  debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, data || '');
    }
  }

  /**
   * Send error to tracking service
   */
  private sendToErrorTracker(error: Error, context?: string): void {
    // Implement Sentry or other error tracking service
    // Example: Sentry.captureException(error, { extra: { context } });
  }

  /**
   * Log API request
   */
  apiRequest(method: string, url: string, userId?: string): void {
    this.info(`API ${method} ${url}`, { userId });
  }

  /**
   * Log API response
   */
  apiResponse(method: string, url: string, statusCode: number, duration: number): void {
    this.info(`API ${method} ${url} - ${statusCode} (${duration}ms)`);
  }
}

export const logger = new Logger();

/**
 * Error handler for API routes
 */
export function handleApiError(error: unknown): ApiError {
  if (error instanceof AppError) {
    logger.error(error, 'API Error');
    return {
      code: error.code,
      message: error.message,
      details: error.isOperational ? undefined : 'An unexpected error occurred',
    };
  }

  if (error instanceof Error) {
    logger.error(error, 'Unexpected Error');
    return {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'An unexpected error occurred',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };
  }

  logger.error(new Error(String(error)), 'Unknown Error');
  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
  };
}

/**
 * Global error handler for uncaught errors
 */
export function setupGlobalErrorHandlers(): void {
  if (typeof window !== 'undefined') {
    // Client-side error handler
    window.addEventListener('error', (event) => {
      logger.error(event.error, 'Uncaught Error');
      event.preventDefault();
    });

    window.addEventListener('unhandledrejection', (event) => {
      logger.error(new Error(String(event.reason)), 'Unhandled Promise Rejection');
      event.preventDefault();
    });
  }
}

/**
 * Try-catch wrapper for async functions
 */
export async function tryCatch<T>(
  fn: () => Promise<T>,
  context?: string
): Promise<[T | null, Error | null]> {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    logger.error(error as Error, context);
    return [null, error as Error];
  }
}

/**
 * Assert condition is true, throw error if false
 */
export function assert(condition: boolean, message: string, code?: string): asserts condition {
  if (!condition) {
    throw new AppError(message, code || 'ASSERTION_ERROR', 500);
  }
}

/**
 * Check if error is operational (safe to show to user)
 */
export function isOperationalError(error: Error): boolean {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}

/**
 * Format error for client display
 */
export function formatErrorForClient(error: unknown): string {
  if (error instanceof AppError && error.isOperational) {
    return error.message;
  }

  if (error instanceof Error) {
    return process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'Something went wrong. Please try again.';
  }

  return 'An unexpected error occurred';
}

/**
 * Performance monitoring
 */
export class PerformanceMonitor {
  private startTime: number;
  private label: string;

  constructor(label: string) {
    this.label = label;
    this.startTime = performance.now();
  }

  end(): void {
    const duration = performance.now() - this.startTime;
    logger.debug(`${this.label} completed in ${duration.toFixed(2)}ms`);
    
    // Log slow operations
    if (duration > 1000) {
      logger.warn(`Slow operation: ${this.label} took ${duration.toFixed(2)}ms`);
    }
  }
}

/**
 * Retry failed operations with exponential backoff
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  options: {
    maxRetries?: number;
    baseDelay?: number;
    maxDelay?: number;
    context?: string;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    context = 'Operation',
  } = options;

  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries - 1) {
        const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
        logger.warn(`${context} failed (attempt ${attempt + 1}/${maxRetries}), retrying in ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  logger.error(lastError!, `${context} failed after ${maxRetries} attempts`);
  throw lastError!;
}

/**
 * Circuit breaker pattern for failing services
 */
export class CircuitBreaker {
  private failures = 0;
  private lastFailureTime: number | null = null;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(
    private readonly threshold: number = 5,
    private readonly timeout: number = 60000 // 1 minute
  ) {}

  async execute<T>(operation: () => Promise<T>, context?: string): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - (this.lastFailureTime || 0) > this.timeout) {
        this.state = 'half-open';
        logger.info(`Circuit breaker half-open for ${context}`);
      } else {
        throw new AppError('Service temporarily unavailable', 'SERVICE_UNAVAILABLE', 503);
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    if (this.state === 'half-open') {
      this.state = 'closed';
      logger.info('Circuit breaker closed');
    }
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.threshold) {
      this.state = 'open';
      logger.error(
        new Error('Circuit breaker opened due to repeated failures'),
        'Circuit Breaker'
      );
    }
  }
}