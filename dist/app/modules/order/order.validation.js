"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidation = zod_1.z.object({
    email: zod_1.z.string(),
    productId: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.default = orderValidation;
