import {ObjectId} from 'bson';
import {isBoolean, isObjectId, isString} from '../../../common/src/utils/Validation';
import {AccountModel} from '../../../common/src/models/accountModel';
import {AuditModel} from '../../../common/src/models/audit.model';
import {RoleModel} from '../../../common/src/models/role.model';

export interface RoleUpdateDto {
    _id: ObjectId;
    name: string;
    description: string;
    functions: string[];
    isActive: boolean;
}

export const RoleUpdateDtoRules: any = {
    _id: (x: any) => isObjectId(x),
    name: (x: any) => isString(x),
    description: (x: any) => isString(x),
    functions: [(x: any) => isString(x)],
    isActive: (x: any) => isBoolean(x)
};


export function updateToRole(x: RoleUpdateDto): RoleModel {
    return {
        _id: x._id,
        name: x.name,
        isActive: x.isActive,
        description: x.description,
        functions: x.functions,
        audit: new AuditModel()
    };
}
