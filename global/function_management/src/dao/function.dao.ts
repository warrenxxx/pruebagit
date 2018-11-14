import {BaseMongoImpDao} from '../../../common/src/repository/baseMongoImp.dao';
import {AccountModel} from '../../../common/src/models/accountModel';
import {FunctionModel} from '../../../common/src/models/functionModel';

export class FunctionDao extends BaseMongoImpDao<FunctionModel> {
    constructor() {
        super('functions');
    }
}
