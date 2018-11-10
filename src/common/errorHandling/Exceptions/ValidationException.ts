import {AppError, ErrorJson} from '../AppError';
import error from '../Errors.json';

export class ValidationException extends AppError {

    private constructor(message: string, code: Number, userName: string) {
        super(ValidationException['name'], message, [], code, '', userName);
    }

    public static ValidateRequestException(userName: string): AppError {
        // @ts-ignore
        const x: ErrorJson = error.ValidateRequestException;
        return new ValidationException(x.message, x.code, userName);
    }
}

