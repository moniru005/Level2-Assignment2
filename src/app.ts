import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

app.use('/api/products', ProductRoutes)

export default app
