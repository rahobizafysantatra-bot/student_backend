import { pool } from '../config/db';
import { Student } from '../models/student.model';

export const findAll = async (): Promise<Student[]> => {
  const result = await pool.query('SELECT * FROM students ORDER BY id');
  return result.rows;
};

export const findById = async (id: number): Promise<Student | null> => {
  const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const insert = async (student: Student): Promise<Student> => {
  const { nom, groupe } = student;
  const result = await pool.query(
    'INSERT INTO students (nom, groupe) VALUES ($1, $2) RETURNING *',
    [nom, groupe]
  );
  return result.rows[0];
};

export const update = async (id: number, student: Student): Promise<Student | null> => {
  const { nom, groupe } = student;
  const result = await pool.query(
    'UPDATE students SET nom = $1, groupe = $2 WHERE id = $3 RETURNING *',
    [nom, groupe, id]
  );
  return result.rows[0] || null;
};

export const remove = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM students WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};