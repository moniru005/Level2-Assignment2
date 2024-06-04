import mongoose, { Document, Schema } from 'mongoose'
import { IProduct } from './product/product.interface'

interface IProductDocument extends IProduct, Document {}

const VariantSchema = new Schema({
  type: { type: String },
  value: { type: String },
})

const InventorySchema: Schema = new Schema({
  quantity: { type: Number },
  inStock: { type: Boolean },
})

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantSchema], required: true },
  inventory: { type: InventorySchema, required: true },
  isDeleted: { type: Boolean, default: false },
})

ProductSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

ProductSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } })
  next()
})

const ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema)

export default ProductModel
