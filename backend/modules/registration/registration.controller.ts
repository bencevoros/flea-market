import UserController from '../user/user.controller';

class RegistrationController {
  userConstroller: UserController;

  constructor() {
    this.userConstroller = new UserController();
  }

  create(request, response) {
    this.userConstroller.create(request, response);
  }
}

export default RegistrationController;
