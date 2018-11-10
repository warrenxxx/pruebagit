import {ObjectId} from 'mongodb';
import MongoConfig from '../config/MongoConfig';
import {BaseDao} from './BaseDao';

export class BaseDaoMongoImpl<T> implements BaseDao<T> {
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
            .toArray();
    }

    findById(id: string): Promise<T | null> {
        return MongoConfig
            .db
            .collection(this.collection)
            .findOne({'_id': new ObjectId(id)});
    }

    insert(object: T): Promise<T> {
        return MongoConfig
            .db
            .collection(this.collection)
            .insertOne(object)
            .then(e => e.ops[0]);
    }

    removeById(id: string): Promise<Number | undefined> {
        return MongoConfig
            .db
            .collection(this.collection)
            .deleteOne({'_id': new ObjectId(id)})
            .then(e => e.deletedCount);
    }

    update(object: T): Promise<T> {

        return MongoConfig
            .db
            .collection(this.collection)
            .updateOne({'_id': new ObjectId((<any>object)['_id'])}, object)
            .then(e => object);
    }
}
