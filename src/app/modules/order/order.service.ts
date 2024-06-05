import OrderModel from '../order.model'
import ProductModel from '../product.model'
import { IOrder } from './order.interface'

const createOrderFromDB = async (orderData: IOrder) => {
  const product = await ProductModel.findById(orderData.productId)

  if (!product || product.isDeleted) {
    throw new Error('Product not found or has been deleted')
  }

  if (orderData.quantity > product.inventory.quantity) {
    const error = new Error('Insufficient quantity available in inventory')
    error.name = 'InsufficientQuantityError'
    throw error
  }

  product.inventory.quantity -= orderData.quantity
  product.inventory.inStock = product.inventory.quantity > 0

  const order = new OrderModel(orderData)
  await order.save()
  return order.toObject()
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
