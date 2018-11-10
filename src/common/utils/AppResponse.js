"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../errorHandling/AppError");
class AppResponse {
    constructor(data, error) {
        this.data = data;
        this.error = error;
    }
    static ok() {
        return new AppResponse('ok', null);
    }
    static okObject(o) {
        return new AppResponse(o, null);
    }
    static okCount(count) {
        return new AppResponse({
            message: 'ok',
            numInserted: count
        }, null);
    }
    static errorResponse(err) {
        if (err instanceof AppError_1.AppError)
            return new AppResponse(null, err);
        else
            return new AppResponse(null, err);
    }
}
exports.AppResponse = AppResponse;
