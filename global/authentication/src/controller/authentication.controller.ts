import {Request, Response, Router} from 'express';
import {LoginDto, LoginDtoRules} from '../dto/login.dto';
import {AuthenticationService} from '../services/authentication.service';
import {RegisterDto, RegisterDtoRules} from '../dto/register.dto';
import {Validate} from '../../../common/src/utils/Validation';
import {AppResponse} from '../../../common/src/utils/AppResponse';

const service = new AuthenticationService();

export class AuthenticationController {

    public router: Router;

    constructor() {
        this.router = Router();
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
    }

    public login(req: Request, res: Response): void {
        Validate(req.body, LoginDtoRules)
            .then(e => <LoginDto> e)
            .then(e => service.login(e))
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }

    public register(req: Request, res: Response): void {
        Validate(req.body, RegisterDtoRules)
            .then(e => <RegisterDto>e)
            .then(e => service.register(e))
            .then(e => res.json(e))
            .catch(e => res.status(400).json(AppResponse.errorResponse(e)));
    }
}
