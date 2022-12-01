import { Request, Response } from 'express'
import sucessResponse from '../../shared/helpers/sucessResponse'
import { ErrorObject } from '../../shared/helpers/error'
import categoryService from '../services/category.service'

const getCategories = async (req: Request, res: Response) => {
  try {
    const data = await categoryService.getCategories()
    if (data.length === 0) throw new ErrorObject('Not Found', 404)

    sucessResponse({
      res,
      status: 200,
      message: 'Categories successfully obtained',
      data
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

const createCategory = async ({ body }: Request, res: Response) => {
  try {
    const { categoryName, image } = body

    const data = await categoryService.createCategory({ categoryName, image })

    sucessResponse({
      res,
      status: 200,
      message: 'Category created successfully',
      data
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

const deleteCategory = async ({ params }: Request, res: Response) => {
  try {
    const { categoryId } = params

    await categoryService.deleteCategory(categoryId)

    sucessResponse({
      res,
      status: 200,
      message: 'Category deleted successfully'
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

export default {  getCategories, createCategory, deleteCategory }
