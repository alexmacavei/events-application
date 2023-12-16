import { Injectable, Logger } from '@nestjs/common';
import { CreateEventEvent, CreateEventRequest, Event } from '@systematic/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async handleEventCreated(data: CreateEventEvent) {
    const eventModel = new this.eventModel({
      _id: new Types.ObjectId(),
      name: data.name,
      eventType: data.eventType,
      participants: data.participants,
    });
    const res = await eventModel.save();
    Logger.log(`Saved event: ${res.name}...`);
  }

  handleEventDeleted(idToDelete: { id: string }) {
    this.eventModel.deleteOne(idToDelete);
  }

  async handleEventUpdated(data: CreateEventRequest & { id: Types.ObjectId }) {
    const { matchedCount, modifiedCount, acknowledged } = await this.eventModel.updateOne({ _id: data.id }, data);
    Logger.log(`Matched docs: ${matchedCount}, Modified docs: ${modifiedCount}, Ack: ${acknowledged}`);
  }
}
