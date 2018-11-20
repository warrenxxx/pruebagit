import {BaseMongoImpDao} from '../../../common/src/repository/baseMongoImp.dao';
import {AccountModel} from '../../../common/src/models/accountModel';
import {FunctionModel} from '../../../common/src/models/functionModel';
import MongoConfig from '../../../common/src/config/mongo.config';
import {ObjectId} from 'bson';

export class FunctionDao extends BaseMongoImpDao<FunctionModel> {
    constructor() {
        super('function');
    }

}
