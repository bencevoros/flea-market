import { Request, Response } from 'express';
import CRUDModel from './crud.model';

interface Controller<T> {
  model: CRUDModel<T>;
  create: (Request, Response) => void;
  read: (Request, Response) => void;
  findById: (Request, Response) => void;
  delete: (Request, Response) => void;
  update: (Request, Response) => void;
}

class CrudController<T> implements Controller<T> {
  model: CRUDModel<T>;

  constructor(entity: string) {
    this.model = new CRUDModel<T>(entity);
  }

  public async create (req: Request, res: Response) {
    try {
      await this.model.create(req.body);

      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async read (req: Request, res: Response) {
    try {
      const value: T[] = await this.model.read();

      res.send(value);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async findById (req: Request, res: Response) {
    if (!req.query.id) {
      res.statusMessage = 'ID is required';
      return res.sendStatus(400);
    }

    try {
      const value: T = await this.model.findById(req.query.id);

     return  res.send(value);
    } catch (err) {
     return  res.status(500).send(err);
    }
  }

  public async update (req: Request, res: Response) {
    const body = req.body;
    if (!body.id) {
      res.statusMessage = 'ID is required';
      return res.sendStatus(400);
    }

    try {
      await this.model.update(req.body);

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

      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}


export default CrudController;
