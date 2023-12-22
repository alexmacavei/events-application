import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateEventRequest } from '@systematic/models';
import { Types } from 'mongoose';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAnEvent(@Query('id') queryId: string) {
    return this.appService.findEvents(queryId);
  }

  @Get('/all')
  getAllEvents() {
    return this.appService.findEvents(null);
  }

  @Post()
  createEvent(@Body() request: CreateEventRequest) {
    this.appService.createEvent(request);
  }

  @Put()
  updateEvent(@Body() request: CreateEventRequest & { _id: Types.ObjectId }) {
    this.appService.updateEvent(request);
  }

  @Delete(':id')
  removeEvent(@Param('id') id: string) {
    this.appService.deleteEvent(id);
  }
}
