import {MongoClient, Db} from 'mongodb';

export class MongoConfig {

    constructor() {
    }

    public static db: Db;

    public static async connect(url: string, databaseName: string): Promise<void> {
        try {
            const client: any = await MongoClient.connect(url);
            MongoConfig.db = client.db(databaseName);
        } catch (e) {
            console.log(e.stack);
        }
    }


}

export default MongoConfig;
