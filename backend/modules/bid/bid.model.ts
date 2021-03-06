import CRUDModel from '../crud/crud.model';
import Bid from './bid.entity';
import Item from '../item/item.entity';
import Database, { Repository } from '../../shared/database/database';

export interface BidModelInterface {
    repository: Repository<Bid>;
    itemRepository: Repository<Item>;
    findByItemId: (itemId: number) => Promise<Bid[]>;
    findByUserId: (itemId: number) => Promise<Bid[]>;
    create: (bid: Bid) => Promise<Bid>;
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

    
    public async create (bid: Bid): Promise<Bid> {
        const savedBid = await this.repository.save(bid);

        const item: Item = await this.itemRepository.findOne(bid.itemId);
        item.price = bid.amount;

        await this.itemRepository.save(item);

        return savedBid;
    }

    async findByItemId(itemId: number): Promise<Bid[]> {
       return await this.repository.find({ where: { itemId: itemId } });
    }
    
    async findByUserId(userId: number): Promise<Bid[]> {
        return await this.repository.find({ where: { userId }, order: { date: 'ASC'} });
    }

    async findLastOneByItem(itemId: number): Promise<Bid> {
        return await this.repository.findOne({ where: { itemId }, order: { date: 'DESC'} });
    }
}

export default BidModel;
