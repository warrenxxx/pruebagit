import {AccountDao} from '../dao/account.dao';
import {LoginDto} from '../dto/login.dto';
import {AuthenticationError} from '../../../common/src/errorHandling/Exceptions/authentication.error';
import {RegisterDto} from '../dto/register.dto';
import {sign} from 'jsonwebtoken';
import {ObjectId} from 'bson';
import {AccountModel} from '../../../common/src/models/account.model';
import {AuditModel} from '../../../common/src/models/audit.model';
import {FunctionRule} from '../../../common/src/models/role.model';

export class AuthenticationService {

    private accountDao = new AccountDao();

    constructor() {
    }

    public async login(x: LoginDto): Promise<{
        jwt: string,
        functions: FunctionRule[],
        account: AccountModel
    }> {
        return this.accountDao.findByUserName(x.user)
            .then(e => {
                if (!e || x.password !== e.password)
                    throw AuthenticationError.LoginError(x.user);
                e.password = undefined;
                e.enabled = undefined;
                e.roles = undefined;
                e.functions = undefined;
                e.audit = undefined;
                return this.accountDao.getAllFunctions(e.userName).then(functions => tojwt(e).then(jwt => {
                    return {
                        jwt: jwt,
                        functions: functions,
                        account: e
                    };
                }));
            });
    }

    public async register(x: RegisterDto): Promise<{
        jwt: string,
        functions: FunctionRule[],
        account: AccountModel
    }> {
        const account: AccountModel = {
            password: x.password,
            userName: x.userName,
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
            .then(e => this.login({user: e.userName, password: e.password}));
    }
}

async function tojwt(account: AccountModel): Promise<string> {
    const user = {
        id: account._id,
        userName: account.userName
    };
    let res;
    try {
        res = await sign({user}, 'secretkey gg', {expiresIn: '40s'});
    } catch (e) {
        throw  e;
    }
    return res;
}
