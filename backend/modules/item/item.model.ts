import CRUDModel from "../crud/crud.model";
import Item from "./item.entity";

class ItemModel extends CRUDModel<Item> {

  constructor() {
    super('item');
  }

}

export default ItemModel;
