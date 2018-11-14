import {isString, isStringRegex} from '../../../common/src/utils/Validation';
import {AccountModel, UserModel} from '../../../common/src/models/accountModel';
import {ObjectId} from 'bson';
import {AuditModel} from '../../../common/src/models/audit.model';

export interface AccountInsertDto {
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    functions: string[];
    roles: string[];
}

export const AccountInsertDtoRules: any = {
    userName: (x: any) => isString(x),
    password: (x: any) => isString(x),
    email: (x: any) => isString(x),
    firstName: (x: any) => isString(x),
    lastName: (x: any) => isString(x),
    birthDate: (x: any) => isString(x),
    gender: (x: any) => isString(x),
    functions: [(x: any) => isString(x)],
    roles: [(x: any) => isString(x)]
};

export function insertToAccount(x: AccountInsertDto): AccountModel {
    return {
        _id: new ObjectId(),
        userName: x.userName,
        password: x.password,
        email: x.email,
        roles: x.roles,
        functions: x.functions,
        enabled: true,
        user: {
            birthDate: x.birthDate,
            firstName: x.firstName,
            gender: x.gender,
            lastName: x.lastName
        },
        audit: new AuditModel()
    };
}
