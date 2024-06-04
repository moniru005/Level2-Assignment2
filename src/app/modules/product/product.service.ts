import ProductModel from '../product.model'
import { IProduct } from './product.interface'

const createProductIntoDB = async (productData: IProduct) => {
  const result = await ProductModel.create(productData)
  return result
}

const getProductFromDB = async (searchTerm?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = { isDeleted: false }

  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm, 'i')
    query.$or = [
      { name: searchRegex },
      { description: searchRegex },
      { category: searchRegex },
      { tags: searchRegex },
    ]
  }

  return ProductModel.find(query).exec()
}

const getProductByIdFromDB = async (productId: string) => {
  const result = await ProductModel.findById(productId)
  return result
}

const updateProductFromDB = async (productId: string, updateData: IProduct) => {
  const result = await ProductModel.findByIdAndUpdate(productId, updateData, {
    new: true,
  })
  return result
}

const deleteProductFromDB = async (productId: string) => {
  const result = await ProductModel.findByIdAndUpdate(productId, {
    isDeleted: true,
  })
  return result
}

export const ProductService = {
  createProductIntoDB,
  getProductFromDB,
  getProductByIdFromDB,
  updateProductFromDB,
  deleteProductFromDB,
}
