import CRUDModel from '../crud/crud.model';
import User from './user.entity';
import Database, { Repository } from '../../shared/database/database';

export interface UserModelInterface {
    repository: Repository<User>;
    findByEmail: (object: User) => Promise<User>;
}

class UserModel extends CRUDModel<User> implements UserModelInterface {
    repository: Repository<User>;

    constructor() {
        super('user');

        new Database().connect().then((connection) => {
          this.repository = connection.getRepository(User);
        });
    }

    async findByEmail(user: User): Promise<User> {
       return this.repository.findOne({ where: { email: user.email } });
    }
}

export default UserModel;
