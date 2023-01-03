import { MinLength, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(4)
  @MaxLength(25)
  name: string;
}
