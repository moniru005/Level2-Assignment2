import { Request, Response } from 'express'
import { orderService } from './order.service'
import { orderSchemaValidation } from './order.validation'
import ProductModel from '../product.model'
import { IOrder } from './order.interface'

const createOrder = async (req: Request, res: Response) => {
  try {
    const parsed = orderSchemaValidation.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: parsed.error.errors,
      })
    }
    const { email, productId, price, quantity }: IOrder = parsed.data

    // Check product inventory
    const product = await ProductModel.findById(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }
    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      })
    }

    // Update product inventory
    product.inventory.quantity -= quantity
    product.inventory.inStock = product.inventory.quantity > 0
    await product.save()

    // Create order
    const newOrder = await orderService.createOrderFromDB({
      email,
      productId,
      price,
      quantity,
    })

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: newOrder,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}

const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined
    const result = await orderService.getOrdersFromDB(email)
    if (result[0].email === email) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: true,
      message: 'Something went wrong!',
      data: error,
    })
  }
}

const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id
    const result = await orderService.getOrderByIdFromDB(orderId)
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === 'NotFoundError') {
      res.status(404).json({
        success: false,
        message: 'Order Not found',
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went error!',
      })
    }
  }
}

export const orderController = {
  createOrder,
  getOrders,
  getOrderById,
}
