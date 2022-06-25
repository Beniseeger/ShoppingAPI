"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var tokenHandler = function (_req, res, next) {
    try {
        var token = _req.body.token;
        jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401).json("Invalid token ".concat(err));
        return;
    }
    next();
};
exports["default"] = tokenHandler;
