import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/user.repository';
import { generateToken } from '../security/jwt.utils';

export const login = async (email: string, password: string): Promise<string | null> => {
  const user = await userRepository.findByEmail(email);
  if (!user || !user.id) return null;

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return null;

  return generateToken({ id: user.id });
};