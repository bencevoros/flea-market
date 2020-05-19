import CRUDModel from '../crud/crud.model';
import Item from './item.entity';
import BidModel from '../bid/bid.model';

class ItemModel extends CRUDModel<Item> {
  private bidModel: BidModel;

  constructor() {
    super('item');

    this.bidModel = new BidModel();
  }

  // TODO: Refactor this function. On big data, this is bad solution.
  public async readWon(userId: number) {
    const items = await this.repository.createQueryBuilder('item')
      .addSelect('item.*')
      .innerJoin('bid', 'b', 'b.itemid = item.id')
      .where('b.userId = :userId', { userId })
      .where('item.expireDate < NOW()')
      .groupBy('item.id')
      .getMany();

    const wonItems: Item[] = [];

    await Promise.all(items.map(async (item) => {
      const bid = await this.bidModel.findLastOneByItem(item.id);

      if (Number.parseInt(bid.userId) === userId) {
        wonItems.push(item);
      }
    }));

    return wonItems;
  }

  public async readOwn(userId: number) {
    return await this.repository.find({ userId });
  }

}

export default ItemModel;
