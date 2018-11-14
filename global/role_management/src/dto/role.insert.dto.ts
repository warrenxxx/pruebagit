import {isBoolean, isString, isStringRegex} from '../../../common/src/utils/Validation';
import {AccountModel, UserModel} from '../../../common/src/models/accountModel';
import {ObjectId} from 'bson';
import {AuditModel} from '../../../common/src/models/audit.model';
import {RoleModel} from '../../../common/src/models/role.model';

export interface RoleInsertDto {
    name: string;
    description: string;
    functions: string[];
    isActive: boolean;
}

export const RoleInsertDtoRules: any = {
    name: (x: any) => isString(x),
    description: (x: any) => isString(x),
    functions: [(x: any) => isString(x)],
    isActive: (x: any) => isBoolean(x),
};

export function insertToRole(x: RoleInsertDto): RoleModel {
    return {
        _id: new ObjectId(),
        name: x.name,
        isActive: x.isActive,
        description: x.description,
        functions: x.functions,
        audit: new AuditModel()
    };
}
