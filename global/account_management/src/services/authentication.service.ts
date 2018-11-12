import {AccountModel} from '../../../common/src/models/account.model';
import {BaseMongoService} from '../../../common/src/service/base.mongo.service';

export class AuthenticationService extends BaseMongoService<AccountModel> {
    constructor() {
        super('account');
    }
}

