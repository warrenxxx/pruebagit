import 'mocha';

import MongoConfig from '../../common/src/config/mongo.config';
import config from '../../enviroments.json';
import {AuthenticationService} from '../src/services/authentication.service';
import {AppError} from '../../common/src/errorHandling/app.error';
import {assert} from 'chai';
import {zeedAccounts, zeedFunctions, zeedRoles} from '../../zeed.data';


const service: AuthenticationService = new AuthenticationService();



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
    it('login err', (done) => {
        service.login({user: 'warrenxxx1', password: '12345s61'}).then(e => {
            assert.fail('sin authenticar');
            done();
        }).catch(err => {
            assert.instanceOf(err, AppError);
            const app: AppError = <AppError>err;
            assert.equal(app.errorCode, 3000);

            done();
        });
    });
    it('login ok', (done) => {
        service.login({user: 'warrenxxx1', password: '1234561'}).then(e => {
            assert.equal(e.account.userName, 'warrenxxx1');
            done();
        });


    });

});
