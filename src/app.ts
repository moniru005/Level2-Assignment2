import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
import { orderRoutes } from './app/modules/order/order.route'
import notFound from './middlewares/notFound'

const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// Product and Order Routes
app.use('/api/products', ProductRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send(
    `
      <div>
      <p>Ecommerce Server is Running on port 5000</p> 
      <p>For Product searching please follow the route <a href="http://localhost:5000/api/products"> http://localhost:5000/api/products</a></p> 
      <p>For Orders Route please follow the route <a href="http://localhost:5000/api/orders"> http://localhost:5000/api/orders </a></p>
      </div/>
      `,
  )
})

// Routing Error Handling
app.use(notFound)

export default app
