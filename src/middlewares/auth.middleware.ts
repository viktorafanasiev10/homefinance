// isAuthenticated.middleware.ts

import { Request, Response, NextFunction } from 'express';

export function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({ error: 'User is not authenticated' });
}
