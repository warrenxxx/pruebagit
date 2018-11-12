import validate from 'validate.js';
import {ValidationError} from '../errorHandling/Exceptions/validation.error';
import moment = require('moment');

export async function Validate(x: any, constraint: any): Promise<any> {
    return isValid(x, constraint);
}


export function isString(inp: any): null | any {
    return validate.isString(inp) ? inp : null;
}

export function isStringRegex(inp: any, pattern: RegExp): null | any {
    return validate.isString(inp) && pattern.test(inp) ? inp : null;
}

export function isNumber(inp: any): null | any {
    return validate.isNumber(inp) ? inp : null;
}

export function isBoolean(inp: any): null | any {
    return validate.isBoolean(inp) ? inp : null;
}

export function isDate(inp: any): null | any {
    const date = moment(inp, 'DD-MM-YYYY', true);
    return date.isValid() ? date.toDate() : null;
}

export function isDateTime(inp: any): null | any {
    const date = moment(inp, 'DD-MM-YYYY HH:mm:ss', true);
    return date.isValid() ? date.toDate() : null;
}


// const wx: Date = moment().toDate();
//
//
// console.log(validate.isDate('01-01-01'));

// const rule2 = {
//     nombre: (x) => validate.isString(x) ? x : null,
//     edad: (x) => validate.isNumber(x) ? x : null
// };
// const rule = {
//     nombre: (x) => x === 'warren' ? x : null,
//     numero: x => validate.isNumber(x) ? x : null,
//     telefonos: [x => isNumber(x) ? x : null],
//     mascota: rule2,
//     friends: [{name: (x) => x === 'amigo', fono: x => x === '456'}]
// };
//
// const amigo = {
//     nombre: 'warren',
//     numero: 5,
//     telefonos: [4, 34],
//     mascota: {
//         nombre: 'x',
//         edad: 5
//     },
//     friends: [
//         {name: 'amigo', fono: '456'},
//         {name: 'amigo', fono: '456'},
//         {name: 'amigo', fono: '456'}
//     ]
// };

export function isValid(object: any, rules: any): any {
    const res: any = {};
    for (const param in rules) {
        if (validate.isArray(rules[param])) {
            if (validate.isArray(object[param])) {
                const tmp = [];
                if (validate.isFunction(rules[param][0]))
                    for (const paramItem of object[param]) {
                        const r = rules[param][0](paramItem);
                        if (r) tmp.push(r);
                        else throw ValidationError.ValidateObjectException(param);
                    }
                else
                    for (const paramItem of object[param])
                        tmp.push(isValid(paramItem, rules[param][0]));
                res[param] = tmp;
            }
            else throw ValidationError.ValidateObjectException(param);
        }
        else if (validate.isFunction(rules[param])) {
            const r = rules[param](object[param]);
            if (r) res[param] = r;
            else throw ValidationError.ValidateObjectException(param);
        } else {
            res[param] = isValid(object[param], rules[param]);
        }
    }
    return res;
}

// const x = isValid(amigo, rule);
// console.log(x);
