import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ProductsEntity } from '../../products/entities/products.entity';
@Entity({ name: 'categories' })
export class CategoriesEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => ProductsEntity, (product) => product.category)
  products: ProductsEntity[];
}
