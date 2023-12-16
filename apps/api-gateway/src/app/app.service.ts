import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateEventEvent, CreateEventRequest } from '@systematic/models';
import { ClientKafka } from '@nestjs/microservices';
import { v4 as uuid_v4 } from 'uuid';
import { Types } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('COMMAND_CLIENT') private readonly commandClient: ClientKafka,
    @Inject('QUERY_CLIENT') private readonly queryClient: ClientKafka
  ) {}

  onModuleInit() {
    this.queryClient.subscribeToResponseOf('fetch-events');
  }

  createEvent(request: CreateEventRequest) {
    const createEvent: CreateEventEvent = { ...request, id: uuid_v4() };
    this.commandClient.emit('event-created', createEvent);
  }

  findEvents(queryId: string | null) {
    return this.queryClient.send('fetch-events', queryId || {});
  }

  deleteEvent(id: string) {
    this.commandClient.emit('event-deleted', { id });
  }

  updateEvent(request: CreateEventRequest & { id: Types.ObjectId }) {
    this.commandClient.emit('event-updated', request);
  }
}
