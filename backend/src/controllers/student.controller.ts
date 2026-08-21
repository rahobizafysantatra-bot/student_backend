import { Request, Response } from 'express';
import * as studentService from '../services/student.service';
import { ValidationError } from '../services/student.service';

export const getAll = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const student = await studentService.getStudentById(id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const newStudent = await studentService.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: 'Invalid data', errors: err.errors });
    }
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updated = await studentService.updateStudent(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(updated);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: 'Invalid data', errors: err.errors });
    }
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await studentService.deleteStudent(id);
    if (!deleted) return res.status(404).json({ message: 'Student not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};

export const stats = async (req: Request, res: Response) => {
  try {
    const statistics = await studentService.getStatistics();
    res.status(200).json(statistics);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};