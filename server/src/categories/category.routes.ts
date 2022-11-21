import express from 'express'
import categoryCtrl from './controllers/category.controller'
import isAuth from '../shared/middlewares/isAuth'
const router = express.Router()

router
  .post('/', isAuth, categoryCtrl.createCategory)

export default router
