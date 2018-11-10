"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoConfig_1 = __importDefault(require("../config/MongoConfig"));
class AppError {
    constructor(errorNameException, message, errorValues, errorCode, messageSystem, userName) {
        this.errorNameException = errorNameException;
        this.name = errorNameException;
        this.message = message;
        this.errorValues = errorValues;
        this.errorCode = errorCode;
        this.messageSystem = messageSystem;
        this.errorDate = new Date();
        this.userName = userName;
        this.saveError();
    }
    saveError() {
        MongoConfig_1.default.db.collection('error').insertOne(this).then();
    }
}
exports.AppError = AppError;
class ErrorValue {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
exports.ErrorValue = ErrorValue;
