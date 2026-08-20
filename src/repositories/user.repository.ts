import { pool } from '../config/db';
import { User } from '../models/user.model';

export const findByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};