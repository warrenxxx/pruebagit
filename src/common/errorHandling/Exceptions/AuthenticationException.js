"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../AppError");
const Errors_json_1 = __importDefault(require("../Errors.json"));
class AuthenticationException extends AppError_1.AppError {
    constructor(message, code, userName) {
        super(AuthenticationException['name'], message, [], code, '', userName);
    }
    static LoginException(userName) {
        const x = Errors_json_1.default.LoginException;
        return new AuthenticationException(x.message, x.code, userName);
    }
}
exports.AuthenticationException = AuthenticationException;
