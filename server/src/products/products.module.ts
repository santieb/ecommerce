import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
