import {ObjectId} from 'bson';
import {AuditModel} from './audit.model';

export interface ProductModel {
    _id: ObjectId;
    codigo: string;
    categoria: string;
    marca: string;
    descripcion: string;
    medida: { cantidad: number, tipo: string };
    stock: {
        total: number;
        min: number;
        max: number
    };
    costo: number;
    precio: number;
    tags: string[];
    audit: AuditModel;
}
