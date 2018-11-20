import {AppError, ErrorJson} from '../app.error';
import error from '../Errors.json';

export class SystemError extends AppError {

    private constructor(message: string, code: Number, userName: string) {
        super(SystemError['name'], message, [], code, '', userName);
    }

    public static MessageError(messag: string): AppError {
        const x: ErrorJson = error.SystemError;
        return new SystemError(x.message + ' ' + messag, x.code, '');
    }

}

