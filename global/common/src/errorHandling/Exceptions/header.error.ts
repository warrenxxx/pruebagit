import {AppError, ErrorJson} from '../app.error';
import error from '../Errors.json';

export class HeaderError extends AppError {

    private constructor(message: string, code: Number, userName: string) {
        super(HeaderError['name'], message, [], code, '', userName);
    }

    public static AuthorizationHeaderError(errors: string): AppError {
        const x: ErrorJson = error.HeaderError;
        return new HeaderError(x.message.replace('$1', errors), x.code, '');
    }

}

