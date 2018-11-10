import {AppError, ErrorJson} from '../AppError';
import error from '../Errors.json';

export class AuthenticationException extends AppError {

    private constructor(message: string, code: Number, userName: string) {
        super(AuthenticationException['name'], message, [], code, '', userName);
    }

    public static LoginException(userName: string): AppError {
        // @ts-ignore
        const x: ErrorJson = error.LoginException;
        return new AuthenticationException(x.message, x.code, userName);
    }
}

