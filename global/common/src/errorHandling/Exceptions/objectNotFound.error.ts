import {AppError, ErrorJson} from '../app.error';
import error from '../Errors.json';

export class ObjectNotFoundError extends AppError {

    public constructor(message: string = 'El Objeto no Existe', code: Number = 70000, userName: string = '') {
        super(ObjectNotFoundError['name'], message, [], code, '', userName);
    }

    public static UserNotFoundException(userName: string): AppError {
        const x: ErrorJson = error.UserNotFoundError;
        return new ObjectNotFoundError(x.message.replace('$name', userName), x.code, userName);
    }
}

