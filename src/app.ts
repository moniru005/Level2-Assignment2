import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
import { orderRoutes } from './app/modules/order/order.route'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// Product and Order Routes
app.use('/api/products', ProductRoutes)
app.use('/api/orders', orderRoutes)

// Routing Error Handling
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
  next()
})

export default app
