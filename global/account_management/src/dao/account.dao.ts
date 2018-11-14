import {BaseMongoImpDao} from '../../../common/src/repository/baseMongoImp.dao';
import {AccountModel} from '../../../common/src/models/accountModel';

export class AccountDao extends BaseMongoImpDao<AccountModel> {
    constructor() {
        super('account');
    }
}
