import {Response} from 'express';
import {Req} from '../security/jwt';
import MongoConfig from '../config/mongo.config';
import {AccountModel} from '../models/accountModel';

export function chooseDatabase(req: Req, res: Response, next: Function): void {
    // MongoConfig.db.collection('account').findOne({_id: req._id})
    //     .then(e => {
    //         const db = (<AccountModel>e).db;
    //         next();
    //     });
}
