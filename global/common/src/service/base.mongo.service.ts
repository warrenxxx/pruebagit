import {AuthenticationError} from '../errorHandling/Exceptions/authentication.error';
import {ObjectId} from 'bson';
import {AccountModel} from '../models/accountModel';
import {AuditModel} from '../models/audit.model';
import {FunctionModel} from '../models/functionModel';
import {BaseMongoImpDao} from '../repository/baseMongoImp.dao';
import {ObjectNullError} from '../errorHandling/Exceptions/objectNull.error';

export class BaseMongoService<T> {

    private dao: BaseMongoImpDao<T>;

    constructor(coll: string) {
        this.dao = new BaseMongoImpDao(coll);
    }

    public async insert(x: T, _id: string): Promise<T> {
        const aud: AuditModel = <AuditModel>((<any>x)['audit']);
        aud.newAudit(_id);
        return this.dao.insert(x);
    }

    public async readOne(id: string): Promise<T> {
        if (id)
            return this.dao.findById(id);
        else throw ObjectNullError.ValidateRequestException('id');
    }

    public async readAll(): Promise<T[]> {
        return this.dao.findAll();
    }

    public async update(x: T, _id: string): Promise<T> {
        const aud: AuditModel = <AuditModel>((<any>x)['audit']);
        aud.actAudit(_id);
        return this.dao.update(x);
    }

    public async delete(id: string): Promise<number | undefined> {
        if (id)
            return this.dao.removeById(id);
        else throw ObjectNullError.ValidateRequestException('id');
    }
}
