import mongoose, { Document, Schema } from 'mongoose'
import { IProduct } from './product/product.interface'

interface IProductDocument extends IProduct, Document {}

const VariantSchema = new Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
})

const InventorySchema: Schema = new Schema({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
})

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantSchema], required: true },
  inventory: { type: InventorySchema, required: true },
})

const Product = mongoose.model<IProductDocument>('Product', ProductSchema)

export default Product
