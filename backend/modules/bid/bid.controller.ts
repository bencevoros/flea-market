import Bid from './bid.entity';
import CRUDController from '../crud/crud.controller';


class BidController extends CRUDController<Bid> {
  constructor() {
    super('bid');
  }
}

export default BidController;
