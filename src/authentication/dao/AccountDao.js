"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDaoMongoImpl_1 = require("../../common/repository/BaseDaoMongoImpl");
const MongoConfig_1 = __importDefault(require("../../common/config/MongoConfig"));
class AccountDao extends BaseDaoMongoImpl_1.BaseDaoMongoImpl {
    constructor() {
        super('account');
    }
    findByUserName(x) {
        return MongoConfig_1.default.db
            .collection(this.collection)
            .findOne({ 'userName': x });
    }
}
exports.AccountDao = AccountDao;
