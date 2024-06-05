import express, { Application } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
import { orderRoutes } from './app/modules/order/order.route'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

app.use('/api/products', ProductRoutes)
app.use('/api/orders', orderRoutes)

export default app
