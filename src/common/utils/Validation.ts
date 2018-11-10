import validate from 'validate.js';
import {flatMap} from 'tslint/lib/utils';
import {ValidationException} from '../errorHandling/Exceptions/ValidationException';


export async function Validate(x: any, constraint: any): Promise<any> {
    try {
        x = validate.cleanAttributes(x, constraint);
        const res = validate(x, constraint, {format: 'flat'});

        if (res === undefined) {
            return x;
        } else {
            throw ValidationException.ValidateRequestException('');
        }
    } catch (e) {
        throw e;
    }
}

