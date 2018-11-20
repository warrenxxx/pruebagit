import {BaseMongoImpDao} from '../../../common/src/repository/baseMongoImp.dao';
import {AccountModel} from '../../../common/src/models/accountModel';

export const nameColection = 'account';
export class AccountDao extends BaseMongoImpDao<AccountModel> {

    constructor() {
        super(nameColection);
    }
}
