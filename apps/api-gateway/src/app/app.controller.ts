import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateSpeakerRequest } from '@systematic/models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getSpeakers() {
    return this.appService.findAllSpeakers();
  }

  @Post()
  createSpeaker(@Body() request: CreateSpeakerRequest) {
    this.appService.createSpeaker(request);
  }
}
