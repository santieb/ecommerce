import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from '../entities/products.entity';
import { CreateProductDto } from '../dto/createProduct.dto';
import { CategoriesEntity } from '../../categories/entities/categories.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productRepository: Repository<ProductsEntity>,

    @InjectRepository(CategoriesEntity)
    private categoryRepository: Repository<CategoriesEntity>,
  ) {}

  allProducts(): Promise<object | HttpException> {
    return this.productRepository.find();
  }

  async createProduct(
    product: CreateProductDto,
  ): Promise<ProductsEntity | HttpException> {
    const { name, category } = product;
    const productFound = await this.productRepository.findOne({
      where: { name },
    });

    if (productFound)
      return new HttpException('Product already exists', HttpStatus.CONFLICT);

    if (category) {
      console.log(category);
      const categoryExists = await this.categoryRepository.findOneBy({
        id: String(category),
      });

      console.log(categoryExists);

      if (categoryExists)
        return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    if (productFound)
      return new HttpException('Product already exists', HttpStatus.CONFLICT);
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }
}
