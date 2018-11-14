import config from '../../enviroments.json';
import zeedData from '../../zeed.data.json';

import MongoConfig from '../../common/src/config/mongo.config';

MongoConfig.connect(config.mongo.url, config.mongo.db).then(e => {
    console.log('Connect to db', e);
})
    .then(e => MongoConfig.db.collection('functions').deleteMany({}))
    .then(e => MongoConfig.db.collection('functions').insertMany(zeedData.functions))
    .then(e => console.log('datos inizializados correctamente'));
