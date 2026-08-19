import * as studentRepository from '../repositories/student.repository';
import { validateStudent } from './student.validation';
import { Student } from '../models/student.model';

export class ValidationError extends Error {
  errors: string[];
  constructor(errors: string[]) {
    super('Validation failed');
    this.errors = errors;
  }
}

export const getAllStudents = async (): Promise<Student[]> => {
  return studentRepository.findAll();
};

export const getStudentById = async (id: number): Promise<Student | null> => {
  return studentRepository.findById(id);
};

export const createStudent = async (student: Student): Promise<Student> => {
  const validation = validateStudent(student);
  if (!validation.valid) throw new ValidationError(validation.errors);
  return studentRepository.insert(student);
};

export const updateStudent = async (id: number, student: Student): Promise<Student | null> => {
  const validation = validateStudent(student);
  if (!validation.valid) throw new ValidationError(validation.errors);
  return studentRepository.update(id, student);
};

export const deleteStudent = async (id: number): Promise<boolean> => {
  return studentRepository.remove(id);
};

export const getStatistics = async () => {
  const total = await studentRepository.countAll();
  const byGroup = await studentRepository.countByGroup();
  return { total, byGroup };
};