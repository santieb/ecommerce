import { Request, Response } from 'express'
import sucessResponse from '../../shared/helpers/sucessResponse'

const getProducts = async ({ body }: Request, res: Response) => {
  try {
    sucessResponse({
      res,
      status: 200,
      message: 'products successfully obtained'
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

export default { getProducts }
