import {Db, ObjectId} from 'mongodb';
import {BaseDao} from './base.dao';
import {AuditModel} from '../models/audit.model';

export class BaseMongoImpDao<T extends Documento> implements BaseDao<T> {
    protected readonly collection: string;

    constructor(collection: string) {
        this.collection = collection;
    }

    count(db: Db): Promise<Number> {
        return db
            .collection(this.collection)
            .countDocuments();
    }

    findAll(db: Db): Promise<T[]> {
        return db
            .collection(this.collection)
            .find()
            .map(e => {
                e['audit'] = undefined;
                return e;
            })
            .toArray();
    }

    findById(db: Db, id: string | ObjectId): Promise<T | null> {
        return db
            .collection(this.collection)
            .findOne({'_id': id});
    }

    insert(db: Db, object: T): Promise<T> {
        return db
            .collection(this.collection)
            .insertOne(object)
            .then(e => e.ops[0]);
    }

    removeById(db: Db, id: string | ObjectId): Promise<number | undefined> {
        return db
            .collection(this.collection)
            .deleteOne({'_id': id})
            .then(e => e.deletedCount);
    }

    update(db: Db, object: T): Promise<T> {
        const id = object._id;

        delete object._id;
        return db
            .collection(this.collection)
            .updateOne({'_id': id}, {$set: object})
            .then(e => {
                return object;
            });
    }

    existsById(db: Db, id: string): Promise<boolean> {
        return db
            .collection(this.collection)
            .findOne({'_id': new ObjectId(id)})
            .then(e => {
                if (e) return true;
                return false;
            });
    }

}

export interface Documento {
    _id: ObjectId | string;
    audit?: AuditModel;
}
