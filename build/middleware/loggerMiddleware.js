"use strict";
exports.__esModule = true;
/**
 * Returns the api point accessed by the user.
 * @param req request paramters of type express.Request
 * @param res response parameters of type express.Reponse
 * @param next next middleware
 * @returns the api point accessed by the user and logs it in the console.
 */
var loggerMiddleware = function (req, res, next) {
    console.log("The endpoint: ".concat(req.url, " has been accessed"));
    next();
    return "The endpoint: ".concat(req.url, " has been accessed");
};
exports["default"] = loggerMiddleware;
