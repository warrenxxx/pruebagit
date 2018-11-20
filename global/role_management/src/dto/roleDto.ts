import {isBoolean, isString} from '../../../common/src/utils/Validation';
import {ObjectId} from 'bson';
import {AuditModel} from '../../../common/src/models/audit.model';
import {RoleModel} from '../../../common/src/models/role.model';

export interface RoleDto {
    name: string;
    description: string;
    functions: { id: string, methodsNegates: ('c' | 'ro' | 'ra' | 'u' | 'd')[] }[];
    isActive: boolean;
}

export const RoleDtoRules: any = {
    name: (x: any) => isString(x),
    description: (x: any) => isString(x),
    functions: [(x: any) => isString(x)],
    isActive: (x: any) => isBoolean(x),
};

export function dtoToRole(x: RoleDto): RoleModel {
    return {
        _id: new ObjectId(),
        name: x.name,
        isActive: x.isActive,
        description: x.description,
        functions: x.functions,
        audit: new AuditModel()
    };
}
