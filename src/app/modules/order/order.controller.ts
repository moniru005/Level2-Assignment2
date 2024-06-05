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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      data: error,
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

export const orderController = {
  createOrder,
  getOrders,
}
