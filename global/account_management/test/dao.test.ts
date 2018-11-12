import 'mocha';
import * as assert from 'assert';
import MongoConfig from '../../common/src/config/mongo.config';
import config from '../../enviroments.json';
import {FunctionRule, RoleModel} from '../../common/src/models/role.model';
import {AuditModel} from '../../common/src/models/audit.model';
import {ObjectId} from 'bson';
import {AccountModel} from '../../common/src/models/account.model';
import {AccountDao} from '../src/dao/account.dao';

const functions: FunctionRule[] = [
    {_id: {method: 'post', path: '/user'}, cod: 'usrins', description: 'inserta un usuario', name: 'insert user', audit: new AuditModel()},
    {_id: {method: 'get', path: '/user'}, cod: 'usrreo', description: 'obtiene un usuario', name: 'read user', audit: new AuditModel()},
    {_id: {method: 'get', path: '/user/all'}, cod: 'usrrea', description: 'obtiene todos los usuario', name: 'read all users', audit: new AuditModel()},
    {_id: {method: 'update', path: '/user   '}, cod: 'usrupd', description: 'actualiza un usuario', name: 'update user', audit: new AuditModel()},
    {_id: {method: 'remove', path: '/user'}, cod: 'usrrem', description: 'elimina un usuario', name: 'remove user', audit: new AuditModel()},

    {_id: {method: 'post', path: '/role'}, cod: 'rolins', description: 'inserta un rol', name: 'insert role', audit: new AuditModel()},
    {_id: {method: 'get', path: '/role'}, cod: 'rolreo', description: 'obtiene un rol', name: 'read role', audit: new AuditModel()},
    {_id: {method: 'get', path: '/role/all'}, cod: 'rolrea', description: 'obtiene todos los roles', name: 'read all roles', audit: new AuditModel()},
    {_id: {method: 'update', path: '/role'}, cod: 'rolupd', description: 'actualiza un rol', name: 'update role', audit: new AuditModel()},
    {_id: {method: 'remove', path: '/role'}, cod: 'rolrem', description: 'elimina un rol', name: 'remove role', audit: new AuditModel()},

    {_id: {method: 'post', path: '/microlesson'}, cod: 'mcrins', description: 'inserta un microleccion', name: 'insert microlesson', audit: new AuditModel()},
    {_id: {method: 'get', path: '/microlesson'}, cod: 'mcrreo', description: 'obtiene un microleccion', name: 'read microlesson', audit: new AuditModel()},
    {_id: {method: 'get', path: '/microlesson/all'}, cod: 'mcrrea', description: 'obtiene todos los microleccion', name: 'read all microlessons', audit: new AuditModel()},
    {_id: {method: 'update', path: '/microlesson'}, cod: 'mcrupd', description: 'actualiza un microleccion', name: 'update microlesson', audit: new AuditModel()},
    {_id: {method: 'remove', path: '/microlesson'}, cod: 'mcrrem', description: 'elimina un microleccion', name: 'remove microlesson', audit: new AuditModel()},

];

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
                    [
                        'usrins', 'usrrea', 'usrreo', 'usrupd', 'usrrem', 'mcrins', 'mcrrea', 'mcrreo', 'mcrupd', 'mcrrem', 'rolins', 'rolrea', 'rolreo', 'rolupd', 'rolrem'].sort(), 'warren 2'))
            .then(e => dao.getAllFunctions('warrenxxx3')).then(e => e.map(value => value.cod).sort()).then(e =>
                assert.deepStrictEqual(e,
                    ['usrins', 'usrrea', 'usrreo', 'usrupd', 'usrrem', 'mcrins', 'mcrrea', 'mcrreo', 'mcrupd', 'mcrrem', 'rolupd'].sort(), 'warren 3'))
            .then(e => dao.getAllFunctions('warrenxxx4')).then(e => e.map(value => value.cod).sort()).then(e =>
                assert.deepStrictEqual(e,
                    ['usrrea'].sort(), 'warren 4'))
            ;
    });
});
