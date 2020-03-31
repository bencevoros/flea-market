import Item from './item.entity';
import CRUDController from '../crud/crud.controller';


class ItemController extends CRUDController<Item> {
  constructor() {
    super('item');
  }
}

export default ItemController;
