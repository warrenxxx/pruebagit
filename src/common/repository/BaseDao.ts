export interface BaseDao<T> {
    insert(object: T): Promise<T>;

    update(object: T): Promise<T>;

    removeById(id: string): Promise<Number | undefined>;

    findById(id: string): Promise<T | null>;

    findAll(): Promise<T[]>;

    count(): Promise<Number>;


}
