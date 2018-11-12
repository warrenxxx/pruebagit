import {BaseMongoImpDao} from '../../../common/src/repository/baseMongoImp.dao';
import {AccountModel} from '../../../common/src/models/account.model';

export class AccountDao extends BaseMongoImpDao<AccountModel> {
    constructor() {
        super('account');
    }
}
