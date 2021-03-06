import {AppError, ErrorJson} from '../app.error';
import error from '../Errors.json';

export class AuthorizationError extends AppError {

    private constructor(message: string, code: Number, userName: string) {
        super(AuthorizationError['name'], message, [], code, '', userName);
    }

    public static NoHasError(errors: string): AppError {
        const x: ErrorJson = error.AuthorizationError;
        return new AuthorizationError(x.message.replace('$1', errors), x.code, '');
    }

}

