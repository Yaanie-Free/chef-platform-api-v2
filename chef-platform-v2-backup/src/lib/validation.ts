// src/lib/validation.ts
// Comprehensive validation with detailed error messages

import { 
  validateEmail, 
  validateMobile, 
  isValidImage 
} from './utils';
import type { 
  SignupFormData, 
  ChefSignupFormData, 
  ValidationResult,
  FormErrors 
} from '@/types';

/**
 * Validation error messages
 */
const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  MOBILE_INVALID: 'Please enter a valid mobile number (+27XXXXXXXXX or 0XXXXXXXXX)',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  PASSWORD_NO_UPPERCASE: 'Password must contain at least one uppercase letter',
  PASSWORD_NO_LOWERCASE: 'Password must contain at least one lowercase letter',
  PASSWORD_NO_NUMBER: 'Password must contain at least one number',
  PASSWORD_NO_SPECIAL: 'Password must contain at least one special character',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  FILE_REQUIRED: 'Profile photo is required',
  FILE_TOO_LARGE: 'File size must be less than 5MB',
  FILE_INVALID_TYPE: 'Only JPEG, PNG, and WebP images are allowed',
  BIO_TOO_SHORT: 'Bio must be at least 50 characters',
  EXPERIENCE_INVALID: 'Years of experience must be between 0 and 50',
  PRICE_INVALID: 'Please enter valid price range',
  PORTFOLIO_REQUIRED: 'At least 3 portfolio images are required',
} as const;

/**
 * Validate required field
 */
function validateRequired(value: any, fieldName: string): string | undefined {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return ERROR_MESSAGES.REQUIRED;
  }
  return undefined;
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): ValidationResult {
  const errors: FormErrors = {};

  if (password.length < 8) {
    errors.password = ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }

  if (!/[A-Z]/.test(password)) {
    errors.password = ERROR_MESSAGES.PASSWORD_NO_UPPERCASE;
  }

  if (!/[a-z]/.test(password)) {
    errors.password = ERROR_MESSAGES.PASSWORD_NO_LOWERCASE;
  }

  if (!/[0-9]/.test(password)) {
    errors.password = ERROR_MESSAGES.PASSWORD_NO_NUMBER;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.password = ERROR_MESSAGES.PASSWORD_NO_SPECIAL;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate customer signup form
 */
export function validateCustomerSignup(data: Partial<SignupFormData>): ValidationResult {
  const errors: FormErrors = {};

  // First name
  const firstNameError = validateRequired(data.firstName, 'firstName');
  if (firstNameError) errors.firstName = firstNameError;

  // Last name
  const lastNameError = validateRequired(data.lastName, 'lastName');
  if (lastNameError) errors.lastName = lastNameError;

  // Email
  const emailError = validateRequired(data.email, 'email');
  if (emailError) {
    errors.email = emailError;
  } else if (data.email && !validateEmail(data.email)) {
    errors.email = ERROR_MESSAGES.EMAIL_INVALID;
  }

  // Mobile
  const mobileError = validateRequired(data.mobile, 'mobile');
  if (mobileError) {
    errors.mobile = mobileError;
  } else if (data.mobile && !validateMobile(data.mobile)) {
    errors.mobile = ERROR_MESSAGES.MOBILE_INVALID;
  }

  // City
  const cityError = validateRequired(data.city, 'city');
  if (cityError) errors.city = cityError;

  // Password
  if (data.password) {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors.password;
    }
  } else {
    errors.password = ERROR_MESSAGES.REQUIRED;
  }

  // Profile photo (optional for customers)
  if (data.profilePhoto && !isValidImage(data.profilePhoto)) {
    errors.profilePhoto = ERROR_MESSAGES.FILE_INVALID_TYPE;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate chef signup form
 */
export function validateChefSignup(data: Partial<ChefSignupFormData>): ValidationResult {
  // First validate basic customer fields
  const basicValidation = validateCustomerSignup(data);
  const errors: FormErrors = { ...basicValidation.errors };

  // Profile photo is REQUIRED for chefs
  if (!data.profilePhoto) {
    errors.profilePhoto = ERROR_MESSAGES.FILE_REQUIRED;
  } else if (!isValidImage(data.profilePhoto)) {
    errors.profilePhoto = ERROR_MESSAGES.FILE_INVALID_TYPE;
  }

  // Bio
  const bioError = validateRequired(data.bio, 'bio');
  if (bioError) {
    errors.bio = bioError;
  } else if (data.bio && data.bio.length < 50) {
    errors.bio = ERROR_MESSAGES.BIO_TOO_SHORT;
  }

  // Specialties
  if (!data.specialties || data.specialties.length === 0) {
    errors.specialties = 'Please select at least one specialty';
  }

  // Years of experience
  if (data.yearsExperience === undefined) {
    errors.yearsExperience = ERROR_MESSAGES.REQUIRED;
  } else if (data.yearsExperience < 0 || data.yearsExperience > 50) {
    errors.yearsExperience = ERROR_MESSAGES.EXPERIENCE_INVALID;
  }

  // Price range
  if (!data.priceRange) {
    errors.priceRange = ERROR_MESSAGES.REQUIRED;
  } else {
    if (!data.priceRange.min || !data.priceRange.max) {
      errors.priceRange = ERROR_MESSAGES.PRICE_INVALID;
    } else if (data.priceRange.min > data.priceRange.max) {
      errors.priceRange = 'Minimum price cannot be greater than maximum price';
    }
  }

  // Portfolio images
  if (!data.portfolioImages || data.portfolioImages.length < 3) {
    errors.portfolioImages = ERROR_MESSAGES.PORTFOLIO_REQUIRED;
  } else {
    const invalidImages = data.portfolioImages.filter(img => !isValidImage(img));
    if (invalidImages.length > 0) {
      errors.portfolioImages = `${invalidImages.length} image(s) are invalid`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate booking form
 */
export function validateBooking(data: any): ValidationResult {
  const errors: FormErrors = {};

  if (!data.date) {
    errors.date = ERROR_MESSAGES.REQUIRED;
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.date = 'Please select a future date';
    }
  }

  if (!data.time) {
    errors.time = ERROR_MESSAGES.REQUIRED;
  }

  if (!data.guests || data.guests < 1) {
    errors.guests = 'Number of guests must be at least 1';
  }

  if (!data.serviceType) {
    errors.serviceType = ERROR_MESSAGES.REQUIRED;
  }

  if (!data.address || !data.address.streetAddress) {
    errors.address = 'Please provide a complete address';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate review form
 */
export function validateReview(data: any): ValidationResult {
  const errors: FormErrors = {};

  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.rating = 'Please provide a rating between 1 and 5';
  }

  if (!data.comment || data.comment.trim().length < 10) {
    errors.comment = 'Review must be at least 10 characters';
  }

  // Validate category ratings if provided
  if (data.categories) {
    const categories = ['foodQuality', 'professionalism', 'communication', 'valueForMoney'];
    categories.forEach(category => {
      const value = data.categories[category];
      if (value && (value < 1 || value > 5)) {
        errors[`categories.${category}`] = 'Rating must be between 1 and 5';
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate and sanitize search query
 */
export function validateSearchQuery(query: string): string {
  const sanitized = sanitizeInput(query.trim());
  return sanitized.substring(0, 100); // Limit to 100 characters
}

/**
 * Export all error messages for reuse
 */
export { ERROR_MESSAGES };