import CRUDModel from '../crud/crud.model';
import Follower from './follower.entity';
import Database, { Repository } from '../../shared/database/database';

export interface FollowerModelInterface {
    repository: Repository<Follower>;
    findByItemId: (itemId: number) => Promise<Follower[]>;
    findByUserId: (userId: number) => Promise<Follower[]>;
    create: (follow: Follower) => Promise<void>;
}

class FollowerModel extends CRUDModel<Follower> implements FollowerModelInterface {
    repository: Repository<Follower>;

    constructor() {
        super('follower');

        new Database().connect().then((connection) => {
          this.repository = connection.getRepository(Follower); // ez valszeg így nem is jó ;^(
        });
    }

    public async create (follow: Follower): Promise<void> {
        await this.repository.save(follow);
    }

    async findByItemId(itemId: number): Promise<Follower[]> {
        return await this.repository.find({ where: { itemId: itemId } });
     }

    async findByUserId(userId: number): Promise<Follower[]> {
        return await this.repository.find({ where: { userId: userId } });
    }
}

export default FollowerModel;
