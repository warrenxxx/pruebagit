"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
class Audit {
    constructor() {
        this.createdLocalDate = new Date();
        this.modifiedLocalDate = new Date();
        this.modifiedBy = new bson_1.ObjectID();
        this.createdBy = new bson_1.ObjectID();
    }
}
exports.Audit = Audit;
