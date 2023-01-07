import { IsArray, ArrayMinSize } from 'class-validator';
import { orderDetailDto } from './orderDetail.dto';
import { Type } from 'class-transformer';

export class AddOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => orderDetailDto)
  orderDetails: Array<orderDetailDto>;
}
