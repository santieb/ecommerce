import express from 'express'
import categoryCtrl from './controllers/category.controller'
const router = express.Router()

router
  .post('/', categoryCtrl.createCategory)

export default router
