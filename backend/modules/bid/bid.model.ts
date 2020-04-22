import CRUDModel from '../crud/crud.model';
import Bid from './bid.entity';
import Item from '../item/item.entity';
import Database, { Repository } from '../../shared/database/database';

export interface BidModelInterface {
    repository: Repository<Bid>;
    itemRepository: Repository<Item>;
    findByItemId: (itemId: number) => Promise<Bid[]>;
    create: (bid: Bid) => Promise<void>;
}

class BidModel extends CRUDModel<Bid> implements BidModelInterface {
    repository: Repository<Bid>;
    itemRepository: Repository<Item>;

    constructor() {
        super('bid');

        new Database().connect().then((connection) => {
          this.repository = connection.getRepository(Bid);
          this.itemRepository = connection.getRepository(Item);
        });
    }

    
    public async create (bid: Bid): Promise<void> {
        await this.repository.save(bid);

        const item: Item = await this.itemRepository.findOne(bid.itemId);
        item.price = bid.amount;

        await this.itemRepository.save(item);
    }

    async findByItemId(itemId: number): Promise<Bid[]> {
       return this.repository.find({ where: { itemId: itemId } });
    }
}

export default BidModel;
