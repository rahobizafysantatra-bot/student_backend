import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { validateLogin } from '../services/auth.validation';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const validation = validateLogin(email, password);
    if (!validation.valid) {
      return res.status(400).json({ message: 'Invalid data', errors: validation.errors });
    }

    const token = await authService.login(email, password);

    if (!token) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};