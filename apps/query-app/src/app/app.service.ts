import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Speaker } from '@systematic/models';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(Speaker.name) private speakerModel: Model<Speaker>) {}

  async fetchSpeakers(): Promise<Speaker[]> {
    return await this.speakerModel.find({}, {}, { lean: true }).exec();
  }
}
