import {Types} from 'mongoose';
import {ObjectId} from 'bson';
import {isString} from '../../../common/src/utils/Validation';

export const AccountInsertDtoRules: any = {
    userName: (x: any) => isString(x),
    password: (x: any) => isString(x),
    email: (x: any) => isString(x),
    firstName: (x: any) => isString(x),
    lastName: (x: any) => isString(x),
    birthDate: (x: any) => isString(x),
    gender: (x: any) => isString(x),
    roles: (x: any) => isString(x),
    functions: (x: any) => isString(x),
    enabled: (x: any) => isString(x)
};

export interface AccountInsertDto {
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
