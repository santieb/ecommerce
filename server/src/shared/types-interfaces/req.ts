import { Request } from 'express'

export interface RequestExt extends Request {
  user?: any
}
