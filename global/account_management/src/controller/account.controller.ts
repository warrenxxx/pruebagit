import {Request, Response, Router} from 'express';
import {AccountService} from '../services/account.service';
import {Validate} from '../../../common/src/utils/Validation';
import {AppResponse} from '../../../common/src/utils/AppResponse';
import {AccountDtoRules, dtoToAccount} from '../dto/account..dto';

import {fromJwt, Req} from '../../../common/src/security/jwt';
import {ObjectId} from 'bson';

const service = new AccountService();

export class AccountController {

    public router: Router;

    constructor() {
        this.router = Router();
        this.router.post('/', fromJwt, this.insert);
        this.router.get('/:id', fromJwt, this.readOne);
        this.router.get('/', fromJwt, this.readAll);
        this.router.put('/:id', fromJwt, this.update);
        this.router.delete('/:id', fromJwt, this.delete);
    }

    public insert(req: Req, res: Response): void {
        Validate(req.body, AccountDtoRules)
            .then(e => dtoToAccount(e))
            .then(e => service.insert(req.db, e, req._id))
            .then(e => res.status(200).send(e))
            .catch(e => res.status(400).send(AppResponse.errorResponse(e)));
    }

    public readOne(req: Req, res: Response): void {
        service.readOne(req.db, new ObjectId(req.params.id))
            .then(e => res.status(200).send(e))
            .catch(e => res.status(400).send(AppResponse.errorResponse(e)));
    }

    public readAll(req: Req, res: Response): void {
        service.readAll(req.db)
            .then(e => res.status(200).send(e))
            .catch(e => res.status(400).send(AppResponse.errorResponse(e)));
    }

    public update(req: Req, res: Response): void {
        Validate(req.body, AccountDtoRules)
            .then(e => dtoToAccount(e, new ObjectId(req.params.id)))
            .then(e => service.update(req.db, e, req._id))
            .then(e => res.status(200).send(e))
            .catch(e => res.status(400).send(AppResponse.errorResponse(e)));
    }

    public delete(req: Req, res: Response): void {
        service.delete(req.db, new ObjectId(req.params.id))
            .then(e => res.status(200).send({count: e}))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
                throw e;
            });
    }
}

