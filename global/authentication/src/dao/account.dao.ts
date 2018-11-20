import {BaseMongoImpDao} from '../../../common/src/repository/baseMongoImp.dao';
import {AccountModel} from '../../../common/src/models/accountModel';
import MongoConfig from '../../../common/src/config/mongo.config';
import {FunctionModel, FunctionModelBasic} from '../../../common/src/models/functionModel';

export class AccountDao extends BaseMongoImpDao<AccountModel> {
    constructor() {
        super('account');
    }

    findByUserNameAndServerResource(userName: { id: string, serverResource: string }): Promise<AccountModel> {

        return MongoConfig.db
            .collection(this.collection)
            .findOne({'userName': userName});
    }

    getAllFunctions(userName: { id: string, serverResource: string }): Promise<FunctionModelBasic[]> {
        return MongoConfig.db
            .collection(this.collection)
            .aggregate([
                {$match: {userName: userName}},
                {$unwind: {path: '$functions', preserveNullAndEmptyArrays: true}},
                {$lookup: {from: 'function', as: 'functions2', localField: 'functions.id', foreignField: '_id'}},
                {$unwind: {path: '$functions2', preserveNullAndEmptyArrays: true}},
                {
                    $project: {
                        roles: 1,
                        'f.n': '$functions.id',
                        'f.m': {$setIntersection: ['$functions.methods', '$functions2.methods']}
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        roles: {$first: '$roles'},
                        func: {$push: '$f'}
                    }
                },
                {$lookup: {from: 'role', as: 'roles', localField: 'roles', foreignField: 'name'}}
                , {$unwind: {path: '$roles', preserveNullAndEmptyArrays: true}}
                , {$unwind: {path: '$roles.functions', preserveNullAndEmptyArrays: true}}

                , {
                    $project: {
                        _id: 1,
                        func: 1,
                        f: '$roles.functions.id',
                        n: '$roles.functions.methodsNegates'
                    }
                }
                , {
                    $lookup: {
                        from: 'function',
                        as: 'f',
                        localField: 'f',
                        foreignField: '_id'
                    }
                }
                , {$unwind: {path: '$f', preserveNullAndEmptyArrays: true}}

                , {
                    $project: {
                        func: 1,
                        'func2.n': '$f._id',
                        'func2.m': {$setDifference: ['$f.methods', '$n']}
                    }
                }
                , {
                    $group: {
                        _id: '$_id',
                        func: {$first: '$func'},
                        func2: {$push: '$func2'}
                    }
                }
                , {
                    $project: {
                        f: {$concatArrays: ['$func', '$func2']}
                    },
                }

                , {$unwind: '$f'}
                , {$unwind: '$f.m'}
                , {
                    $group: {
                        _id: '$f.n',
                        methods: {$addToSet: '$f.m'}
                    }
                }

            ]).toArray();
    }
}
