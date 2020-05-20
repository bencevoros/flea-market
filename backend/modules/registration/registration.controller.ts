import UserController from '../user/user.controller';
import { Request, Response } from 'express';

class RegistrationController {
  userConstroller: UserController;

  constructor() {
    this.userConstroller = new UserController();
  }

  async create(request: Request, response: Response) {
    try {
      await this.userConstroller.model.create(request.body);

      response.sendStatus(200);
    } catch (err) {
      if (err.errno === 1062) {
        response.statusMessage = 'This email has already been registered';
        return response.sendStatus(400);
      }
      
      response.status(500).send(err);
    }
  }
}

export default RegistrationController;
