import {AppError, ErrorJson} from '../AppError';
import error from '../Errors.json';

export class ObjectNotFoundException extends AppError {

    private constructor(message: string, code: Number, userName: string) {
        super(ObjectNotFoundException['name'], message, [], code, '', userName);
    }

    public static UserNotFoundException(userName: string): AppError {
        // @ts-ignore
        const x: ErrorJson = error.UserNotFoundException;
        return new ObjectNotFoundException(x.message.replace('$name', userName), x.code, userName);
    }
}

