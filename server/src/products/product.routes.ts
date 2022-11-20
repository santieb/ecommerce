import express from 'express'
import productCtrl from './controllers/product.controller'
const router = express.Router()

router
  .get('/', productCtrl.getProducts)

export default router
