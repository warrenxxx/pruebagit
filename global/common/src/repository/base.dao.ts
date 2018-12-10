import {ObjectId} from 'bson';
import {Documento} from './baseMongoImp.dao';
import {Db} from 'mongodb';

export interface BaseDao<T extends Documento> {
    insert(db: Db, object: T): Promise<T>;

    update(db: Db, object: T): Promise<T>;

    removeById(db: Db, id: string | ObjectId): Promise<Number | undefined>;

    findById(db: Db, id: string | ObjectId): Promise<T | null>;

    findAll(db: Db): Promise<T[]>;

    count(db: Db): Promise<Number>;

    existsById(db: Db, id: string): Promise<Boolean>;
}
