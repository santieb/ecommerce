import { Request, Response } from 'express'
import sucessResponse from '../../shared/helpers/sucessResponse'
import { ErrorObject } from '../../shared/helpers/error'
import productService from '../services/product.service'

const getProducts = async (req: Request, res: Response) => {
  try {
    const data = await productService.getProducts()
    if (data.length === 0) throw new ErrorObject('Not Found', 404)

    sucessResponse({
      res,
      status: 200,
      message: 'Products successfully obtained',
      data
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

export default { getProducts }
