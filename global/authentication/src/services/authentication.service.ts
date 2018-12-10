import {AccountDao} from '../dao/account.dao';
import {LoginDto} from '../dto/login.dto';
import {AuthenticationError} from '../../../common/src/errorHandling/Exceptions/authentication.error';
import {RegisterDto} from '../dto/register.dto';
import {ObjectId} from 'bson';
import {AccountModel} from '../../../common/src/models/accountModel';
import {AuditModel} from '../../../common/src/models/audit.model';
import {FunctionModelBasic} from '../../../common/src/models/functionModel';
import {tojwt} from '../../../common/src/security/jwt';
import {createTransport} from 'nodemailer';
import {sign, verify} from 'jsonwebtoken';
import {compare, hash} from 'bcrypt';

import {Db} from 'mongodb';

import MongoConfig from '../../../common/src/config/mongo.config';
import config from '../../../enviroments.json';

const db: Db = MongoConfig.getDbMultitenant('common');

export class AuthenticationService {

    private accountDao = new AccountDao();

    constructor() {
    }

    public async login(x: LoginDto): Promise<{ jwt: string, functions: FunctionModelBasic[], account: AccountModel }> {
        let resAccount: AccountModel;
        let resFunctions: FunctionModelBasic[];
        return this.accountDao.findByUserNameAndServerResource(db, {id: x.user, serverResource: 'local'})
            .then(e => compare(x.password, e.password)
                .then(correct => {
                    if (correct) return e;
                    throw AuthenticationError.LoginError(x.user);
                }))
            .then(e => {
                e.password = undefined;
                e.enabled = undefined;
                e.roles = undefined;
                e.functions = undefined;
                e.audit = undefined;
                resAccount = e;
                return this.accountDao.getAllFunctions(db, e.userName);
            }).then(functions => {
                resFunctions = functions;
                return tojwt(resAccount, functions);
            }).then(jwt => {
                return {
                    jwt: jwt,
                    functions: resFunctions,
                    account: resAccount
                };
            });
    }

    public async register(token: string): Promise<{ jwt: string, functions: FunctionModelBasic[], account: AccountModel }> {
        const x: RegisterDto = <RegisterDto>verify(token, config.privateKeyToConfimrEmail);
        return hash(x.password, 5)
            .then(password => {
                const account: AccountModel = {
                    password: password,
                    userName: {id: x.userName, serverResource: 'local'},
                    user: {
                        gender: x.gender,
                        lastName: x.lastName,
                        firstName: x.firstName,
                        birthDate: x.birthDate
                    },
                    _id: new ObjectId(),
                    email: x.email,
                    enabled: true,
                    functions: [],
                    roles: ['user'],
                    audit: new AuditModel(),
                    db: 'c0'
                };
                return account;
            })
            .then(account => this.accountDao.insert(db, account))
            .then(e => this.login({user: e.userName.id, password: e.password}));
    }

    public async enviarConfirmacionEmail(register: RegisterDto): Promise<{ message: string }> {
        const tokenR = sign(register, config.privateKeyToConfimrEmail, {expiresIn: '3600s'});
        const transporter = createTransport({
            service: config.email.server,
            host: config.email.host,
            auth: {
                user: config.email.user,
                pass: config.email.password
            }
        });
        return new Promise<{ message: string }>((solve, err) => {
            transporter.sendMail({
                from: config.email.user,
                to: register.email,
                subject: 'Confirmar Email',
                html: '<p>Pincha<a href="' + config.hostFront + '/authentication/register/' + tokenR + '"> a qui </a> para confirmar tu email</p>'
            }, (error, info) => {
                if (error)
                    err({message: error});
                else
                    solve({message: info});
            });
        });

    }

    public async resetPassword(email: string): Promise<{ message: string }> {
        let tokenR = '';
        return this.accountDao.findByEmail(db, email)
            .then(account => {
                if (account.userName.serverResource !== 'local') {
                    throw AuthenticationError.resetPasswordWithoutLocal();
                }
                return sign(
                    {
                        email: email,
                        id: account._id,
                        mensaje: 'no me hakees ps y si intentalo ps muajajjajaj'
                    },
                    config.privateKey,
                    {expiresIn: '3600s'});
            })
            .then(token => {
                tokenR = token;
                return token;
            })
            .then(token => createTransport({
                service: config.email.server,
                host: config.email.host,
                auth: {
                    user: config.email.user,
                    pass: config.email.password
                }
            }))
            .then(transporter => new Promise<{ message: string }>((solve, err) => {
                transporter.sendMail({
                    from: config.email.user,
                    to: email,
                    subject: 'Reiniciar Password',
                    // text: 'Hello world?' + config.hostFront + '/authentication/reset-password/' + tokenR
                    html: '<p>Pincha<a href="' + config.hostFront + '/authentication/reset-password/' + tokenR + '"> a qui </a> para reiniciar tu password</p>'
                    // html: '<a href="' + config.hostFront + '/authentication/reset-password/' + tokenR + '"></a>'
                }, (error, info) => {
                    if (error)
                        err({message: error});
                    else
                        solve({message: info});
                });
            }));
    }

