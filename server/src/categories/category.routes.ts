import express from 'express'
import categoryCtrl from './controllers/category.controller'
import isAuth from '../shared/middlewares/isAuth'
import isAdmin from '../shared/middlewares/isAdmin'

const router = express.Router()

router
  .get('/', categoryCtrl.getCategories)
  .post('/', isAuth, isAdmin, categoryCtrl.createCategory)
  .delete('/:categoryId', isAuth, isAdmin, categoryCtrl.deleteCategory)

export default router
