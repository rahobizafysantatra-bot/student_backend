import { Student } from '../models/student.model';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_GROUPS = ['N1', 'N2', 'N3'];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export const validateStudent = (data: Partial<Student>): ValidationResult => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.push('Email format is invalid');
  }

  if (!data.group || !VALID_GROUPS.includes(data.group)) {
    errors.push('Group must be N1, N2 or N3');
  }

  return { valid: errors.length === 0, errors };
};