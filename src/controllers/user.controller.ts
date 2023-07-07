import { Request, Response } from 'express';
import { User } from '../models';

class UserController {
  // Get all users
  public async findAll(req: any, res: any): Promise<void> {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a user by id
  public async findOne(req: any, res: any): Promise<void> {
    const id = req.params.id;
    try {
      const user = await User.findByPk(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User with the specified ID does not exists' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a user
  public async updateOne(req: any, res: any): Promise<void> {
    const id = req.params.id;
    try {
      const [updated] = await User.update(req.body, {
        where: { id: id }
      });
      if (updated) {
        const updatedUser = await User.findByPk(id);
        res.status(200).json({ user: updatedUser });
      } else {
        res.status(404).json({ error: 'User with the specified ID not found' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a user
  public async delete(req: any, res: any): Promise<void> {
    try {
      const id = req.params.id;
      const deleted = await User.destroy({
        where: { id: id }
      });
      if (deleted) {
        res.status(200).json({ info: "User deleted" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const userController = new UserController();
