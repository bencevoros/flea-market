import Bid from './bid.entity';
import CRUDController from '../crud/crud.controller';
import BidModel from './bid.model';

class BidController extends CRUDController<Bid> {
  constructor() {
    super('bid');

    this.model = new BidModel();
  }

  async findByItemId(request, response) {
    const itemId: number = request.query.itemId;

    const foundBids = await this.model.findByItemId(itemId);

    response.send({
      foundBids
    });
  }
  
  async findByUserId(request, response) {
    const userId: number = request.query.userId;
    if (!userId) {
      throw new Error('User id is required');
    }

    const foundBids = await this.model.findByUserId(userId);

    response.send(foundBids);
  }
}

export default BidController;
