import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Participant {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  initials!: string;
}
