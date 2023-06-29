import  { Request } from 'express-serve-static-core';
import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { User } from '../models';

class AuthController {
  public async register(req: any, res: any): Promise<void> {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }

  public login(req: any, res: any, next: NextFunction): void {
    passport.authenticate('local', (err: any, user: User) => {
      if (err) throw err;
      if (!user) res.status(400).send("No User Exists");
      else {
        req.logIn(user, (err: any) => {
          if (err) throw err;
          res.status(200).send("Successfully Authenticated");
        });
      }
    })(req, res, next);
  }
}

export const authController = new AuthController();
