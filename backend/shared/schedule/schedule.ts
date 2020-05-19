import { Raw } from 'typeorm';
import schedule from 'node-schedule';
import moment from 'moment';
import Database from '../database/database';
import Item from '../../modules/item/item.entity';
import Bid from '../../modules/bid/bid.entity';
import User from '../../modules/user/user.entity';

export class Schedule {
  private static instance: Schedule;

  private constructor () { }

  static async initScheduleItems () {
    console.log('Start item biddings scheduling');
    global.schedItems = {};
  
    try {
      const connection = await new Database().connect();
      const repository = connection.getRepository('item');
  
      const items = await repository.find({
        expireDate: Raw(alias => `${alias} > NOW()`),
      });

      items.forEach((item: Item, i) => {
        const sched = schedule.scheduleJob(moment(item.expireDate).toDate(), async function(item) {
          await Schedule.closeItem(item);
          Schedule.removeExpiredScheduleItem(item.id);
        }.bind(null, item));

        global.schedItems[item.id] = sched;
      });
    } catch(err) {
      console.log('Failed to scheduling item biddings.', err);
    }
  
    console.log('End item biddings scheduling');
  }

  static async closeItem(item: Item) {
    console.log(`Bidding for item ${item.name} (id: ${item.id}) is closed.`);

    const connection = await new Database().connect();
    const userRepository = connection.getRepository('user');
    const bidRepository = connection.getRepository('bid');
    
    const lastBid: Bid | Object = await bidRepository.findOne({
      where: { itemId: item.id },
      order: { date: 'DESC' },
    });

    if (lastBid && lastBid.userId) {
      const winnerUser: User | Object = await userRepository.findOne(lastBid.userId);
      const sellerUser: User | Object = await userRepository.findOne(item.userId);

      await userRepository.save({
        ...winnerUser,
        points: winnerUser.points + 1,
      });

      await userRepository.save({
        ...sellerUser,
        points: sellerUser.points + 1,
      })

      // TODO: SEND EMAIL TO USERS
    } else {
      // TODO: SEND EMAIL TO SELLER WITH MESSAGE LIKE THIS: YOUR ITEM IS CLOSED BUT DOES NOT HAVE BID
    }
  }

  static addScheduleItem(item: Item) {
    const sched = schedule.scheduleJob(moment(item.expireDate).toDate(), async function(item) {
      await Schedule.closeItem(item);
      Schedule.removeExpiredScheduleItem(item.id);
    }.bind(null, item));

    global.schedItems[item.id] = sched;
  }

  static updateScheduleItem(item: Item) {
    global.schedItems[item.id].cancel();
    
    this.addScheduleItem(item);
  }

  static deleteScheduleItem(itemId: number) {
    global.schedItems[itemId].cancel();
    this.removeExpiredScheduleItem(itemId);
  }

  static removeExpiredScheduleItem(itemId: number) {
    global.schedItems[itemId];
  }

  static getInstance(): Schedule {
    if (!Schedule.instance) {
      Schedule.instance = new Schedule();
    }

    return Schedule.instance;
  }
}
