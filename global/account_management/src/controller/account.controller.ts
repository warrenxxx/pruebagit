import {Request, Response, Router} from 'express';
import {AccountService} from '../services/account.service';
import {Validate} from '../../../common/src/utils/Validation';
import {AppResponse} from '../../../common/src/utils/AppResponse';
import {AccountInsertDtoRules, insertToAccount} from '../dto/account.insert.dto';
import {AccountUpdateDtoRules, updateToAccount} from '../dto/account.update.dto';
import {fromJwt, Req} from '../../../common/src/security/jwt';

const service = new AccountService();

export class AccountController {

    public router: Router;

    constructor() {
        this.router = Router();
        this.router.post('/', fromJwt, this.insert);
        this.router.get('/', fromJwt, this.readOne);
        this.router.get('/all', fromJwt, this.readAll);
        this.router.put('/', fromJwt, this.update);
        this.router.delete('/', fromJwt, this.delete);
    }

    public insert(req: Req, res: Response): void {
        Validate(req.body, AccountInsertDtoRules)
            .then(e => insertToAccount(e))
            .then(e => service.insert(e, req._id))
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }

    public readOne(req: Request, res: Response): void {
        service.readOne(req.params.id)
            .then(e => {
                e.password = undefined;
                e.audit = undefined;
                return e;
            })
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }

    public readAll(req: Req, res: Response): void {

        service.readAll()
            .then(e => {
                e.forEach(value => {
                    value.password = undefined;
                    value.audit = undefined;
                });
                return e;

            })
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }

    public update(req: Req, res: Response): void {
        Validate(req.body, AccountUpdateDtoRules)
            .then(e => updateToAccount(e))
            .then(e => service.update(e, req._id))
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
                throw e;
            });
    }

    public delete(req: Request, res: Response): void {
        service.delete(req.params.id)
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }

}
