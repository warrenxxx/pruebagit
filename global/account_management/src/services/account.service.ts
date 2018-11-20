import {AccountModel} from '../../../common/src/models/accountModel';
import {BaseMongoService} from '../../../common/src/service/base.mongo.service';
import {nameColection} from '../dao/account.dao';

export class AccountService  extends BaseMongoService<AccountModel> {
    constructor() {
        super(nameColection);
    }
}

