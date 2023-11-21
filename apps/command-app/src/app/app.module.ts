import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Speaker, SpeakerSchema } from '@systematic/models';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: Speaker.name, schema: SpeakerSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
