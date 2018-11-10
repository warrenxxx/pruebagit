import {AppError} from '../errorHandling/AppError';

export class AppResponse {
    private data: any;
    private error: AppError;

    public constructor(data: any, error: AppError) {
        this.data = data;
        this.error = error;
    }

    public static ok(): AppResponse {
        return new AppResponse('ok', null);
    }

    public static okObject(o: any): AppResponse {
        return new AppResponse(o, null);
    }

    public static okCount(count: Number): AppResponse {
        return new AppResponse({
            message: 'ok',
            numInserted: count
        }, null);
    }

    public static errorResponse(err: AppError): AppResponse {
        if (err instanceof AppError)
            return new AppResponse(null, err);
        else
            return new AppResponse(null, err);
    }
}