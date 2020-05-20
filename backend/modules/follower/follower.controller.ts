import CRUDController from '../crud/crud.controller';
import FollowerModel from './follower.model';
import { Request, Response } from 'express';
import Follower from './follower.entity';
import UserModel from '../user/user.model';


class FollowerController extends CRUDController<Follower> {
  userModel: UserModel;

  constructor() {
    super('follower');

    this.model = new FollowerModel();
    this.userModel = new UserModel();
  }

  public async findByItemAndUserId(req: Request, res: Response) {
    if (!req.query.userId || !req.query.itemId) {
      res.statusMessage = 'Userid and itemid is required!';
      res.sendStatus(400);
    }

    try {
      const follower = await this.model.findByItemAndUserId({ userId: req.query.userId, itemId: req.query.itemId });

      res.send(follower);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async create (req: Request, res: Response) {
    const itemId = req.body.itemId;
    const userId = req.body.userId;
    const user = await this.userModel.findById(userId);

    if (user.points < 5) {
      throw new Error('You dont have enough points');
    }

    // TODO: Check there is also a following for this item and user
    await super.create(req, res);

    await this.userModel.update({
      ...user,
      points: user.points - 5
    });
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
