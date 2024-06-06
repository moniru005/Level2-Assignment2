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
exports.ProductService = void 0;
const product_model_1 = __importDefault(require("../product.model"));
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(productData);
    return result;
});
const getProductFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = { isDeleted: false };
    if (searchTerm) {
        const searchRegex = new RegExp(searchTerm, 'i');
        query.$or = [
            { name: searchRegex },
            { description: searchRegex },
            { category: searchRegex },
            { tags: searchRegex },
        ];
    }
    return product_model_1.default.find(query).exec();
});
const getProductByIdFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(productId);
    return result;
});
const updateProductFromDB = (productId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndUpdate(productId, updateData, {
        new: true,
    });
    return result;
});
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndUpdate(productId, {
        isDeleted: true,
    });
    return result;
});
exports.ProductService = {
    createProductIntoDB,
    getProductFromDB,
    getProductByIdFromDB,
    updateProductFromDB,
    deleteProductFromDB,
};
