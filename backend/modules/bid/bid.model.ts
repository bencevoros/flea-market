import CRUDModel from '../crud/crud.model';
import Bid from './bid.entity';
import Item from '../item/item.entity';
import Database, { Repository } from '../../shared/database/database';

export interface BidModelInterface {
    repository: Repository<Bid>;
    findByItemId: (object: Item) => Promise<Bid[]>;
}

class BidModel extends CRUDModel<Bid> implements BidModelInterface {
    repository: Repository<Bid>;

    constructor() {
        super('bid');

        new Database().connect().then((connection) => {
          this.repository = connection.getRepository(Bid);
        });
    }

    async findByItemId(item: Item): Promise<Bid[]> {
       return this.repository.find({ where: { itemId: item.id } });
    }
}

export default BidModel;
