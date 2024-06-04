import { Router } from 'express'
import { ProductController } from './product.controller'

const router = Router()

router.post('/', ProductController.createProduct)
router.get('/', ProductController.getAllProducts)
router.get('/:productId', ProductController.getProductById)
router.put('/:productId', ProductController.updateProduct)
router.delete('/:productId', ProductController.deleteProduct)

export const ProductRoutes = router
