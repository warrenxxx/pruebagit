import {AppError, ErrorJson} from '../app.error';
import error from '../Errors.json';

export class ValidationError extends AppError {

    private constructor(message: string, code: Number, userName: string) {
        super(ValidationError['name'], message, [], code, '', userName);
    }

    public static ValidateRequestException(errors: string): AppError {
        // @ts-ignore
        const x: ErrorJson = error.ValidateRequestError;
        return new ValidationError(x.message + ' ' + errors, x.code, '');
    }
    public static ValidateObjectException(errors: string): AppError {
        // @ts-ignore
        const x: ErrorJson = error.ValidateRequestError;
        return new ValidationError(x.message + ' ' + errors, x.code, '');
    }
}

