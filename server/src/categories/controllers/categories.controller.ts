import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/jwt.auth.guard';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/createCategory.dto';
import { CategoriesEntity } from '../entities/categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  allCategories() {
    return this.categoriesService.allCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(
    @Body() newCategory: CreateCategoryDto,
  ): Promise<CategoriesEntity | HttpException> {
    return this.categoriesService.createCategory(newCategory);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':categoryId')
  deleteCategory(@Param() params) {
    return this.categoriesService.deleteCategory(params.categoryId);
  }
}
