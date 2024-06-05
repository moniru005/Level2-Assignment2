import OrderModel from '../order.model'
import { IOrder } from './order.interface'

const createOrderFromDB = async (orderData: IOrder) => {
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

export const orderService = {
  createOrderFromDB,
  getOrdersFromDB,
}
