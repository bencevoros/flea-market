import User from './user.entity';
import CRUDController from '../crud/crud.controller';
import UserModel from './user.model';


class UserController extends CRUDController<User> {
  constructor() {
    super('user');

    this.model = new UserModel();
  }
}

export default UserController;
