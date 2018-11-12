import {MongoClient, Db} from 'mongodb';

export class MongoConfig {

    constructor() {
    }

    public static db: Db;

    public static async connect(url: string, databaseName: string): Promise<string> {
        try {
            const client = await MongoClient.connect(url, {useNewUrlParser: true});
            MongoConfig.db = client.db(databaseName);
            return url + ' - ' + databaseName;
        } catch (e) {
            throw  e;
        }
    }


}

export default MongoConfig;
