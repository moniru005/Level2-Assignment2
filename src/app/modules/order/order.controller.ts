import { Request, Response } from 'express'
import orderValidation from './order.validation'
import { orderService } from './order.service'

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderParseData = orderValidation.parse(req.body)
    const result = await orderService.createOrderFromDB(orderParseData)
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === 'InsufficientQuantityError') {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      })
    } else {
      res.status(400).json({
        success: false,
        message: error.message,
      })
    }
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
