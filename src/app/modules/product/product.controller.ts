import { Request, Response } from 'express'
import { ProductService } from './product.service'
import ProductValidationSchema from './product.validation'
import { IProduct } from './product.interface'

const createProduct = async (req: Request, res: Response) => {
  try {
    const zodParsedData = ProductValidationSchema.parse(req.body)
    const result = await ProductService.createProductIntoDB(zodParsedData)
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error,
    })
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined
    const products = await ProductService.getProductFromDB(searchTerm)
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductService.getProductByIdFromDB(productId)
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      })
    } else {
      res.status(200).json({
        success: false,
        message: 'Product not found!',
        data: result,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error,
    })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const updateData: IProduct = req.body
    const result = await ProductService.updateProductFromDB(
      productId,
      updateData,
    )

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error,
    })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    ProductService.deleteProductFromDB(productId)
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error,
    })
  }
}

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
