import Bid from './bid.entity';
import CRUDController from '../crud/crud.controller';
import BidModel from './bid.model';
import Item from '../item/item.entity';
import * as jwt from 'jsonwebtoken';
import { tokenSecret } from '../../shared/auth/configs';

class BidController extends CRUDController<Bid> {
  constructor() {
    super('bid');

    this.model = new BidModel();
  }

  async GetItemBids(request, response) {
    const item: Item = request.body;

    const foundBids = await this.model.findByItemId(item);

    response.send({
      foundBids
    });
  }
}

export default BidController;
