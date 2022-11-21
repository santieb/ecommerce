import { Request, Response, NextFunction, } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'
import { config } from '../../config/index'
import { ErrorObject } from '../helpers/error'
const { secretKey } = config

import {  } from 'jsonwebtoken'

export interface RequestExt extends Request {
  user?: string | JwtPayload
}

const isAuth = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization
    const token = bearerToken && bearerToken.split(' ')[1]

    if (!token) throw new ErrorObject('Token not valid. Unauthorized', 401)

    verify(token, secretKey, (err, user) => {
      if (err) throw new ErrorObject('Token not valid. Unauthorized', 403)

      req.user = user
      next()
    })
  } catch (err) {
    res.status(500).send(err)
  }
}

export default isAuth