"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Product and Order Routes
app.use('/api/products', product_route_1.ProductRoutes);
app.use('/api/orders', order_route_1.orderRoutes);
app.get('/', (req, res, next) => {
    res.send(`
    <div>
    <p>Ecommerce Server is Running on port 5000</p> 
    <p>For Product searching please follow the route <a href="http://localhost:5000/api/products"> http://localhost:5000/api/products</a></p> 
    <p>For Orders Route please follow the route <a href="http://localhost:5000/api/orders"> http://localhost:5000/api/orders </a></p>
    </div/>
    `);
    next();
});
// Routing Error Handling
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
    next();
});
exports.default = app;
