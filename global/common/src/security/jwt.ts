import {Request, Response} from 'express';
import {HeaderError} from '../errorHandling/Exceptions/header.error';
import {AppResponse} from '../utils/AppResponse';
import {verify} from 'jsonwebtoken';
import {AuthenticationError} from '../errorHandling/Exceptions/authentication.error';
import {hasFuntions} from '../repository/jwt.dao';
import {AuthorizationError} from '../errorHandling/Exceptions/authorization.error';

function saniteUrl(x: string): string {
    let res = '';
    for (const i of x) {
        if (i === '?') break;
        res = res + i;
    }
    return res;
}

export interface Req extends Request {
    _id?: string;
    userName?: string;
}

export function fromJwt(req: Req, res: Response, next: Function): void {

    const auth: string = req.header('Authorization');
    if (auth) {
        try {
            const usr: any = verify(auth, 'secretkey gg');
            hasFuntions(usr.user.id, saniteUrl(req.originalUrl), req.method).then(
                e => {
                    if (e) {
                        req._id = usr.user.id;
                        req.userName = usr.user.userName;
                        next();
                    } else {
                        res.status(400).send(AppResponse.errorResponse(AuthorizationError.NoHasError(req.originalUrl + ' ' + req.method)));
                    }
                }
            );
        } catch (e) {
            res.status(400).send(AppResponse.errorResponse(AuthenticationError.TokenExpiration()));
        }
    }
    else res.status(400).send(AppResponse.errorResponse(HeaderError.AuthorizationHeaderError('Authorization')));
}
