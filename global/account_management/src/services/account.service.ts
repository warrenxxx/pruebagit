import {AccountModel} from '../../../common/src/models/accountModel';
import {BaseMongoService} from '../../../common/src/service/base.mongo.service';

export class AccountService  extends BaseMongoService<AccountModel> {
    constructor() {
        super('account');
    }
}

