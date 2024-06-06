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
exports.orderController = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderParseData = order_validation_1.default.parse(req.body);
        const result = yield order_service_1.orderService.createOrderFromDB(orderParseData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        if (error.name === 'InsufficientQuantityError') {
            res.status(400).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield order_service_1.orderService.getOrdersFromDB(email);
        if (result[0].email === email) {
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully for user email!',
                data: result,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully!',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: 'Something went wrong!',
            data: error,
        });
    }
});
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const result = yield order_service_1.orderService.getOrderByIdFromDB(orderId);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        if (error.name === 'NotFoundError') {
            res.status(404).json({
                success: false,
                message: 'Order Not found',
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Something went error!',
            });
        }
    }
});
exports.orderController = {
    createOrder,
    getOrders,
    getOrderById,
};
