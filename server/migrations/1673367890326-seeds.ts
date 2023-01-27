import { ProductsSeed } from '../seeders/products.seed';
import { ProductsEntity } from '../src/products/entities/products.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { CategoriesSeed } from '../seeders/categories.seed';
import { CategoriesEntity } from '../src/categories/entities/categories.entity';
import { AppDataSource } from '../src/config/data.source';

export class seeds1673367890326 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(CategoriesEntity)
      .values(CategoriesSeed)
      .execute();

    const categories = await AppDataSource.getRepository(CategoriesEntity)
      .createQueryBuilder()
      .getMany();

    ProductsSeed[0].category = categories[0];
    ProductsSeed[1].category = categories[1];

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(ProductsEntity)
      .values(ProductsSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
