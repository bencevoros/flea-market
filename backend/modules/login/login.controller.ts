import UserController from '../user/user.controller';
import User from '../user/user.entity';
import * as jwt from 'jsonwebtoken';
import { tokenSecret } from '../../shared/auth/configs';

class LoginController {
    userConstroller: UserController;

    constructor() {
        this.userConstroller = new UserController();
    }

    async login(request, response) {
        const user: User = request.body;

        if (!user.email || !user.password) {
            return response.sendStatus(400);
        }

        const foundUser = await this.userConstroller.model.findByEmail(user);

        if (!foundUser || !foundUser.email || !foundUser.password) {
            return response.sendStatus(400);
        }

        if (foundUser.password !== user.password) {
            return response.sendStatus(400);
        }

        const token = {
            userId: foundUser.id,
        };

        const signedToken = jwt.sign(token, tokenSecret, { expiresIn: 86400 });

        response.send({
            token: signedToken
        });
    }
}

export default LoginController;
