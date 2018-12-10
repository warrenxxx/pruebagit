import {MongoClient, Db} from 'mongodb';
import config from '../../../enviroments.json';
import {ObjectNotFoundError} from '../errorHandling/Exceptions/objectNotFound.error';


export class MongoConfig {

    constructor() {
    }

    // public static db: Db;
    public static dbs: any = {};

    public static async connect(url: string, databaseName: string): Promise<string> {
        try {
            const client = await MongoClient.connect(url, {useNewUrlParser: true});
            // MongoConfig.db = client.db(databaseName);
            return url + ' - ' + databaseName;
        } catch (e) {
            throw  e;
        }
    }

    public static async connectMultitenant(url: string): Promise<Db> {
        const client = await MongoClient.connect(url, {useNewUrlParser: true});
        MongoConfig.dbs[client.db().databaseName] = client.db();
        return client.db();
    }

    public static getDbMultitenant(db: string): Db {
        if (db && this.dbs[db])
            return this.dbs[db];
        throw ObjectNotFoundError.UserNotFoundException('');
    }
}

MongoConfig.connectMultitenant(config.mongo.c0)
    .then(e => console.log('connect c0'))
    .then(e => MongoConfig.connectMultitenant(config.mongo.c1))
    .then(e => console.log('connect c1'))
    .then(e => MongoConfig.connectMultitenant(config.mongo.c2))
    .then(e => console.log('connect c2'))
    .then(e => MongoConfig.connectMultitenant(config.mongo.c3))
    .then(e => console.log('connect c3'))
    .then(e => MongoConfig.connectMultitenant(config.mongo.c4))
    .then(e => console.log('connect c4'))
    .then(e => MongoConfig.connectMultitenant(config.mongo.c5))
    .then(e => console.log('connect c5'))
    .then(e => MongoConfig.connectMultitenant(config.mongo.c6))
    .then(e => console.log('connect c6'))
    .then(e => MongoConfig.connectMultitenant(config.mongo.common))
    .then(e => console.log('connect common'))
;

export default MongoConfig;

