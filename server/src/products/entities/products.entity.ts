import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
@Entity({ name: 'products' })
export class ProductsEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => CategoriesEntity, (category) => category.products)
  category: CategoriesEntity;
}
