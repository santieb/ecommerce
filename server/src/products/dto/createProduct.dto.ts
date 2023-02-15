import { MinLength, MaxLength, IsNumber, Min, Max } from 'class-validator';
import { CategoriesEntity } from 'src/categories/entities/categories.entity';

export class CreateProductDto {
  @MinLength(4)
  @MaxLength(25)
  name: string;

  @IsNumber()
  @Min(1)
  @Max(99999)
  price: number;

  @MinLength(4)
  @MaxLength(150)
  description: string;

  image: string;

  category: CategoriesEntity;
}
