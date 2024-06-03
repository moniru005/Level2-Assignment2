import Product from '../product.model'
import { IProduct } from './product.interface'

export const createProductIntoDB = async (
  productData: IProduct,
): Promise<IProduct> => {
  const product = new Product(productData)
  const result = await product.save()
  return result
}

export const getProductFromDB = async (): Promise<IProduct[]> => {
  const result = await Product.find()
  return result
}

export const getProductByIdFromDB = async (productId: string) => {
  const result = await Product.findById(productId)
  return result
}

export const updateProductDB = async (
  productId: string,
  updateData: IProduct,
) => {
  const result = await Product.findOneAndUpdate({ productId }, updateData, {
    new: true,
  })
  return result
}

export const deleteStudentFromDB = async (productId: string) => {
  const result = await Product.updateOne({ productId }, { isDeleted: true })
  return result
}
