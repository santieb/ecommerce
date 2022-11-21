import db from '../../config/database'
import { Category } from '../types-interfaces/category.type'

const createCategory = async ({ categoryName, image }: Category) => {
  return await db.category.create({
    data: {
      categoryName,
      image,
    }
  })
}

export default { createCategory }
