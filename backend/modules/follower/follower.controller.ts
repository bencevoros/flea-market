import User from './follower.entity';
import CRUDController from '../crud/crud.controller';
import FollowerModel from './follower.model';
import UserController from '../user/user.controller';
import { Request, Response } from 'express';
import Follower from './follower.entity';


class FollowerController extends CRUDController<Follower> {
  constructor() {
    super('follower');

    this.model = new FollowerModel();
  }

  public async create (req: Request, res: Response) {
    const userCont: UserController = new UserController();
    const itemId = req.body.itemId;
    const userId = req.body.userId;
    const user = await userCont.model.findById(req.body.userId);

    if (user.points < 5) {
      throw new Error('You dont have enough points'); // itt csekkolnánk a pontokat
    }
    await super.create(req, res);
  }

  async findByItemId(request, response) {
    const itemId: number = request.query.itemId;

    const foundFollows = await this.model.findByItemId(itemId);

    response.send({
      foundFollows
    });
  }

  async findByUserId(request, response) {
    const userId: number = request.query.userId;

    const foundFollows = await this.model.findByItemId(userId);

    response.send({
      foundFollows
    });
  }
}

export default FollowerController;
