import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsEntity } from './entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from 'src/categories/entities/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity, CategoriesEntity])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
