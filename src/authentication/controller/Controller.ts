import {Request, Response, Router} from 'express';
import {Validate} from '../../common/utils/Validation';
import {LoginDto, LoginDtoRules} from '../dto/LoginDto';
import {Service} from '../services/Service';
import {AppResponse} from '../../common/utils/AppResponse';

const service = new Service();

export class Controller {

    public router: Router;

    constructor() {
        this.router = Router();
        // this.router.get('/', this.all);
        // this.router.get('/:id', this.one);
        // this.router.post('/', this.create);
        // this.router.put('/', this.update);
        // this.router.delete('/:id', this.delete);
        this.router.post('/login', this.login);
        // this.router.post('/register', this.register);
    }

    public login(req: Request, res: Response): void {
        Validate(req.body, LoginDtoRules)
            .then(e => <LoginDto> e)
            .then(e => service.login(e))
            .then(e => res.status(200).send(e))
            .catch(e => res.sendStatus(400).send(AppResponse.errorResponse(e)));
    }

    // public register(req: Request, res: Response): void {
    //     Validate(req.body, reqRegisterRules)
    //         .then(e => <reqRegisterDto>e)
    //         .then(e => service.register(e))
    //         .then(e => res.json(e))
    //         .catch(e => res.status(400).json(AppResponse.errorResponse(e)));
    // }
    //
    // public create(req: Request, res: Response): void {
    //     // let x = new ReqInsertUserDto(req.body);
    //     // let x=Validate(req.body,reqDto);
    //     //  ValidateObject(x)
    //     //     .then(e => Controller.dao.insert(e.getUser()))
    //     //     .then(e => res.status(200).send(AppResponse.okCount(e)))
    //     //     .catch(e=>res.status(400).send(AppResponse.errorResponse(e)))
    //     // ;
    // }
    //
    // public all(req: Request, res: Response): void {
    //     // Controller.dao.findAll()
    //     //     .then(e => e.map(f => new ResUserFindAllDto(f)))
    //     //     .then(e => res.status(200).send(AppResponse.okObject(e)))
    //     //     .catch(e=>res.status(400).send(AppResponse.errorResponse(e)))
    // }
    //
    // public one(req: Request, res: Response): void {
    //     // let {id} = req.params;
    //     // Controller.dao.findById(id)
    //     //     .then(e =>  new ResUserFindOneDto(e))
    //     //     .then(e => res.status(200).send(AppResponse.okObject(e)))
    //     //     .catch(e=>res.status(400).send(AppResponse.errorResponse(e)))
    // }
    //
    // public update(req: Request, res: Response): void {
    //     // let x = new ReqUpdateUserDto(req.body);
    //     // ValidateObject(x)
    //     //     .then(e => Controller.dao.update(e.getUser()))
    //     //     .then(e => res.status(200).send(AppResponse.okCount(e)))
    //     //     .catch(e=>res.status(400).send(AppResponse.errorResponse(e)));
    // }
    //
    // public delete(req: Request, res: Response): void {
    //     // let {id} = req.params;
    //     // Controller.dao.removeById(id)
    //     //     .then(e => res.status(200).send(AppResponse.okCount(e)))
    //     //     .catch(e=>res.status(400).send(AppResponse.errorResponse(e)));
    // }
}
