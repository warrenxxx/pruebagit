import {Request, Response, Router} from 'express';
import {LoginDto, LoginDtoRules} from '../dto/login.dto';
import {AuthenticationService} from '../services/authentication.service';
import {RegisterDto, RegisterDtoRules} from '../dto/register.dto';
import {Validate} from '../../../common/src/utils/Validation';
import {AppResponse} from '../../../common/src/utils/AppResponse';
import axios from 'axios';
import {fromJwt, Req} from '../../../common/src/security/jwt';
import config from '../../../enviroments.json';
import * as querystring from 'querystring';


const service = new AuthenticationService();

export class AuthenticationController {

    public router: Router;

    constructor() {
        this.router = Router();
        this.router.post('/login', this.login);
        this.router.post('/register', this.register);
        this.router.get('/refresh_token', fromJwt, this.refreshToken);
        this.router.get('/github', this.accessTokenGitHub);
        this.router.get('/google', this.accessTokenGoogle);
        this.router.get('/googleCode', this.accessCodeGoogle);
    }

    public refreshToken(req: Req, res: Response): void {
        service.renovarToken(req.userName)
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }

    /*
    Local Authentication
     */
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

    /*
    External Authentication
     */
    public accessTokenGitHub(req: Request, res: Response): void {
        const requestToken = req.query.code;
        axios.get(
            `https://github.com/login/oauth/access_token?client_id=${config.oauth.github.clientId}&client_secret=${config.oauth.github.secret}&code=${requestToken}`,
            {headers: {accept: 'application/json'}}
        ).then((response) => axios.get(
            'https://api.github.com/user',
            {headers: {Authorization: 'token ' + response.data.access_token}}
        )).then((e: any) => service.github(e.data.login))
            .then(e => res.redirect(config.hostFront + '/pages/auth/login/' + e))
            .catch(e => {
                throw e;
            });
    }

    public accessCodeGoogle(req: Request, res: Response): void {
        console.log('otroooo');
        console.log(req.query);
        console.log(req.body);
        res.send({ll: 'ss'});
    }

    public accessTokenGoogle(req: Request, res: Response): void {
        const requestToken = req.query.code;
        console.log(req.query);


        axios.post(`https://www.googleapis.com/oauth2/v4/token`,
            querystring.stringify({
                code: req.query.code, //gave the values directly for testing
                client_id: config.oauth.google.clientId,
                client_secret: config.oauth.google.secret,
                redirect_uri: 'http://localhost:3000/authentication/googleCode',
                grant_type: 'authorization_code'
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                console.log(response);
                res.send(req.query);
            }).catch(e => {
            throw  e;
        });
        // axios.post(
        //     `https://www.googleapis.com/oauth2/v4/token?code=${requestToken}&client_id=${config.oauth.google.clientId}&client_secret=${config.oauth.google.secret}&redirect_uri=https://oauth2.example.com/code&grant_type=authorization_code`,
        //     {headers: {accept: 'application/json'}}
        // ).then((response) => {
        //     console.log(response);
        // })
        //     // .then((e: any) => service.google(e.data.login))
        //     // .then(e => res.redirect(config.hostFront + '/pages/auth/login/' + e))
        //     .catch(e => {
        //         throw e;
        //     })
        // ;
    }
}
