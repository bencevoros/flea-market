import User from './user.entity';
import CRUDController from '../crud/crud.controller';
import UserModel from './user.model';
import { Request, Response } from 'express';


class UserController extends CRUDController<User> {
  constructor() {
    super('user');

    this.model = new UserModel();
  }

  public async update (req: Request, res: Response) {
    const body = req.body;
    if (!body.id) {
      res.statusMessage = 'ID is required';
      return res.sendStatus(400);
    } else if (!body.newPassword || !body.oldPassword) {
      res.statusMessage = 'Old and new password is required';
      return res.sendStatus(400);
    }

    try {
      const user = await this.model.findById(body.id, true);

      if (user.password !== body.oldPassword) {
        res.statusMessage = 'Wrong password!';
        return res.sendStatus(400);
      }

      body.password = body.newPassword;
      
      await this.model.update(body);

      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export default UserController;
