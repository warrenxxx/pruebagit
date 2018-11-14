import {Request, Response, Router} from 'express';
import {RoleService} from '../services/role.service';
import {Validate} from '../../../common/src/utils/Validation';
import {AppResponse} from '../../../common/src/utils/AppResponse';
import {RoleInsertDtoRules, insertToRole} from '../dto/role.insert.dto';
import {RoleUpdateDtoRules, updateToRole} from '../dto/role.update.dto';
import {fromJwt, Req} from '../../../common/src/security/jwt';

const service = new RoleService();

export class RoleController {

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
        Validate(req.body, RoleInsertDtoRules)
            .then(e => insertToRole(e))
            .then(e => service.insert(e, req._id))
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
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

    public update(req: Req, res: Response): void {
        Validate(req.body, RoleUpdateDtoRules)
            .then(e => updateToRole(e))
            .then(e => service.update(e, req._id))
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
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

