import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type SpeakerDocument = HydratedDocument<Speaker>;

@Schema()
export class Speaker {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId | undefined;

  @Prop({ required: true, unique: true })
  email: string | undefined;

  @Prop()
  firstName: string | undefined;

  @Prop()
  lastName: string | undefined;

  @Prop()
  joinedSystematic: Date | undefined;
}

export const SpeakerSchema = SchemaFactory.createForClass(Speaker);
