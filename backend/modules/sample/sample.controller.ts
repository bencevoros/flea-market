import { Request, Response } from 'express';
import Sample from './sample';
import SampleModel, { Model } from './sample.model';

interface Controller {
  model: Model;
  create: (Request, Response) => void;
  read: (Request, Response) => void;
  delete: (Request, Response) => void;
  update: (Request, Response) => void;
}

class SampleController implements Controller {
  model: Model;

  constructor() {
    this.model = new SampleModel();
  }

  public create (req: Request, res: Response) {
    if (!req.body.title || !req.body.message) {
      return res.send('Title and message are required').status(400);
    }

    const sample: Sample = this.model.create(req.body);
    res.send(sample);
  }

  public read (req: Request, res: Response) {
    const sample: Sample = this.model.read();
    res.send(sample);
  }

  public update (req: Request, res: Response) {
    const sample: Sample = this.model.update(req.body);
    res.send(sample);
  }

  public delete (req: Request, res: Response) {
    const success: Boolean = this.model.delete(req.body.id);

    if (success) {
      return res.sendStatus(200);
    }

    return res.sendStatus(400);
  }
}

export default SampleController;
