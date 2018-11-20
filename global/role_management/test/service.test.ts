import 'mocha';
import MongoConfig from '../../common/src/config/mongo.config';
import config from '../../enviroments.json';
import {RoleModel} from '../../common/src/models/role.model';
import {AuditModel} from '../../common/src/models/audit.model';
import {ObjectId} from 'bson';
import {AccountModel} from '../../common/src/models/accountModel';
import {AccountService} from '../../account_management/src/services/account.service';
import {FunctionModel} from '../../common/src/models/functionModel';
import {zeedAccounts, zeedFunctions, zeedRoles} from '../../zeed.data';


const service: AccountService = new AccountService();

describe('dao', () => {
    before(async () => {
        await MongoConfig.connect(config.mongoTest.url, config.mongoTest.db).then(e => {
            console.log('connect to database');
        }).then(j => MongoConfig.db.collection('functions').deleteMany({})
            .then(e => MongoConfig.db.collection('role').deleteMany({}))
            .then(e => MongoConfig.db.collection('role').insertMany(zeedRoles))
            .then(e => MongoConfig.db.collection('account').deleteMany({}))
            .then(e => MongoConfig.db.collection('account').insertMany(zeedAccounts))
            .then(e => MongoConfig.db.collection('function').deleteMany({}))
            .then(e => MongoConfig.db.collection('function').insertMany(zeedFunctions))
        );
    });

});
