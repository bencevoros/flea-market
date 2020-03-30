import User from './user.entity';
import CRUDController from '../crud/crud.controller';


class UserController extends CRUDController<User> {
  constructor() {
    super('user');
  }
}

export default UserController;
