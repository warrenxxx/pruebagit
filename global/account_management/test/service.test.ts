import 'mocha';
import MongoConfig from '../../common/src/config/mongo.config';
import config from '../../enviroments.json';
import {AccountService} from '../src/services/account.service';
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
