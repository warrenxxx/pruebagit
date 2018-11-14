import {AppError, ErrorJson} from '../app.error';
import error from '../Errors.json';

export class ObjectNullError extends AppError {

    private constructor(message: string, code: Number, userName: string) {
        super(ObjectNullError['name'], message, [], code, '', userName);
    }

    public static ValidateRequestException(errors: string): AppError {
        const x: ErrorJson = error.ValidateRequestError;
        return new ObjectNullError(x.message + ' ' + errors, x.code, '');
    }

}

