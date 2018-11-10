import {BaseDaoMongoImpl} from '../../common/repository/BaseDaoMongoImpl';
import {Account} from '../../common/models/Account';
import MongoConfig from '../../common/config/MongoConfig';

export class AccountDao extends BaseDaoMongoImpl<Account> {
    constructor() {
        super('account');
    }

    findByUserName(x: string): Promise<Account> {
        return MongoConfig.db
            .collection(this.collection)
            .findOne({'userName': x});
    }

}
