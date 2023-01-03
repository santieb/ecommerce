import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/createProduct.dto';
import { JwtAuthGuard } from 'src/users/jwt.auth.guard';
import { ProductsEntity } from '../entities/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  allProducts() {
    return this.productsService.allProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(
    @Body() newProduct: CreateProductDto,
  ): Promise<ProductsEntity | HttpException> {
    return this.productsService.createProduct(newProduct);
  }
}
