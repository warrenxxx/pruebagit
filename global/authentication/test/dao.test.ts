import 'mocha';
import * as assert from 'assert';
import MongoConfig from '../../common/src/config/mongo.config';
import config from '../../enviroments.json';
import {RoleModel} from '../../common/src/models/role.model';
import {AuditModel} from '../../common/src/models/audit.model';
import {ObjectId} from 'bson';
import {AccountModel} from '../../common/src/models/accountModel';
import {AccountDao} from '../src/dao/account.dao';
import {FunctionModel} from '../../common/src/models/functionModel';

import zeed from '../../zeed.data.json';
const functions: FunctionModel[] = zeed.functions;

const roles: RoleModel[] = [
    {
        _id: new ObjectId(), name: 'user', description: 'es el usuario basico',
        functions: [
            'usrins', 'usrrea', 'usrreo', 'usrupd', 'usrrem'
        ], audit: new AuditModel(), isActive: true
    },
    {
        _id: new ObjectId(), name: 'admin', description: 'es el usuario basico',
        functions: [
            'usrins', 'usrrea', 'usrreo', 'usrupd', 'usrrem',
            'mcrins', 'mcrrea', 'mcrreo', 'mcrupd', 'mcrrem',
            'rolins', 'rolrea', 'rolreo', 'rolupd', 'rolrem'
        ], audit: new AuditModel(), isActive: true
    },
    {
        _id: new ObjectId(), name: 'editor', description: 'es el usuario basico',
        functions: [
            'mcrins', 'mcrrea', 'mcrreo', 'mcrupd', 'mcrrem'
        ], audit: new AuditModel(), isActive: true
    },
];

const accounts: AccountModel[] = [
    {
        _id: new ObjectId(), userName: 'warrenxxx1', password: '1234561', user: {birthDate: new Date(), firstName: 'warren1', lastName: 'aroni1', gender: 'masculino1'},
        email: 'warren_x_x1@gmail.com', enabled: true, roles: [
            'user',
        ], functions: [
            'mcrrea', 'mcrreo'
        ], audit: new AuditModel()
        /*'usrins', 'usrrea', 'usrreo', 'usrupd', 'usrrem', 'mcrrea', 'mcrreo'*/
    }, {
        _id: new ObjectId(), userName: 'warrenxxx2', password: '1234562', user: {birthDate: new Date(), firstName: 'warren2', lastName: 'aroni2', gender: 'masculino2'},
        email: 'warren_x_x2@gmail.com', enabled: true, roles: [
            'admin'
        ], functions: [], audit: new AuditModel()
        /*'usrins', 'usrrea', 'usrreo', 'usrupd', 'userrem','mcrins', 'mcrrea', 'mcrreo', 'mcrupd', 'mcrrrem','rolins', 'rolrea', 'rolreo', 'rolupd', 'rolrrem'*/
    }, {
        _id: new ObjectId(), userName: 'warrenxxx3', password: '1234563', user: {birthDate: new Date(), firstName: 'warren3', lastName: 'aroni3', gender: 'masculino3'},
        email: 'warren_x_x3@gmail.com', enabled: true, roles: [
            'user', 'editor'
        ], functions: [
            'rolupd'
        ], audit: new AuditModel()
        /*'usrins', 'usrrea', 'usrreo', 'usrupd', 'usrrem','mcrins', 'mcrrea', 'mcrreo', 'mcrupd', 'mcrrem','rolupd'*/
    }, {
        _id: new ObjectId(), userName: 'warrenxxx4', password: '1234564', user: {birthDate: new Date(), firstName: 'warren4', lastName: 'aroni4', gender: 'masculino4'},
        email: 'warren_x_x4@gmail.com', enabled: true, roles: [], functions: [
            'usrrea'
        ], audit: new AuditModel()
        /*'usrrea'*/
    }
];

const dao: AccountDao = new AccountDao();

describe('dao', () => {
    before(async () => {

        await MongoConfig.connect(config.mongoTest.url, config.mongoTest.db).then(e => {
            console.log('connect to database');
        }).then(j => MongoConfig.db.collection('functions').deleteMany({})
            .then(e => MongoConfig.db.collection('role').deleteMany({}))
            .then(e => MongoConfig.db.collection('role').insertMany(roles))
            .then(e => MongoConfig.db.collection('account').deleteMany({}))
            .then(e => MongoConfig.db.collection('account').insertMany(accounts))
            .then(e => MongoConfig.db.collection('functions').insertMany(functions))
        );
    });
    it('db count', () => {
        return MongoConfig.db.collection('role').find({}).toArray()
            .then(e => assert.equal(e.length, 3))
            .then(e => MongoConfig.db.collection('account').find({}).toArray())
            .then(e => assert.equal(e.length, 4))
            .then(e => MongoConfig.db.collection('functions').find({}).toArray())
            .then(e => assert.equal(e.length, 15));
    });
    it('find by userName', () => {
        return dao.findByUserName('warrenxxx1').then(e => assert.strictEqual(e.email, 'warren_x_x1@gmail.com'));
    });
    it('get all Functions', () => {
        return dao.getAllFunctions('warrenxxx1').then(e => e.map(value => value.cod).sort())
            .then(e => assert.deepStrictEqual(e, ['usrins', 'usrrea', 'usrreo', 'usrupd', 'usrrem', 'mcrrea', 'mcrreo'].sort(), 'warren 1'))
            .then(e => dao.getAllFunctions('warrenxxx2')).then(e => e.map(value => value.cod).sort())
            .then(e => assert.deepStrictEqual(e,
                ['usrins', 'usrrea', 'usrreo', 'usrupd', 'usrrem',
                    'mcrins', 'mcrrea', 'mcrreo', 'mcrupd', 'mcrrem',
                    'rolins', 'rolrea', 'rolreo', 'rolupd', 'rolrem'].sort(), 'warren 2'))
            .then(e => dao.getAllFunctions('warrenxxx3')).then(e => e.map(value => value.cod).sort()).then(e =>
                assert.deepStrictEqual(e,
                    ['usrins', 'usrrea', 'usrreo', 'usrupd', 'usrrem', 'mcrins', 'mcrrea', 'mcrreo', 'mcrupd', 'mcrrem', 'rolupd'].sort(), 'warren 3'))
            .then(e => dao.getAllFunctions('warrenxxx4')).then(e => e.map(value => value.cod).sort()).then(e =>
                assert.deepStrictEqual(e,
                    ['usrrea'].sort(), 'warren 4'))
            ;
    });
});
