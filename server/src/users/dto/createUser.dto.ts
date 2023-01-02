import { MinLength, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @MinLength(4)
  @MaxLength(25)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(4)
  @MaxLength(15)
  password: string;
}
