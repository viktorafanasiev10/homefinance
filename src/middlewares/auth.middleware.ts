import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const secret = process.env.JWT_SECRET || 'your-secret-key';

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload; // Add user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};
