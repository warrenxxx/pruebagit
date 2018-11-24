import {AccountDao} from '../dao/account.dao';
import {LoginDto} from '../dto/login.dto';
import {AuthenticationError} from '../../../common/src/errorHandling/Exceptions/authentication.error';
import {RegisterDto} from '../dto/register.dto';
import {ObjectId} from 'bson';
import {AccountModel} from '../../../common/src/models/accountModel';
import {AuditModel} from '../../../common/src/models/audit.model';
import {FunctionModelBasic} from '../../../common/src/models/functionModel';
import {tojwt} from '../../../common/src/security/jwt';

export class AuthenticationService {

    private accountDao = new AccountDao();

    constructor() {
    }

    public async register(x: RegisterDto): Promise<{
        jwt: string,
        functions: { _id: string, methods: string[] }[],
        account: AccountModel
    }> {
        const account: AccountModel = {
            password: x.password,
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
            audit: new AuditModel()
        };
        return this.accountDao.insert(account)
            .then(e => this.login({user: e.userName.id, password: e.password}));
    }

    public async login(x: LoginDto): Promise<{
        jwt: string,
        functions: FunctionModelBasic[],
        account: AccountModel
    }> {
        let resAccount: AccountModel;
        let resFunctions: FunctionModelBasic[];
        return this.accountDao.findByUserNameAndServerResource({id: x.user, serverResource: 'local'})
            .then(e => {
                if (!e || x.password !== e.password)
                    throw AuthenticationError.LoginError(x.user);
                e.password = undefined;
                e.enabled = undefined;
                e.roles = undefined;
                e.functions = undefined;
                e.audit = undefined;
                resAccount = e;
                return this.accountDao.getAllFunctions(e.userName);
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

    public async renovarToken(userName: { id: string, serverResource: string }): Promise<{
        jwt: string,
        functions: FunctionModelBasic[],
        account: AccountModel
    }> {
        let resAccount: AccountModel;
        let resFunctions: FunctionModelBasic[];

        return this.accountDao.findByUserNameAndServerResource(userName)
            .then(e => {
                e.password = undefined;
                e.enabled = undefined;
                e.roles = undefined;
                e.functions = undefined;
                e.audit = undefined;
                resAccount = e;
                return this.accountDao.getAllFunctions(e.userName);
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
        return this.accountDao.findByUserNameAndServerResource(account.userName)
            .then(e => e ? e : this.accountDao.insert(account))
            .then(e => {
                e.password = undefined;
                e.enabled = undefined;
                e.roles = undefined;
                e.functions = undefined;
                e.audit = undefined;
                account = e;
                return e;
            }).then(e => this.accountDao.getAllFunctions(e.userName))
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
        return this.accountDao.findByUserNameAndServerResource(account.userName)
            .then(e => e ? e : this.accountDao.insert(account))
            .then(e => {
                e.password = undefined;
                e.enabled = undefined;
                e.roles = undefined;
                e.functions = undefined;
                e.audit = undefined;
                account = e;
                return e;
            }).then(e => this.accountDao.getAllFunctions(e.userName))
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
        return this.accountDao.findByUserNameAndServerResource(account.userName)
            .then(e => e ? e : this.accountDao.insert(account))
            .then(e => {
                e.password = undefined;
                e.enabled = undefined;
                e.roles = undefined;
                e.functions = undefined;
                e.audit = undefined;
                account = e;
                return e;
            }).then(e => this.accountDao.getAllFunctions(e.userName))
            .then(e => tojwt(account, e));
    }


}

