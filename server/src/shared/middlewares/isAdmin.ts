import { Response, NextFunction } from 'express'
import { ErrorObject } from '../helpers/error'
import { RequestExt } from '../types-interfaces/req'

const isAdminMiddleware = ({ user }: RequestExt, res: Response, next: NextFunction) => {
  try { 
    const { isAdmin } = user
    if (!isAdmin) throw new ErrorObject('Unauthorized user', 403)

    next()
  } catch (err) {
    res.status(500).send(err)
  }
}

export default isAdminMiddleware
