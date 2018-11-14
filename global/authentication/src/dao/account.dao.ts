import {BaseMongoImpDao} from '../../../common/src/repository/baseMongoImp.dao';
import {AccountModel} from '../../../common/src/models/accountModel';
import MongoConfig from '../../../common/src/config/mongo.config';
import {FunctionModel} from '../../../common/src/models/functionModel';

export class AccountDao extends BaseMongoImpDao<AccountModel> {
    constructor() {
        super('account');
    }

    findByUserName(x: string): Promise<AccountModel> {
        return MongoConfig.db
            .collection(this.collection)
            .findOne({'userName': x});
    }

    getAllFunctions(userName: string): Promise<FunctionModel[]> {
        return MongoConfig.db
            .collection(this.collection)
            .aggregate([
                {$match: {userName: userName}},
                {$lookup: {from: 'role', as: 'roles', foreignField: 'name', localField: 'roles'}},
                {$project: {functions: 1, ro: '$roles.functions'}},
                {
                    $project: {
                        fu: {
                            $reduce: {
                                input: '$ro',
                                initialValue: '$functions',
                                in: {$concatArrays: ['$$value', '$$this']}
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'functions',
                        as: 'fu',
                        foreignField: 'cod',
                        localField: 'fu'
                    }
                },
                {$unwind: '$fu'},
                {$replaceRoot: {newRoot: '$fu'}},
                {
                    $project: {
                        _id: 0,
                        path: '$_id.path',
                        method: '$_id.method',
                        cod: 1,
                        name: 1
                    }
                }

            ]).toArray();
    }
}
