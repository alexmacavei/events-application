import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // TODO maca: come up with something better than {}
  @MessagePattern('fetch-events')
  async fetchEvents(queryId: string | {}) {
    return await this.appService.fetchEvents(queryId);
  }
}
