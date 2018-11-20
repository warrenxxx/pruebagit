import {Request, Response, Router} from 'express';
import {RoleService} from '../services/role.service';
import {Validate} from '../../../common/src/utils/Validation';
import {AppResponse} from '../../../common/src/utils/AppResponse';
import {RoleDtoRules, dtoToRole, RoleDto} from '../dto/roleDto';

import {fromJwt, Req} from '../../../common/src/security/jwt';
import {ObjectId} from 'bson';

const service = new RoleService();

export class RoleController {

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
        Validate(req.body, RoleDtoRules)
            .then(e => dtoToRole(e))
            .then(e => service.insert(e, req._id))
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }

    public readOne(req: Request, res: Response): void {
        service.readOne(new ObjectId(req.params.id))
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

    public update(req: Req, res: Response): void {
        Validate(req.body, RoleDtoRules)
            .then(e =>  dtoToRole(e))
            .then(e => service.update(e, req._id))
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }

    public delete(req: Request, res: Response): void {
        service.delete(new ObjectId(req.params.id))
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }

}

