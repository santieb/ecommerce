import { Request, Response } from 'express'
import sucessResponse from '../../shared/helpers/sucessResponse'
import authService from '../services/auth.service'

const registerUser = async ({ body }: Request, res: Response) => {
  try {
    const { email, name, password } = body
    const response = await authService.registerUser({ name, email, password })

    sucessResponse({
      res,
      status: 200,
      message: 'user registration success',
      data: response
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

const loginUser = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body
    const response = await authService.loginUser({ email, password })

    sucessResponse({
      res,
      status: 200,
      message: 'user login success',
      data: response.user,
      token: response.token
    })
  } catch (err) {
    res.status(400).send(err)
  }
}

export default { registerUser, loginUser }
