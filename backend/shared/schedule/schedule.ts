import { Raw } from 'typeorm';
import schedule from 'node-schedule';
import moment from 'moment';
import Database from '../database/database';
import Item from '../../modules/item/item.entity';

export class Schedule {
  private static instance: Schedule;
  schedItems: Object = {};

  private constructor () { }

  static async initScheduleItems () {
    console.log('Start item biddings scheduling');
  
    try {
      const connection = await new Database().connect();
      const repository = connection.getRepository('item');
  
      const items = await repository.find({
        expireDate: Raw(alias => `${alias} > NOW()`),
      });
  
      items.forEach((item: Item) => {
        const sched = schedule.scheduleJob(moment(item.expireDate).toDate(), function(item) {
          // TODO: send email to seller
          // TODO: send email to winner
          // TODO: add points to winner (and seller?)
          console.log(`Bidding for item ${item.name} (id: ${item.id}) is closed.`);

          Schedule.removeExpiredScheduleItem(item.id);
        }.bind(null, item));

        this.getInstance().schedItems[item.id] = sched;
      });
    } catch(err) {
      console.log('Failed to scheduling item biddings.', err);
    }
  
    console.log('End item biddings scheduling');
  }

  static addScheduleItem(item: Item) {
    const sched = schedule.scheduleJob(moment(item.expireDate).toDate(), function(item) {
      // TODO: send email to seller
      // TODO: send email to winner
      // TODO: add points to winner (and seller?)
      console.log(`Bidding for item ${item.name} (id: ${item.id}) is closed.`);

      Schedule.removeExpiredScheduleItem(item.id);
    }.bind(null, item));

    this.getInstance().schedItems[item.id] = sched;
  }

  static updateScheduleItem(item: Item) {
    this.getInstance().schedItems[item.id].cancel();
    
    this.addScheduleItem(item);
  }

  static deleteScheduleItem(itemId: number) {
    this.getInstance().schedItems[itemId].cancel();
    this.removeExpiredScheduleItem(itemId);
  }

  static removeExpiredScheduleItem(itemId: number) {
    delete this.getInstance().schedItems[itemId];
  }

  static getInstance(): Schedule {
    if (!Schedule.instance) {
      Schedule.instance = new Schedule();
    }

    return Schedule.instance;
  }
}
