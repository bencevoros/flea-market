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

    public async findById (id: number, withPass?: boolean) {
        const user = await this.repository.findOne(id);

        if (user && !withPass) {
            delete user.password;
        }

        return user;
    }
}

export default UserModel;
