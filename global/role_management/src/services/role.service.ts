import {BaseMongoService} from '../../../common/src/service/base.mongo.service';
import {RoleModel} from '../../../common/src/models/role.model';

export class RoleService  extends BaseMongoService<RoleModel> {
    constructor() {
        super('role');
    }
}

