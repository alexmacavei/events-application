import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMAND_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-commands',
            brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
          },
          consumer: {
            groupId: 'commands-consumer',
          },
        },
      },
      {
        name: 'QUERY_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-queries',
            brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
          },
          consumer: {
            groupId: 'queries-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
