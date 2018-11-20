import {Request, Response, Router} from 'express';
import {FunctionService} from '../services/function.service';
import {AppResponse} from '../../../common/src/utils/AppResponse';
import {fromJwt, Req} from '../../../common/src/security/jwt';

const service = new FunctionService();

export class FunctionController {

    public router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:id', fromJwt, this.readOne);
        this.router.get('/', fromJwt, this.readAll);
    }

    public readOne(req: Request, res: Response): void {
        service.readOne(req.params.id)
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }

    public readAll(req: Req, res: Response): void {
        service.readAll()
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }

}

