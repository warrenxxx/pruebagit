import {AppError, ErrorJson} from '../app.error';
import error from '../Errors.json';

export class ObjectNotFoundError extends AppError {

    private constructor(message: string, code: Number, userName: string) {
        super(ObjectNotFoundError['name'], message, [], code, '', userName);
    }

    public static UserNotFoundException(userName: string): AppError {
        // @ts-ignore
        const x: ErrorJson = error.UserNotFoundException;
        return new ObjectNotFoundError(x.message.replace('$name', userName), x.code, userName);
    }
}

