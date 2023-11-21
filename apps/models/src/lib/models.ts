import { IsDate, IsEmail, IsNotEmpty, IsString, MaxDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSpeakerRequest {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  firstName: string | undefined;

  @IsString()
  lastName: string | undefined;

  @IsDate()
  @Type(() => Date)
  @MaxDate(new Date())
  joinedSystematic: Date | undefined;

  toString() {
    const { firstName = undefined, lastName = undefined, joinedSystematic = undefined, email } = this;
    return JSON.stringify({ firstName, lastName, joinedSystematic, email });
  }
}

export type CreateSpeakerEvent = CreateSpeakerRequest & { id: string };
