import moment from 'moment';
import { Request, Response } from 'express';
import Bid from './bid.entity';
import CRUDController from '../crud/crud.controller';
import BidModel from './bid.model';
import ItemModel from '../item/item.model';
import EmailController from '../email/email.controller';
import FollowerController from '../follower/follower.controller';
import UserModel from '../user/user.model';
import FollowerModel from '../follower/follower.model';

class BidController extends CRUDController<Bid> {
  itemModel: ItemModel;
  userModel: UserModel;
  followerModel: FollowerModel;
  model: BidModel;

  constructor() {
    super('bid');

    this.model = new BidModel();
    this.itemModel = new ItemModel();
    this.userModel = new UserModel();
    this.followerModel = new FollowerModel();
  }

  async findByItemId(request, response) {
    const itemId: number = request.query.itemId;

    const foundBids = await this.model.findByItemId(itemId);

    response.send({
      foundBids
    });
  }
  
  async findByUserId(request, response) {
    const userId: number = request.query.userId;
    if (!userId) {
      throw new Error('User id is required');
    }

    const foundBids = await this.model.findByUserId(userId);

    response.send(foundBids);
  }

  public async create (req: Request, res: Response) {
    const itemId = req.body.itemId;
    const reqItemPrice = req.body.amount;
    
    if (!itemId) {
      throw new Error('ItemId is required');
    }
    
    const item = await this.itemModel.findById(itemId);
    if (moment(item.expireDate).isBefore(moment())) {
      throw new Error('The bidding is closed');
    }

    if (item.price > reqItemPrice) {
      throw new Error('The new item price is smaller than old');
    }

    await super.create(req, res);

    this.sendOutEmails(itemId);
  }

   public async sendOutEmails(itemId: number){
    const emailCont: EmailController = new EmailController();
    const followers = await this.followerModel.findByItemId(itemId);
    const item = await this.itemModel.findById(itemId);

    for (let i = 0; i < followers.length; i++) {
      const user = await this.userModel.findById(+followers[i].userId);
      emailCont.sendEmailFromBackEnd(user.email, 'bidArrived');
    }
  }
}

export default BidController;
