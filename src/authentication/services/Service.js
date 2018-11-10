"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountDao_1 = require("../dao/AccountDao");
const AuthenticationException_1 = require("../../common/errorHandling/Exceptions/AuthenticationException");
const jsonwebtoken_1 = require("jsonwebtoken");
const Audit_1 = require("../../common/models/Audit");
const bson_1 = require("bson");
class Service {
    constructor() {
        this.accountDao = new AccountDao_1.AccountDao();
    }
    login(x) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountDao.findByUserName(x.user)
                .then(e => {
                if (x.password !== e.password)
                    throw AuthenticationException_1.AuthenticationException.LoginException(e.userName);
                e.password = undefined;
                return e;
            });
        });
    }
    register(x) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = {
                password: x.password,
                userName: x.userName,
                user: {
                    gender: x.gender,
                    lastName: x.lastName,
                    firstName: x.firstName,
                    birthDate: x.birthDate
                },
                _id: new bson_1.ObjectId(),
                email: x.email,
                enabled: true,
                functions: [],
                roles: ['user'],
                audit: new Audit_1.Audit()
            };
            return this.accountDao.insert(account)
                .then(e => 'oks');
        });
    }
}
exports.Service = Service;
function tojwt(account) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = {
            id: account._id,
            userName: account.userName
        };
        let res;
        try {
            const aux = yield jsonwebtoken_1.sign({ user }, 'secretkey gg', { expiresIn: '40s' });
            res = {
                userName: account.userName,
                firstName: account.user.firstName,
                lastName: account.user.lastName,
                gender: account.user.gender,
                email: account.email,
                token: aux
            };
        }
        catch (e) {
            console.log(e);
        }
        return res;
    });
}
