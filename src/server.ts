import mongoose from 'mongoose'
import config from './app/config'
import app from './app'
import { NextFunction, Request, Response } from 'express'
import { orderRoutes } from './app/modules/order/order.route'
import { ProductRoutes } from './app/modules/product/product.route'

// Product and Order Routes
app.use('/api/products', ProductRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send(
    `
    <div>
    <p>Ecommerce Server is Running on port 5000</p> 
    <p>For Product searching please follow the route <a href="http://localhost:5000/api/products"> http://localhost:5000/api/products</a></p> 
    <p>For Orders Route please follow the route <a href="http://localhost:5000/api/orders"> http://localhost:5000/api/orders </a></p>
    </div/>
    `,
  )
  next()
})

// Routing Error Handling
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
  next()
})

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      console.log(`Ecommerce app is listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

export default main()
