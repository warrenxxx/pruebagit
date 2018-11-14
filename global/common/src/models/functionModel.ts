import {AuditModel} from './audit.model';

export interface FunctionModel {
    _id: {
        method: string,
        path: string,
    };
    name: string;
    cod: string;
    description: string;
}
