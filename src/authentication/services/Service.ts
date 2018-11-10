import {AccountDao} from '../dao/AccountDao';
import {LoginDto} from '../dto/LoginDto';
import {AuthenticationException} from '../../common/errorHandling/Exceptions/AuthenticationException';
import {RegisterDto} from '../dto/RegisterDto';
import {Account} from '../../common/models/Account';
import {sign} from 'jsonwebtoken';
import {Audit} from '../../common/models/Audit';
import {ObjectId} from 'bson';


export class Service {

    private accountDao = new AccountDao();

    constructor() {}

    public async login(x: LoginDto): Promise<any> {
        return this.accountDao.findByUserName(x.user)
            .then(e => {
                if (x.password !== e.password)
                    throw AuthenticationException.LoginException(e.userName);
                e.password = undefined;
                return e;
            });
    }

    public async register(x: RegisterDto): Promise<string> {
        const account: Account = {
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
            audit: new Audit()
        };
        return this.accountDao.insert(account)
            .then(e => 'oks');
    }
}

async function tojwt(account: Account): Promise<any> {
    const user = {
        id: account._id,
        userName: account.userName
    };
    let res;
    try {
        const aux = await sign({user}, 'secretkey gg', {expiresIn: '40s'});
        res = {
            userName: account.userName,
            firstName: account.user.firstName,
            lastName: account.user.lastName,
            gender: account.user.gender,
            email: account.email,
            token: aux
        };
    } catch (e) {
        console.log(e);
    }
    return res;
}
