import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateEventEvent, CreateEventRequest } from '@systematic/models';
import { Types } from 'mongoose';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('event-created')
  async handleEventCreated(data: CreateEventEvent) {
    await this.appService.handleEventCreated(data);
  }

  @EventPattern('event-deleted')
  handleEventDeleted(data: { id: string }) {
    this.appService.handleEventDeleted(data);
  }

  @EventPattern('event-updated')
  async handleEventUpdated(data: CreateEventRequest & { id: Types.ObjectId }) {
    await this.appService.handleEventUpdated(data);
  }
}
