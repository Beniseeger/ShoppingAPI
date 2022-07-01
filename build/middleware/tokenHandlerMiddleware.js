'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
var tokenHandler = function (_req, res, next) {
  var authorizationHeader = _req.headers.authorization;
  try {
    console.log(authorizationHeader);
    var token = authorizationHeader.split(' ')[1];
    jsonwebtoken_1['default'].verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    if (authorizationHeader == undefined) {
      res.status(401).json('No Token was provided '.concat(err));
    } else {
      res.status(401).json('Invalid token '.concat(err));
    }
    return false;
  }
  next();
  return true;
};
exports['default'] = tokenHandler;
