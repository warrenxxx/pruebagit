import {isString} from '../../../common/src/utils/Validation';

export interface RegisterDto {
    userName: string;
    password: string;
    email: string;

    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
}

export const RegisterDtoRules: any = {
    userName: (x: any) => isString(x),
    password: (x: any) => isString(x),
    email: (x: any) => isString(x),
    firstName: (x: any) => isString(x),
    lastName: (x: any) => isString(x),
    birthDate: (x: any) => isString(x),
    gender: (x: any) => isString(x)
};

