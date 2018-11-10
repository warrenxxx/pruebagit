"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../AppError");
const Errors_json_1 = __importDefault(require("../Errors.json"));
class ObjectNotFoundException extends AppError_1.AppError {
    constructor(message, code, userName) {
        super(ObjectNotFoundException['name'], message, [], code, '', userName);
    }
    static UserNotFoundException(userName) {
        const x = Errors_json_1.default.UserNotFoundException;
        return new ObjectNotFoundException(x.message.replace('$name', userName), x.code, userName);
    }
}
exports.ObjectNotFoundException = ObjectNotFoundException;
