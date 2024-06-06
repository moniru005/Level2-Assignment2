"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_validation_1 = __importDefault(require("./product.validation"));
const product_service_1 = require("./product.service");
const zod_1 = require("zod");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodParsedData = product_validation_1.default.parse(req.body);
        const result = yield product_service_1.ProductService.createProductIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                message: error.errors,
            });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const products = yield product_service_1.ProductService.getProductFromDB(searchTerm);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.getProductByIdFromDB(productId);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Product fetched successfully!',
                data: result,
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: 'Product not found!',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch product',
            error: error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const result = yield product_service_1.ProductService.updateProductFromDB(productId, updateData);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete product',
            error: error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        product_service_1.ProductService.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete product',
            error: error,
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
