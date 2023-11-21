import { Injectable } from '@nestjs/common';
import { CreateSpeakerEvent, Speaker } from '@systematic/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(Speaker.name) private speakerModel: Model<Speaker>) {}

  handleSpeakerCreated(value: CreateSpeakerEvent) {
    const { firstName, lastName, joinedSystematic, email } = value;
    const speakerModel = new this.speakerModel({ firstName, lastName, joinedSystematic, email, _id: new Types.ObjectId() });
    speakerModel.save();
  }
}