    public async renovarToken(userName: { id: string, serverResource: string }): Promise<{
        jwt: string,
        functions: FunctionModelBasic[],
        account: AccountModel
    }> {
        let resAccount: AccountModel;
        let resFunctions: FunctionModelBasic[];

        return this.accountDao.findByUserNameAndServerResource(db, userName)
            .then(e => {
                e.password = undefined;
                e.enabled = undefined;
                e.roles = undefined;
                e.functions = undefined;
                e.audit = undefined;
                resAccount = e;
                return this.accountDao.getAllFunctions(db, e.userName);
            }).then(functions => {
                resFunctions = functions;
                return tojwt(resAccount, functions);
            }).then(jwt => {
                return {
                    jwt: jwt,
                    functions: resFunctions,
                    account: resAccount
                };
            });
    }

    public async registerAndLogin(
        userName: string,
        email: string,
        serverResource: string = 'local',
        firstName: string = '',
        lastName: string = '',
        birthDate: Date = new Date(),
        gender: string = '',
        photoUrl: string = null,
    ): Promise<string> {
        let account: AccountModel = {
            _id: new ObjectId(),
            password: '',
            userName: {
                id: userName,
                serverResource: serverResource
            },
            user: {
                gender: gender,
                lastName: lastName,
                firstName: firstName,
                birthDate: birthDate
            },
            email: email,
            enabled: true,
            functions: [],
            roles: ['user'],
            audit: new AuditModel(),
            photo: photoUrl
        };
        return this.accountDao.findByUserNameAndServerResource(db, account.userName)
            .then(e => e ? e : this.accountDao.insert(db, account))
            .then(e => {
                e.password = undefined;
                e.enabled = undefined;
                e.roles = undefined;
                e.functions = undefined;
                e.audit = undefined;
                account = e;
                return e;
            }).then(e => this.accountDao.getAllFunctions(db, e.userName))
            .then(e => tojwt(account, e));
    }

    public async github(userName: string): Promise<string> {
        let account: AccountModel = {
            _id: new ObjectId(),
            password: '',
            userName: {
                id: userName,
                serverResource: 'github'
            },
            user: {
                gender: '',
                lastName: '',
                firstName: '',
                birthDate: new Date()
            },
            email: '',
            enabled: true,
            functions: [],
            roles: ['user'],
            audit: new AuditModel()
        };
        return this.accountDao.findByUserNameAndServerResource(db, account.userName)
            .then(e => e ? e : this.accountDao.insert(db, account))
            .then(e => {
                e.password = undefined;
                e.enabled = undefined;
                e.roles = undefined;
                e.functions = undefined;
                e.audit = undefined;
                account = e;
                return e;
            }).then(e => this.accountDao.getAllFunctions(db, e.userName))
            .then(e => tojwt(account, e));
    }

    public async google(email: string, firstName: string, lastName: string): Promise<string> {
        let account: AccountModel = {
            _id: new ObjectId(),
            password: '',
            userName: {
                id: email,
                serverResource: 'google'
            },
            user: {
                gender: '',
                lastName: firstName,
                firstName: lastName,
                birthDate: new Date()
            },
            email: '',
            enabled: true,
            functions: [],
            roles: ['user'],
            audit: new AuditModel()
        };
        return this.accountDao.findByUserNameAndServerResource(db, account.userName)
            .then(e => e ? e : this.accountDao.insert(db, account))
            .then(e => {
                e.password = undefined;
                e.enabled = undefined;
                e.roles = undefined;
                e.functions = undefined;
                e.audit = undefined;
                account = e;
                return e;
            }).then(e => this.accountDao.getAllFunctions(db, e.userName))
            .then(e => tojwt(account, e));
    }


}

