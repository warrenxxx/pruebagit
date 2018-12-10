import {BaseMongoImpDao} from '../../../common/src/repository/baseMongoImp.dao';
import {AccountModel} from '../../../common/src/models/accountModel';

export class RoleDao extends BaseMongoImpDao<AccountModel> {
    constructor() {
        super('product');
    }
}
