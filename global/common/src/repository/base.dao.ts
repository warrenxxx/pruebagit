import {ObjectId} from 'bson';

export interface BaseDao<T> {
    insert(object: T): Promise<T>;

    update(object: T): Promise<T>;

    removeById(id: string|ObjectId): Promise<Number | undefined>;

    findById(id: string|ObjectId): Promise<T | null>;

    findAll(): Promise<T[]>;

    count(): Promise<Number>;
}
