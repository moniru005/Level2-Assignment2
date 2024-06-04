import { z } from 'zod'

const VariantValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
})

const InventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
})

export const ProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(VariantValidationSchema),
  inventory: InventoryValidationSchema,
  isDeleted: z.boolean().optional(),
})

export default ProductValidationSchema
