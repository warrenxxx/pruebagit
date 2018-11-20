import {ObjectId} from 'mongodb';
import MongoConfig from '../config/mongo.config';
import {BaseDao} from './base.dao';

export class BaseMongoImpDao<T> implements BaseDao<T> {
    protected readonly collection: string;

    constructor(collection: string) {
        this.collection = collection;
    }

    count(): Promise<Number> {
        return MongoConfig
            .db
            .collection(this.collection)
            .countDocuments();
    }

    findAll(): Promise<T[]> {
        return MongoConfig
            .db
            .collection(this.collection)
            .find()
            .map(e => {
                e['audit'] = undefined;
                return e;
            })
            .toArray();
    }

    findById(id: string | ObjectId): Promise<T | null> {
        return MongoConfig
            .db
            .collection(this.collection)
            .findOne({'_id': id});
    }

    insert(object: T): Promise<T> {
        return MongoConfig
            .db
            .collection(this.collection)
            .insertOne(object)
            .then(e => e.ops[0]);
    }

    removeById(id: string | ObjectId): Promise<number | undefined> {
        return MongoConfig
            .db
            .collection(this.collection)
            .deleteOne({'_id': id})
            .then(e => e.deletedCount);
    }

    update(object: T): Promise<T> {
        const id = (<any>object)['_id'];
        // @ts-ignore
        delete object._id;
        return MongoConfig
            .db
            .collection(this.collection)
            .updateOne({'_id': id}, {$set: object})
            .then(e => {
                return object;
            });
    }
}
