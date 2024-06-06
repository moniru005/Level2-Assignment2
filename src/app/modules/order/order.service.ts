import OrderModel from '../order.model'
// import ProductModel from '../product.model'
import { IOrder } from './order.interface'

const createOrderFromDB = async (orderData: IOrder) => {
  const result = new OrderModel(orderData)
  await result.save()
  return result
}

const getOrdersFromDB = async (email?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {}

  if (email) {
    query.email = email
  }
  return OrderModel.find(query).exec()
}

const getOrderByIdFromDB = async (orderId: string) => {
  const result = await OrderModel.findById(orderId).exec()
  if (!result) {
    const error = new Error('Order not found')
    error.name = 'NotFoundError'
    throw error
  }
  return result.toObject()
}

export const orderService = {
  createOrderFromDB,
  getOrdersFromDB,
  getOrderByIdFromDB,
}
