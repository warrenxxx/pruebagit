import {Request, Response, Router} from 'express';
import {LoginDto, LoginDtoRules} from '../dto/login.dto';
import {RegisterDto, RegisterDtoRules} from '../dto/register.dto';
import {Validate} from '../../../common/src/utils/Validation';
import {AppResponse} from '../../../common/src/utils/AppResponse';
import {fromJwt, Req} from '../../../common/src/security/jwt';
import config from '../../../enviroments.json';
import * as requestPromise from 'request-promise-native';
import {AuthenticationService} from '../services/authentication.service';
import moment from 'moment';

const service = new AuthenticationService();

export class AuthenticationController {

    public router: Router;

    constructor() {
        this.router = Router();
        this.router.post('/login', this.login);
        this.router.get('/register/:token', this.register);
        this.router.post('/confirmEmail', this.confirmEmail);
        this.router.get('/refresh_token', fromJwt, this.refreshToken);
        this.router.get('/github', this.accessGitHub);
        this.router.get('/google', this.accessGoogle);
        this.router.get('/facebook', this.accessFacebook);
        this.router.get('/reset/:email', this.resetPassword);
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
        // Validate(req.body, RegisterDtoRules)
        //     .then(e => <RegisterDto>e)
        service.register(<string>req.params.token)
            .then(e => res.json(e))
            .catch(e => res.status(400).json(AppResponse.errorResponse(e)));
    }

    /*
    External Authentication
     */
    public accessGitHub(req: Request, res: Response): void {
        requestPromise.get({
            url: `https://github.com/login/oauth/access_token?client_id=${config.oauth.github.clientId}&client_secret=${config.oauth.github.secret}&code=${req.query.code}`,
            headers: {accept: 'application/json'},
            json: true
        })
            .then(e => requestPromise.get(
                {
                    url: 'https://api.github.com/user',
                    headers: {Authorization: 'token ' + e.access_token, 'user-agent': 'node.js'},
                    json: true
                }
            ))
            .then(e =>
                service.registerAndLogin(
                    e.login,
                    e.email,
                    'github',
                    '',
                    '',
                    new Date(),
                    '',
                    e.avatar_url))
            .then(e => res.redirect(config.hostFront + '/authentication/login/' + e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }


    public accessGoogle(req: Request, res: Response): void {
        requestPromise.post('https://www.googleapis.com/oauth2/v4/token', {
            form: {
                code: req.query.code,
                client_id: config.oauth.google.clientId,
                client_secret: config.oauth.google.secret,
                redirect_uri: config.oauth.google.redirect_uri,
                grant_type: 'authorization_code'
            },
            json: true
        }).then(
            e => requestPromise.get(
                {
                    url: 'https://www.googleapis.com/plus/v1/people/me',
                    headers: {
                        'Authorization': 'Bearer ' + e.access_token
                    },
                    json: true
                }
            )
        )
            .then(e => {
                console.log(e);
                return e;
            })
            .then(e =>
                service.registerAndLogin(
                    e.emails[0].value,
                    e.emails[0].value,
                    'google',
                    e.name.givenName,
                    e.name.familyName,
                    new Date(),
                    '',
                    e.image.url.substring(0, e.image.url.length - 2) + '160'
                ))
            .then(e => res.redirect(config.hostFront + '/authentication/login/' + e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }

    private accessFacebook(req: Req, res: Response): void {

        requestPromise.post('https://graph.facebook.com/v3.2/oauth/access_token', {
            form: {
                code: req.query.code,
                client_id: config.oauth.facebook.clientId,
                client_secret: config.oauth.facebook.secret,
                redirect_uri: config.oauth.facebook.redirect_uri
            },
            json: true
        })
            .then(
                e => requestPromise.get(
                    {
                        url: 'https://graph.facebook.com/v3.2/me?fields=id%2Cname%2Caddress%2Cbirthday%2Cemail%2Cgender%2Cfirst_name%2Cpicture.type(large)%7Burl%7D%2Clast_name&access_token=' + e.access_token,
                        json: true

                    },
                )
            )
            .then(e =>
                service.registerAndLogin(
                    e.email,
                    e.email,
                    'facebook',
                    e.first_name,
                    e.last_name,
                    moment(e.birthday, 'MM/DD/YYYY').toDate(),
                    e.gender,
                    e.picture.data.url))
            .then(e => res.redirect(config.hostFront + '/authentication/login/' + e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });

    }

    private resetPassword(req: Req, res: Response): void {
        service.resetPassword(req.params.email)
            .then(e => res.status(200).send(e))
            .catch(e => {
                res.status(400).send(AppResponse.errorResponse(e));
            });
    }

    private confirmEmail(req: Req, res: Response): void {
        Validate(req.body, RegisterDtoRules)
            .then(e => <RegisterDto>e)
            .then(e => service.enviarConfirmacionEmail(e))
            .then(e => res.json(e))
            .catch(e => res.status(400).json(AppResponse.errorResponse(e)));

    }
}
