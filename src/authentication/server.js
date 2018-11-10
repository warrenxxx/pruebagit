"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const MongoConfig_1 = __importDefault(require("../common/config/MongoConfig"));
const Validation_1 = require("../common/utils/Validation");
const LoginDto_1 = require("./dto/LoginDto");
const Audit_1 = require("../common/models/Audit");
const bson_1 = require("bson");
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
        this.initPasspotRoutes();
        this.initDatabase();
    }
    config() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors_1.default());
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }
    routes() {
    }
    initDatabase() {
        MongoConfig_1.default.connect('mongodb://localhost:27017/nodeP1', 'dbMicap').then(e => {
            console.log('connect to database');
            pruebas();
        });
        const login = { user: 'warren', password: '4566sfa', rrr: 'dd' };
        Validation_1.Validate(login, LoginDto_1.LoginDtoRules).then(e => {
            console.log(e);
        });
    }
    initPasspotRoutes() {
    }
}
function pruebas() {
    const functions = [
        { _id: { method: 'post', path: '/user' }, cod: 'usr_in', description: 'inserta un usuario', name: 'insert user', audit: new Audit_1.Audit() },
        { _id: { method: 'get', path: '/user' }, cod: 'usr_re', description: 'obtiene un usuario', name: 'read user', audit: new Audit_1.Audit() },
        { _id: { method: 'get', path: '/user/all' }, cod: 'usr_re_all', description: 'obtiene todos los usuario', name: 'read all users', audit: new Audit_1.Audit() },
        { _id: { method: 'update', path: '/user   ' }, cod: 'use_up', description: 'actualiza un usuario', name: 'update user', audit: new Audit_1.Audit() },
        { _id: { method: 'remove', path: '/user' }, cod: 'use_re', description: 'elimina un usuario', name: 'remove user', audit: new Audit_1.Audit() },
        { _id: { method: 'post', path: '/role' }, cod: 'rol_in', description: 'inserta un rol', name: 'insert role', audit: new Audit_1.Audit() },
        { _id: { method: 'get', path: '/role' }, cod: 'rol_re', description: 'obtiene un rol', name: 'read role', audit: new Audit_1.Audit() },
        { _id: { method: 'get', path: '/role/all' }, cod: 'rol_re_all', description: 'obtiene todos los roles', name: 'read all roles', audit: new Audit_1.Audit() },
        { _id: { method: 'update', path: '/role' }, cod: 'rol_up', description: 'actualiza un rol', name: 'update role', audit: new Audit_1.Audit() },
        { _id: { method: 'remove', path: '/role' }, cod: 'rol_re', description: 'elimina un rol', name: 'remove role', audit: new Audit_1.Audit() },
        { _id: { method: 'post', path: '/microlesson' }, cod: 'mcr_in', description: 'inserta un microleccion', name: 'insert microlesson', audit: new Audit_1.Audit() },
        { _id: { method: 'get', path: '/microlesson' }, cod: 'mcr_re', description: 'obtiene un microleccion', name: 'read microlesson', audit: new Audit_1.Audit() },
        { _id: { method: 'get', path: '/microlesson/all' }, cod: 'mcr_re_all', description: 'obtiene todos los microleccion', name: 'read all microlessons', audit: new Audit_1.Audit() },
        { _id: { method: 'update', path: '/microlesson' }, cod: 'mcr_up', description: 'actualiza un microleccion', name: 'update microlesson', audit: new Audit_1.Audit() },
        { _id: { method: 'remove', path: '/microlesson' }, cod: 'mcr_re', description: 'elimina un microleccion', name: 'remove microlesson', audit: new Audit_1.Audit() },
    ];
    const role = [
        { _id: new bson_1.ObjectId(), name: 'user', description: 'es el usuario basico', functions: ['usr_in', 'user_re', 'usr_up'], audit: new Audit_1.Audit(), isActive: true },
        { _id: new bson_1.ObjectId(), name: 'admin', description: 'es el usuario basico', functions: ['usr_in', 'user_re', 'usr_up'], audit: new Audit_1.Audit(), isActive: true },
        { _id: new bson_1.ObjectId(), name: 'controller', description: 'es el usuario basico', functions: ['usr_in', 'user_re', 'usr_up'], audit: new Audit_1.Audit(), isActive: true },
        { _id: new bson_1.ObjectId(), name: 'read', description: 'es el usuario basico', functions: ['usr_in', 'user_re', 'usr_up'], audit: new Audit_1.Audit(), isActive: true },
        { _id: new bson_1.ObjectId(), name: 'editor', description: 'es el usuario basico', functions: ['usr_in', 'user_re', 'usr_up'], audit: new Audit_1.Audit(), isActive: true },
    ];
    MongoConfig_1.default.db.collection('functions')
        .deleteMany({})
        .then(e => MongoConfig_1.default.db.collection('functions').insertMany(functions));
}
exports.default = new Server().app;
