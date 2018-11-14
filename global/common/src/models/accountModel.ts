import {AuditModel} from './audit.model';
import {ObjectId} from 'bson';
import {FunctionModel} from './functionModel';

export interface AccountModel {
    _id: ObjectId;
    userName: string;
    password: string;
    email: string;
    roles: string[];
    functions: string[];
    enabled: boolean;
    user: UserModel;
    audit: AuditModel;
}

export interface UserModel {
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
}


