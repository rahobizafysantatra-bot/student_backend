import { pool } from '../config/db';
import { Student } from '../models/student.model';

export const findAll = async (): Promise<Student[]> => {
  const result = await pool.query(
    'SELECT id, nom AS name, email, groupe AS "group" FROM students ORDER BY id'
  );
  return result.rows;
};

export const findById = async (id: number): Promise<Student | null> => {
  const result = await pool.query(
    'SELECT id, nom AS name, email, groupe AS "group" FROM students WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
};

export const insert = async (student: Student): Promise<Student> => {
  const { name, email, group } = student;
  const result = await pool.query(
    'INSERT INTO students (nom, email, groupe) VALUES ($1, $2, $3) RETURNING id, nom AS name, email, groupe AS "group"',
    [name, email, group]
  );
  return result.rows[0];
};

export const update = async (id: number, student: Student): Promise<Student | null> => {
  const { name, email, group } = student;
  const result = await pool.query(
    'UPDATE students SET nom = $1, email = $2, groupe = $3 WHERE id = $4 RETURNING id, nom AS name, email, groupe AS "group"',
    [name, email, group, id]
  );
  return result.rows[0] || null;
};

export const remove = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM students WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};

export const countByGroup = async (): Promise<{ group: string; total: number }[]> => {
  const result = await pool.query(
    'SELECT groupe AS "group", COUNT(*)::int AS total FROM students GROUP BY groupe ORDER BY groupe'
  );
  return result.rows;
};

export const countAll = async (): Promise<number> => {
  const result = await pool.query('SELECT COUNT(*)::int AS total FROM students');
  return result.rows[0].total;
};