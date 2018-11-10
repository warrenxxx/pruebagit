"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const MongoConfig_1 = __importDefault(require("../config/MongoConfig"));
class BaseDaoMongoImpl {
    constructor(collection) {
        this.collection = collection;
    }
    count() {
        return MongoConfig_1.default
            .db
            .collection(this.collection)
            .countDocuments();
    }
    findAll() {
        return MongoConfig_1.default
            .db
            .collection(this.collection)
            .find()
            .toArray();
    }
    findById(id) {
        return MongoConfig_1.default
            .db
            .collection(this.collection)
            .findOne({ '_id': new mongodb_1.ObjectId(id) });
    }
    insert(object) {
        return MongoConfig_1.default
            .db
            .collection(this.collection)
            .insertOne(object)
            .then(e => e.ops[0]);
    }
    removeById(id) {
        return MongoConfig_1.default
            .db
            .collection(this.collection)
            .deleteOne({ '_id': new mongodb_1.ObjectId(id) })
            .then(e => e.deletedCount);
    }
    update(object) {
        return MongoConfig_1.default
            .db
            .collection(this.collection)
            .updateOne({ '_id': new mongodb_1.ObjectId(object['_id']) }, object)
            .then(e => object);
    }
}
exports.BaseDaoMongoImpl = BaseDaoMongoImpl;
