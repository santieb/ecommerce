import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpException,
  Delete,
  Param,
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
  async createProduct(
    @Body() newProduct: CreateProductDto,
  ): Promise<ProductsEntity | HttpException> {
    return this.productsService.createProduct(newProduct);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':productId')
  deleteProduct(@Param() params) {
    return this.productsService.deleteProduct(params.productId);
  }
}
