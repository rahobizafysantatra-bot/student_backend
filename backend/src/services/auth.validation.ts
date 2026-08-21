const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export const validateLogin = (email?: string, password?: string): ValidationResult => {
  const errors: string[] = [];

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Email format is invalid');
  }

  if (!password || password.trim().length === 0) {
    errors.push('Password is required');
  }

  return { valid: errors.length === 0, errors };
};

const MIN_PASSWORD_LENGTH = 6;

export const validateSignup = (email?: string, password?: string): ValidationResult => {
  const errors: string[] = [];

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Email format is invalid');
  }

  if (!password || password.trim().length === 0) {
    errors.push('Password is required');
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
  }

  return { valid: errors.length === 0, errors };
};