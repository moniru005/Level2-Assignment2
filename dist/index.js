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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/config"));
const order_route_1 = require("./app/modules/order/order.route");
const product_route_1 = require("./app/modules/product/product.route");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send(`
    <div>
    <p>Ecommerce Server is Running on port 5000</p> 
    <p>For Product searching please follow the route <a href="http://localhost:5000/api/products"> http://localhost:5000/api/products</a></p> 
    <p>For Orders Route please follow the route <a href="http://localhost:5000/api/orders"> http://localhost:5000/api/orders </a></p>
    </div/>
    `);
});
// Product and Order Routes
app.use('/api/products', product_route_1.ProductRoutes);
app.use('/api/orders', order_route_1.orderRoutes);
// Routing Error Handling
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            app.listen(config_1.default.port, () => {
                console.log(`Ecommerce app is listening on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = main();
