import {isBoolean, isString} from '../../../common/src/utils/Validation';
import {AccountModel} from '../../../common/src/models/accountModel';
import {ObjectId} from 'bson';
import {AuditModel} from '../../../common/src/models/audit.model';

export interface AccountDto {
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    functions: { id: string, methods: ('c' | 'ro' | 'ra' | 'u' | 'd')[] }[];
    roles: string[];
    enabled: boolean;
}

export const AccountDtoRules: any = {
    userName: (x: any) => isString(x),
    password: (x: any) => isString(x),
    email: (x: any) => isString(x),
    firstName: (x: any) => isString(x),
    lastName: (x: any) => isString(x),
    birthDate: (x: any) => isString(x),
    gender: (x: any) => isString(x),
    functions: [(x: any) => isString(x)],
    roles: [(x: any) => isString(x)],
    enabled: (x: any) => isBoolean(x)
};

export function dtoToAccount(x: AccountDto, id: ObjectId = new ObjectId()): AccountModel {
    return {
        _id: id,
        userName: {id: x.userName, serverResource: 'local'},
        password: x.password,
        email: x.email,
        roles: x.roles,
        functions: x.functions,
        enabled: x.enabled,
        user: {
            birthDate: x.birthDate,
            firstName: x.firstName,
            gender: x.gender,
            lastName: x.lastName
        },
        audit: new AuditModel()
    };
}
