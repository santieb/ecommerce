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

  async createCategory(category: CreateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: { name: category.name },
    });

    if (categoryFound)
      return new HttpException('Category already exists', HttpStatus.CONFLICT);

    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  allCategories(): Promise<object | HttpException> {
    return this.categoryRepository.find();
  }
}
