import {isString, isStringRegex} from '../../../common/src/utils/Validation';

export const LoginDtoRules: any = {
    user: (x: any) => isStringRegex(x, /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
    password: (x: any) => isString(x)
};

export interface LoginDto {
    user: string;
    password: string;
}
