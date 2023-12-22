import { EventType } from '../models/event-type.model';
import { Participant } from '../models/participant.model';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  eventType!: EventType;

  @IsArray()
  @Type(() => Participant)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  participants!: Participant[];

  toString() {
    const { name = undefined, participants = [], eventType = undefined } = this;
    return JSON.stringify({ name, participants, eventType });
  }
}
