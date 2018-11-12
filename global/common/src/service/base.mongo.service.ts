import {AuthenticationError} from '../errorHandling/Exceptions/authentication.error';
import {ObjectId} from 'bson';
import {AccountModel} from '../models/account.model';
import {AuditModel} from '../models/audit.model';
import {FunctionRule} from '../models/role.model';
import {BaseMongoImpDao} from '../repository/baseMongoImp.dao';

export class BaseMongoService<T> {

    private dao: BaseMongoImpDao<T>;

    constructor(coll: string) {
        this.dao = new BaseMongoImpDao(coll);
    }

    public async insert(x: T): Promise<T> {
        return this.dao.insert(x);
    }

    public async delete(x: string): Promise<number | undefined> {
        return this.dao.removeById(x);
    }
}
