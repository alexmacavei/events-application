import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Participant } from '../models/participant.model';
import { EventType } from '../models/event-type.model';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId | undefined;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, type: Object }) eventType!: EventType;

  @Prop({ default: [] })
  participants: Participant[] = [];
}

export const EventSchema = SchemaFactory.createForClass(Event);
