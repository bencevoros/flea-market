import Item from './item.entity';
import CRUDController from '../crud/crud.controller';
import { Request, Response } from 'express';
import moment from 'moment';
import { Schedule } from '../../shared/schedule/schedule';

class ItemController extends CRUDController<Item> {
  constructor() {
    super('item');
  }

  public async create (req: Request, res: Response) {

    req.body.expireDate = moment(req.body.expireDate).format("YYYY-MM-DD HH:mm:ss");

    try {
      const item = await this.model.create(req.body);

      Schedule.addScheduleItem(item);

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

    const item = await this.model.findById(body.id);
    if (moment(item.expireDate).isAfter(body.expireDate)) {
      res.statusMessage = 'Date must be later than previous!';
      return res.sendStatus(400);
    }

    body.expireDate = moment(body.expireDate).format("YYYY-MM-DD HH:mm:ss");

    try {
      const item = await this.model.update(req.body);
      
      Schedule.updateScheduleItem(item);

      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async delete (req: Request, res: Response) {
    if (!req.query.id) {
      res.statusMessage = 'ID is required';
      return res.sendStatus(400);
    }


    try {
      await this.model.delete(req.query.id);
      
      Schedule.deleteScheduleItem(req.query.id);

      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export default ItemController;
