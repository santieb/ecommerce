import { Router } from 'express'
import authRoutes from '../auth/auth.routes'
import productRoutes from '../products/product.routes'
import categoryRoutes from '../categories/category.routes'

const router = Router()

router
  .use('/auth', authRoutes)
  .use('/products', productRoutes)
  .use('/categories', categoryRoutes)

export default router
