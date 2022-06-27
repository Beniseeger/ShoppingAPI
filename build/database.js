"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var client;
var _a = process.env, HOST = _a.HOST, DB_NAME_DEV = _a.DB_NAME_DEV, DB_NAME_TEST = _a.DB_NAME_TEST, DB_USER = _a.DB_USER, DB_USER_PASSWORD = _a.DB_USER_PASSWORD, ENV = _a.ENV;
if (ENV === 'DEV') {
    client = new pg_1.Pool({
        host: HOST,
        database: DB_NAME_DEV,
        user: DB_USER,
        password: DB_USER_PASSWORD
    });
}
if (ENV === 'TEST') {
    client = new pg_1.Pool({
        host: HOST,
        database: DB_NAME_TEST,
        user: DB_USER,
        password: DB_USER_PASSWORD
    });
}
exports["default"] = client;
