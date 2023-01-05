import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoriesEntity } from '../entities/categories.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from '../dto/createCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private categoryRepository: Repository<CategoriesEntity>,
  ) {}

  allCategories(): Promise<object | HttpException> {
    return this.categoryRepository.find();
  }

  async createCategory(category: CreateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { name: category.name },
    });

    if (categoryFound)
      return new HttpException('Category already exists', HttpStatus.CONFLICT);

    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  async deleteCategory(categoryId: string): Promise<object | HttpException> {
    if (!+categoryId)
      return new HttpException(
        'Categoryid is not a number',
        HttpStatus.BAD_REQUEST,
      );

    const categoryFound = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!categoryFound)
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);

    return this.categoryRepository.remove(categoryFound);
  }
}
