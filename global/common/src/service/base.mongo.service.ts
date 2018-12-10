import {ObjectId} from 'bson';
import {AuditModel} from '../models/audit.model';
import {BaseMongoImpDao, Documento} from '../repository/baseMongoImp.dao';
import {ObjectNullError} from '../errorHandling/Exceptions/objectNull.error';
import {ObjectNotFoundError} from '../errorHandling/Exceptions/objectNotFound.error';
import {Req} from '../security/jwt';
import {Db} from 'mongodb';

export class BaseMongoService<T extends Documento> {

    private dao: BaseMongoImpDao<T>;

    constructor(coll: string) {
        this.dao = new BaseMongoImpDao(coll);
    }

    public async insert(db: Db, x: T, _id: string): Promise<T> {

        x.audit = AuditModel.newAuditStatic(_id);
        return this.dao.insert(db, x).then(e => {
            delete e.audit;
            return e;
        });
    }

    public async readOne(db: Db, id: string | ObjectId): Promise<T> {
        if (id)
            return this.dao.findById(db, id).then(value => {
                if (value) {
                    delete value.audit;
                    delete (<any>value)['password'];
                    return value;
                } else throw new ObjectNotFoundError();

            });
        else throw ObjectNullError.ValidateRequestException('id');
    }

    public async readAll(db: Db): Promise<T[]> {
        return this.dao.findAll(db).then(e => {
            e.forEach(value => {
                if ((<any>value)['audit']) (<any>value)['audit'] = undefined;
                if ((<any>value)['password']) (<any>value)['password'] = undefined;
            });
            return e;
        });
    }

    public async update(db: Db, x: T, _id: string): Promise<T> {
        return this.dao.findById(db, x._id).then(e => {
            if (e) {
                e.audit.modifiedBy = new ObjectId(_id);
                e.audit.modifiedLocalDate = new Date();
                x.audit = e.audit;
                return x;
            } else throw ObjectNotFoundError.UserNotFoundException('');
        }).then(e => this.dao.update(db, e))
            .then(e => {
                delete e.audit;
                return e;
            });
    }

    public async delete(db: Db, id: string | ObjectId): Promise<number | undefined> {
        return this.dao.findById(db, id).then(e => {
            if (e) {
                return this.dao.removeById(db, id);
            } else throw new ObjectNotFoundError();
        });
    }
}

