import {AuditModel} from './audit.model';
import {ObjectId} from 'bson';

export interface AccountModel {
    _id: ObjectId;
    userName: { id: string, serverResource: string };
    password: string;
    email: string;
    roles: string[];
    functions: { id: string, methods: ('c' | 'ro' | 'ra' | 'u' | 'd')[] }[];
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



