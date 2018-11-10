import {Audit} from './Audit';
import {ObjectId} from 'bson';
import {FunctionRule} from './Role';

export interface Account {
    _id: ObjectId;
    userName: string;
    password: string;
    email: string;
    roles: string[];
    functions: FunctionRule[];
    enabled: boolean;
    user: User;
    audit: Audit;
}

export interface User {
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
}



