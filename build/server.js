"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var loggerMiddleware_1 = __importDefault(require("./middleware/loggerMiddleware"));
var body_parser_1 = __importDefault(require("body-parser"));
var userHandler_1 = __importDefault(require("./handlers/userHandler"));
var productHandler_1 = __importDefault(require("./handlers/productHandler"));
var orderHandler_1 = __importDefault(require("./handlers/orderHandler"));
var orderProductHandler_1 = __importDefault(require("./handlers/orderProductHandler"));
var app = (0, express_1["default"])();
var address = '0.0.0.0:3000';
//Middleware used for all routes
app.use(loggerMiddleware_1["default"]);
app.use((0, cors_1["default"])());
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.send('Initial route!');
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
app.use('/users', userHandler_1["default"]);
app.use('/products', productHandler_1["default"]);
app.use('/orders', orderHandler_1["default"]);
app.use('/orderproduct', orderProductHandler_1["default"]);
exports["default"] = app;
