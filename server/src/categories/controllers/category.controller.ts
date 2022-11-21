import { Request, Response } from 'express'
import sucessResponse from '../../shared/helpers/sucessResponse'

const createCategory = async ({ body }: Request, res: Response) => {
  try {
    const { categoryName, image } = body

    sucessResponse({
      res,
      status: 200,
      message: 'Category created successfully'
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

export default { createCategory }
