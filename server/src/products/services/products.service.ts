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
    return this.productRepository.find({
      relations: {
        category: true,
      },
    });
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
      if (!+category)
        return new HttpException(
          'Categoryid is not a number',
          HttpStatus.BAD_REQUEST,
        );

      const categoryExists = await this.categoryRepository.findOneBy({
        id: String(category),
      });

      if (!categoryExists)
        return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async deleteProduct(productId: string): Promise<object | HttpException> {
    if (!+productId)
      return new HttpException(
        'ProductId is not a number',
        HttpStatus.BAD_REQUEST,
      );

    const productFound = await this.productRepository.findOneBy({
      id: productId,
    });

    if (!productFound)
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return this.productRepository.remove(productFound);
  }
}
