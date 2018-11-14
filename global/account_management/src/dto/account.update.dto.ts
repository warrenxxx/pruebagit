import {ObjectId} from 'bson';
import {isBoolean, isObjectId, isString} from '../../../common/src/utils/Validation';
import {AccountModel} from '../../../common/src/models/accountModel';
import {AuditModel} from '../../../common/src/models/audit.model';

export const AccountUpdateDtoRules: any = {
    _id: (x: any) => isObjectId(x),
    userName: (x: any) => isString(x),
    password: (x: any) => isString(x),
    email: (x: any) => isString(x),
    firstName: (x: any) => isString(x),
    lastName: (x: any) => isString(x),
    birthDate: (x: any) => isString(x),
    gender: (x: any) => isString(x),
    roles: [(x: any) => isString(x)],
    functions: [(x: any) => isString(x)],
    enabled: (x: any) => isBoolean(x)
};

export interface AccountUpdateDto {
    _id: ObjectId;
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;

    roles: string[];
    functions: string[];

    enabled: boolean;
}

export function updateToAccount(x: AccountUpdateDto): AccountModel {
    return {
        _id: x._id,
        userName: x.userName,
        password: x.password,
        email: x.email,
        roles: ['user'],
        functions: [],
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