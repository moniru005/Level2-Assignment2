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
exports.orderService = void 0;
const order_model_1 = __importDefault(require("../order.model"));
const createOrderFromDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = new order_model_1.default(orderData);
    yield result.save();
    return result;
});
const getOrdersFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query = {};
    if (email) {
        query.email = email;
    }
    return order_model_1.default.find(query).exec();
});
const getOrderByIdFromDB = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findById(orderId).exec();
    if (!result) {
        const error = new Error('Order not found');
        error.name = 'NotFoundError';
        throw error;
    }
    return result.toObject();
});
exports.orderService = {
    createOrderFromDB,
    getOrdersFromDB,
    getOrderByIdFromDB,
};
