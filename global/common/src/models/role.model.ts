import {AuditModel} from './audit.model';
import {ObjectId} from 'bson';


export interface RoleModel {
    _id: ObjectId;
    name: string;
    description: string;
    functions: string[];
    prohibitsMethods: string[];
    isActive: boolean;
    audit: AuditModel;
}

