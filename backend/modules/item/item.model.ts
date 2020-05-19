import CRUDModel from '../crud/crud.model';
import Item from './item.entity';
import BidModel from '../bid/bid.model';
import Database from '../../shared/database/database';
import User from '../user/user.entity';

class ItemModel extends CRUDModel<Item> {
  private bidModel: BidModel;

  constructor() {
    super('item');

    this.bidModel = new BidModel();
  }

  public async create (body: Item): Promise<Item> {
    let done: Error;
    let item: Item;
    const connection = await new Database().connect();
    const queryRunner = connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      item = await queryRunner.manager.save('item', body);

      let user = await queryRunner.manager.findOne('user', { id: body.userId });
      
      if (user && user.points === undefined) {
        throw new Error('User not found');
      }

      await queryRunner.manager.save('user', {
        ...user,
        points: user.points + 1
      });
      
      await queryRunner.commitTransaction();
    } catch (err) {
      done = err;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (done) throw done;

    return item;
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
