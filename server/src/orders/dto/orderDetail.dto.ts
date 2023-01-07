import { Min } from 'class-validator';

export class orderDetailDto {
  @Min(1)
  amount: number;

  note: string;

  @Min(1)
  product: string;

  order: string;
}
