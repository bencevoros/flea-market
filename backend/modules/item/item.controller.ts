import Item from './item.entity';
import CRUDController from '../crud/crud.controller';
import { Request, Response } from 'express';
import moment from 'moment';

class ItemController extends CRUDController<Item> {
  constructor() {
    super('item');
  }

  public async create (req: Request, res: Response) {

    req.body.expireDate = moment(req.body.expireDate).format("YYYY-MM-DD HH:mm:ss");

    try {
      await this.model.create(req.body);

      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async update (req: Request, res: Response) {
    const body = req.body;
    if (!body.id) {
      res.statusMessage = 'ID is required';
      return res.sendStatus(400);
    }
    // TODO: check expiredate to after than the default date

    body.expireDate = moment(body.expireDate).format("YYYY-MM-DD HH:mm:ss");

    try {
      await this.model.update(req.body);

      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export default ItemController;
