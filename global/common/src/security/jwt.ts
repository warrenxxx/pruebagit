import {Request, Response} from 'express';
import {HeaderError} from '../errorHandling/Exceptions/header.error';
import {AppResponse} from '../utils/AppResponse';
import {sign, verify} from 'jsonwebtoken';
import {AuthenticationError} from '../errorHandling/Exceptions/authentication.error';
import {AuthorizationError} from '../errorHandling/Exceptions/authorization.error';
import {AccountModel} from '../models/accountModel';
import config from '../../../enviroments.json';
import {FunctionModelBasic} from '../models/functionModel';

export interface Req extends Request {
    _id?: string;
    userName?: { id: string, serverResource: string };
}


export function fromJwt(req: Req, res: Response, next: Function): any {

    const auth: string = req.header('Authorization'),
        method: string = req.method,
        entity: string = req.baseUrl,
        path: string = req.route.path;


    if (auth) {
        try {
            const usr: any = verify(auth, config.privateKey);

            if (entity === '/authentication' && path === '/refresh_token') {
                req._id = usr.id;
                req.userName = usr.userName;
                return next();
            }
            const jwtFunctions: FunctionModelBasic[] = <FunctionModelBasic[]> usr.functions;
            for (const e of jwtFunctions) {
                if ('/' + e._id === entity) {
                    if (method === 'GET' && path === '/' && e.methods.indexOf('ra') !== -1) {
                        req._id = usr.id;
                        req.userName = usr.userName;
                        return next();
                    }
                    if (method === 'GET' && path === '/:id' && e.methods.indexOf('ro') !== -1) {
                        req._id = usr.id;
                        req.userName = usr.userName;
                        return next();
                    }
                    if (method === 'POST' && path === '/' && e.methods.indexOf('c') !== -1) {
                        req._id = usr.id;
                        req.userName = usr.userName;
                        return next();
                    }
                    if (method === 'PUT' && path === '/:id' && e.methods.indexOf('u') !== -1) {
                        req._id = usr.id;
                        req.userName = usr.userName;
                        return next();
                    }
                    if (method === 'DELETE' && path === '/:id' && e.methods.indexOf('d') !== -1) {
                        req._id = usr.id;
                        req.userName = usr.userName;
                        return next();
                    }
                    return res.status(400).send(AppResponse.errorResponse(AuthorizationError.NoHasError(req.originalUrl + ' ' + req.method)));
                }
            }
            return res.status(400).send(AppResponse.errorResponse(AuthorizationError.NoHasError(req.originalUrl + ' ' + req.method)));
        } catch (e) {

            if (e.message !== 'jwt expired') return res.status(400).send(AppResponse.errorResponse(e));
            else return res.status(400).send(AppResponse.errorResponse(AuthenticationError.TokenExpiration()));
        }
    }
    else return res.status(400).send(AppResponse.errorResponse(HeaderError.AuthorizationHeaderError('Authorization')));
}

export async function tojwt(account: AccountModel, functions: any): Promise<string> {
    const user = {
        id: account._id,
        userName: account.userName,
        functions: functions
    };
    let res;
    try {
        res = await sign(user, config.privateKey, {expiresIn: '40000s'});
    } catch (e) {
        throw  e;
    }
    return res;
}
