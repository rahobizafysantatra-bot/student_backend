import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { validateLogin, validateSignup } from '../services/auth.validation';
import { EmailAlreadyExistsError } from '../services/auth.service';

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

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const validation = validateSignup(email, password);
    if (!validation.valid) {
      return res.status(400).json({ message: 'Invalid data', errors: validation.errors });
    }

    const token = await authService.signup(email, password);
    res.status(201).json({ token });
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return res.status(409).json({ message: err.message });
    }
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};