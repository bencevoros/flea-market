import { Request, Response } from 'express';
import CRUDModel, { Model } from './crud.model';

interface Controller<T> {
  model: Model<T>;
  create: (Request, Response) => void;
  read: (Request, Response) => void;
  delete: (Request, Response) => void;
  update: (Request, Response) => void;
}

class CrudController<T> implements Controller<T> {
  model: CRUDModel<T>;

  constructor() {
    this.model = new CRUDModel<T>();
  }

  public create (req: Request, res: Response) {
    const value: T = this.model.create(req.body);
    res.send(value);
  }

  public read (req: Request, res: Response) {
    const value: T = this.model.read();
    res.send(value);
  }

  public findById (req: Request, res: Response) {
    if (!req.query.id) {
      res.statusMessage = 'ID is required';
      return res.sendStatus(400);
    }

    const value: T = this.model.findById(req.query.id);
    res.send(value);
  }

  public update (req: Request, res: Response) {
    const value: T = this.model.update(req.body);
    res.send(value);
  }

  public delete (req: Request, res: Response) {
    if (!req.query.id) {
      res.statusMessage = 'ID is required';
      return res.sendStatus(400);
    }

    const success: Boolean = this.model.delete(req.query.id);

    if (success) {
      res.sendStatus(200);
      return;
    }

    res.statusMessage = 'The item cannot be deleted.';
    res.sendStatus(400);
  }
}


export default CrudController;
