import config from '../../enviroments.json';

import MongoConfig from '../../common/src/config/mongo.config';
import {zeedAccounts, zeedFunctions, zeedRoles} from '../../zeed.data';

MongoConfig.connect(config.mongo.url, config.mongo.db).then(e => {
    console.log('Connect to db', e);
})
    .then(e => MongoConfig.db.collection('function').deleteMany({}))
    .then(e => MongoConfig.db.collection('function').insertMany(zeedFunctions))
    .then(e => console.log('functions inizializados correctamente'))

    .then(e => MongoConfig.db.collection('role').deleteMany({}))
    .then(e => MongoConfig.db.collection('role').insertMany(zeedRoles))
    .then(e => console.log('roles inizializados correctamente'))

    .then(e => MongoConfig.db.collection('account').deleteMany({}))
    .then(e => MongoConfig.db.collection('account').insertMany(zeedAccounts))
    .then(e => console.log('accounts inizializados correctamente'))
;

