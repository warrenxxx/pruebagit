"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../AppError");
const Errors_json_1 = __importDefault(require("../Errors.json"));
class ValidationException extends AppError_1.AppError {
    constructor(message, code, userName) {
        super(ValidationException['name'], message, [], code, '', userName);
    }
    static ValidateRequestException(userName) {
        const x = Errors_json_1.default.ValidateRequestException;
        return new ValidationException(x.message, x.code, userName);
    }
}
exports.ValidationException = ValidationException;
