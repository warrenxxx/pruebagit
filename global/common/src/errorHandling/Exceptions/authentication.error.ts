import {AppError, ErrorJson} from '../app.error';
import error from '../Errors.json';

export class AuthenticationError extends AppError {

    private constructor(message: string, code: Number, userName: string) {
        super(AuthenticationError['name'], message, [], code, '', userName);
    }

    public static LoginError(userName: string): AppError {
        const x: ErrorJson = error.LoginError;
        return new AuthenticationError(x.message, x.code, userName);
    }

    public static TokenExpiration(): AppError {
        const x: ErrorJson = error.TokenExpirationError;
        return new AuthenticationError(x.message, x.code, '');
    }

}

