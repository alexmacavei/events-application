import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMAND_SPEAKERS',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'commands-speakers',
            brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
          },
          consumer: {
            groupId: 'commands-speaker-consumer',
          },
        },
      },
      {
        name: 'QUERY_SPEAKERS',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'queries-speakers',
            brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
          },
          consumer: {
            groupId: 'query-speaker-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
