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
}

export default BidController;
