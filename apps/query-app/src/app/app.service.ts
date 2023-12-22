import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from '@systematic/models';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async fetchEvents(query: string | {}): Promise<Event[]> {
    let res;
    if (Object.keys(query).length !== 0) {
      res = await this.eventModel
        .findById(query, {}, { lean: true })
        .exec()
        .catch(() => []);
    } else {
      res = await this.eventModel.find({}, {}, { lean: true }).exec();
    }
    Logger.log(`Fetched ${res?.length || 0} event(s).`);
    return res;
  }
}
