import mongoose, { Document, Schema } from 'mongoose'
import { IOrder } from './order/order.interface'

interface IOrderDocument extends IOrder, Document {}

const OrderSchema: Schema = new Schema({
  email: { type: String },
  productId: { type: Schema.Types.ObjectId, ref: 'Product'},
  price: { type: Number},
  quantity: { type: Number },
})

const OrderModel = mongoose.model<IOrderDocument>('Order', OrderSchema)

export default OrderModel
