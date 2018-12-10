import {isNumber, isString} from '../../../common/src/utils/Validation';
import {ObjectId} from 'bson';
import {ProductModel} from '../../../common/src/models/product.model';

export interface Dto extends ProductModel {
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
}

export const DtoRules: any = {
    codigo: (x: any) => isString(x, 5, 10),
    categoria: (x: any) => isString(x),
    marca: (x: any) => isString(x),
    descripcion: (x: any) => isString(x),
    medida: {
        cantidad: (x: any) => isNumber(x),
        tipo: (x: any) => isString(x)
    },
    stock: {
        total: (x: any) => isNumber(x),
        min: (x: any) => isNumber(x),
        max: (x: any) => isNumber(x)
    },
    costo: (x: any) => isNumber(x),
    precio: (x: any) => isNumber(x),
    tags: [(x: any) => isString(x)],
};

export function dtoToModel(x: Dto, id = new ObjectId()): ProductModel {
    const tmp: ProductModel = <ProductModel>x;
    tmp._id = id;
    return tmp;
}
