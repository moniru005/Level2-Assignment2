import mongoose, { Document, Schema } from 'mongoose'
import { IOrder } from './order/order.interface'

interface IOrderDocument extends IOrder, Document {}

const OrderSchema: Schema = new Schema({
  email: { type: String, required: false },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const OrderModel = mongoose.model<IOrderDocument>('Order', OrderSchema)

export default OrderModel
