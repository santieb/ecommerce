import { Router } from 'express'
import authRoutes from '../auth/auth.routes'
import productRoutes from '../products/product.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/products', productRoutes)

export default router
