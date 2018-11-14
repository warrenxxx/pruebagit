import {ObjectId} from 'bson';
import MongoConfig from '../config/mongo.config';

export function hasFuntions(_id: string, path: string, method: string): Promise<any> {
    console.log(_id, path, method);
    return MongoConfig.db.collection('account').aggregate([

        {$match: {_id: new ObjectId(_id)}},
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
            $match: {
                _id: {
                    'method': method,
                    'path': path
                }
            }
        }
    ]).hasNext();
}
