import {AuditModel} from './audit.model';
import {ObjectId} from 'bson';


export interface RoleModel {
    _id: ObjectId;
    name: string;
    description: string;
    functions: { id: string, methodsNegates: ('c' | 'ro' | 'ra' | 'u' | 'd')[] }[];
    isActive: boolean;
    audit: AuditModel;
}

