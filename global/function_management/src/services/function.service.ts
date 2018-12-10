import {BaseMongoService} from '../../../common/src/service/base.mongo.service';
import {FunctionModel} from '../../../common/src/models/functionModel';
import {ObjectNullError} from '../../../common/src/errorHandling/Exceptions/objectNull.error';
import {FunctionDao} from '../dao/function.dao';

export class FunctionService extends BaseMongoService<FunctionModel> {
    private daoFunctions: FunctionDao;

    constructor() {
        super('function');
        this.daoFunctions = new FunctionDao();
    }

    async readOne(id: string): Promise<FunctionModel> {
        if (id)
            return this.daoFunctions.findById(id).then(value => {
                if ((<any>value)['audit']) (<any>value)['audit'] = undefined;
                if ((<any>value)['password']) (<any>value)['password'] = undefined;
                return value;
            });
        else throw ObjectNullError.ValidateRequestException('id');
    }
}

