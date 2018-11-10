import {Audit} from './Audit';
import {ObjectId} from 'bson';


export interface Role {
    _id: ObjectId;
    name: string;
    description: string;
    functions: string[];
    isActive: boolean;
    audit: Audit;
}

export interface FunctionRule {
    _id: {
        method: string,
        path: string,
    };
    name: string;
    cod: string;
    description: string;
    audit: Audit;
}
