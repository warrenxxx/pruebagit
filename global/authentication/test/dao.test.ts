import 'mocha';
import * as assert from 'assert';
import MongoConfig from '../../common/src/config/mongo.config';
import config from '../../enviroments.json';
import {AccountDao} from '../src/dao/account.dao';
import {zeedAccounts, zeedFunctions, zeedRoles} from '../../zeed.data';
import {print} from 'util';


const dao: AccountDao = new AccountDao();

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
    it('db count', () => {
        return MongoConfig.db.collection('role').find({}).toArray()
            .then(e => assert.equal(e.length, 3))
            .then(e => MongoConfig.db.collection('account').find({}).toArray())
            .then(e => assert.equal(e.length, 4))
            .then(e => MongoConfig.db.collection('function').find({}).toArray())
            .then(e => assert.equal(e.length, 4))
            ;
    });
    it('find by userName', () => {
        return dao.findByUserNameAndServerResource('warrenxxx1').then(e => assert.strictEqual(e.email, 'warren_x_x1@gmail.com'));
    });
    it('get all Functions to w1', () => {
        //
        // return dao.getAllFunctions('warrenxxx1')
        //     .then(e => e.map(value => {
        //         const tmp: string [] = [];
        //         e.forEach(j => {
        //             j.methods.forEach(k => {
        //                 tmp.push(j._id + ' ' + k);
        //             });
        //         });
        //     }).sort())
        //     .then(e => assert.deepStrictEqual(e, ['usrins', 'usrrea', 'usrreo', 'usrupd', 'usrrem', 'mcrrea', 'mcrreo'].sort(), 'warren 1'))
        //     ;
    });
});
