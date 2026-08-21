import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/user.repository';
import { generateToken } from '../security/jwt.utils';

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Email already in use');
  }
}

export const login = async (email: string, password: string): Promise<string | null> => {
  const user = await userRepository.findByEmail(email);
  if (!user || !user.id) return null;

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) return null;

  return generateToken({ id: user.id });
};

export const signup = async (email: string, password: string): Promise<string> => {
  const existing = await userRepository.findByEmail(email);
  if (existing) throw new EmailAlreadyExistsError();

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userRepository.insert(email, passwordHash);

  return generateToken({ id: user.id! });
};