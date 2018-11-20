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

    public async readOne(id: string | ObjectId): Promise<T> {

        if (id)
            return this.dao.findById(id).then(value => {
                if ((<any>value)['audit']) (<any>value)['audit'] = undefined;
                if ((<any>value)['password']) (<any>value)['password'] = undefined;
                return value;
            });
        else throw ObjectNullError.ValidateRequestException('id');
    }

    public async readAll(): Promise<T[]> {
        return this.dao.findAll().then(e => {
            e.forEach(value => {
                if ((<any>value)['audit']) (<any>value)['audit'] = undefined;
                if ((<any>value)['password']) (<any>value)['password'] = undefined;
            });
            return e;
        });
    }

    public async update(x: T, _id: string): Promise<T> {
        const aud: AuditModel = <AuditModel>((<any>x)['audit']);

        aud.actAudit(_id);
        return this.dao.update(x);
    }

    public async delete(id: string | ObjectId): Promise<number | undefined> {
        if (id)
            return this.dao.removeById(id);
        else throw ObjectNullError.ValidateRequestException('id');
    }
}
