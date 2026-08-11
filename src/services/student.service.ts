import * as studentRepository from '../repositories/student.repository';
import { Student } from '../models/student.model';

export const getAllStudents = async (): Promise<Student[]> => {
  return studentRepository.findAll();
};

export const getStudentById = async (id: number): Promise<Student | null> => {
  return studentRepository.findById(id);
};

export const createStudent = async (student: Student): Promise<Student> => {
  return studentRepository.insert(student);
};

export const updateStudent = async (id: number, student: Student): Promise<Student | null> => {
  return studentRepository.update(id, student);
};

export const deleteStudent = async (id: number): Promise<boolean> => {
  return studentRepository.remove(id);
};