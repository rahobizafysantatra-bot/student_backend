import type { Request, Response } from 'express';
import * as studentService from '../services/student.service.js';

export const getAll = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const student = await studentService.getStudentById(id);
    if (!student) return res.status(404).json({ message: 'Étudiant introuvable' });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { nom, groupe } = req.body;
    if (!nom || !groupe) {
      return res.status(400).json({ message: 'nom et groupe sont requis' });
    }
    const newStudent = await studentService.createStudent({ nom, groupe });
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nom, groupe } = req.body;
    const updated = await studentService.updateStudent(id, { nom, groupe });
    if (!updated) return res.status(404).json({ message: 'Étudiant introuvable' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await studentService.deleteStudent(id);
    if (!deleted) return res.status(404).json({ message: 'Étudiant introuvable' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};