import {BaseMongoService} from '../../../common/src/service/base.mongo.service';
import {RoleModel} from '../../../common/src/models/role.model';
import {FunctionModel} from '../../../common/src/models/functionModel';

export class FunctionService  extends BaseMongoService<FunctionModel> {
    constructor() {
        super('functions');
    }
}

