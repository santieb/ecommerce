import db from '../../config/database'
import { Category } from '../types-interfaces/category.type'

const getCategories = async () => {
  return await db.category.findMany()
}

const createCategory = async ({ categoryName, image }: Category) => {
  return await db.category.create({
    data: {
      categoryName,
      image,
    }
  })
}

const deleteCategory = async (categoryId: string) => {
  return await db.category.delete({
    where: {
      id: categoryId,
    },
  })
}

export default { getCategories, createCategory, deleteCategory }
