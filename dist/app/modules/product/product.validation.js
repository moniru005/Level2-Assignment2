"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidationSchema = void 0;
const zod_1 = require("zod");
const VariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number(),
    inStock: zod_1.z.boolean(),
});
exports.ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(VariantValidationSchema),
    inventory: InventoryValidationSchema,
    isDeleted: zod_1.z.boolean().optional(),
});
exports.default = exports.ProductValidationSchema;
