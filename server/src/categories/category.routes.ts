import express from 'express'
import categoryCtrl from './controllers/category.controller'
import isAuth from '../shared/middlewares/isAuth'
import isAdmin from '../shared/middlewares/isAdmin'

const router = express.Router()

router
  .post('/', isAuth, isAdmin, categoryCtrl.createCategory)

export default router
