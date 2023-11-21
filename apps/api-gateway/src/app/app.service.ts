import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateSpeakerEvent, CreateSpeakerRequest } from '@systematic/models';
import { ClientKafka } from '@nestjs/microservices';
import { v4 as uuid_v4 } from 'uuid';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('COMMAND_SPEAKERS') private readonly commandSpeakersClient: ClientKafka,
    @Inject('QUERY_SPEAKERS') private readonly querySpeakers: ClientKafka
  ) {}

  onModuleInit() {
    this.querySpeakers.subscribeToResponseOf('fetch-speakers');
  }

  createSpeaker(request: CreateSpeakerRequest) {
    const createSpeakerEvent: CreateSpeakerEvent = { ...request, id: uuid_v4() };
    this.commandSpeakersClient.emit('speaker_created', createSpeakerEvent);
  }

  findAllSpeakers() {
    return this.querySpeakers.send('fetch-speakers', {});
  }
}
