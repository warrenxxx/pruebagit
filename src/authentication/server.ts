import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import MongoConfig from '../common/config/MongoConfig';
import {Validate} from '../common/utils/Validation';
import {LoginDtoRules} from './dto/LoginDto';
import {FunctionRule, Role} from '../common/models/Role';
import {Audit} from '../common/models/Audit';
import {ObjectId} from 'bson';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.initPasspotRoutes();
        this.initDatabase();
    }

    public config(): void {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(cors());

        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, OPTIONS',
            );
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
            );
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });

    }

    public routes(): void {

    }


    public initDatabase(): void {
        MongoConfig.connect('mongodb://localhost:27017/nodeP1', 'dbMicap').then(e => {
            console.log('connect to database');
            pruebas();
        });
        const login = {user: 'warren', password: '4566sfa', rrr: 'dd'};
        Validate(login, LoginDtoRules).then(e => {
            console.log(e);
        });

    }

    public initPasspotRoutes(): void {
    }
}

function pruebas(): void {
    const functions: FunctionRule[] = [
        {_id: {method: 'post', path: '/user'}, cod: 'usr_in', description: 'inserta un usuario', name: 'insert user', audit: new Audit()},
        {_id: {method: 'get', path: '/user'}, cod: 'usr_re', description: 'obtiene un usuario', name: 'read user', audit: new Audit()},
        {_id: {method: 'get', path: '/user/all'}, cod: 'usr_re_all', description: 'obtiene todos los usuario', name: 'read all users', audit: new Audit()},
        {_id: {method: 'update', path: '/user   '}, cod: 'use_up', description: 'actualiza un usuario', name: 'update user', audit: new Audit()},
        {_id: {method: 'remove', path: '/user'}, cod: 'use_re', description: 'elimina un usuario', name: 'remove user', audit: new Audit()},

        {_id: {method: 'post', path: '/role'}, cod: 'rol_in', description: 'inserta un rol', name: 'insert role', audit: new Audit()},
        {_id: {method: 'get', path: '/role'}, cod: 'rol_re', description: 'obtiene un rol', name: 'read role', audit: new Audit()},
        {_id: {method: 'get', path: '/role/all'}, cod: 'rol_re_all', description: 'obtiene todos los roles', name: 'read all roles', audit: new Audit()},
        {_id: {method: 'update', path: '/role'}, cod: 'rol_up', description: 'actualiza un rol', name: 'update role', audit: new Audit()},
        {_id: {method: 'remove', path: '/role'}, cod: 'rol_re', description: 'elimina un rol', name: 'remove role', audit: new Audit()},

        {_id: {method: 'post', path: '/microlesson'}, cod: 'mcr_in', description: 'inserta un microleccion', name: 'insert microlesson', audit: new Audit()},
        {_id: {method: 'get', path: '/microlesson'}, cod: 'mcr_re', description: 'obtiene un microleccion', name: 'read microlesson', audit: new Audit()},
        {_id: {method: 'get', path: '/microlesson/all'}, cod: 'mcr_re_all', description: 'obtiene todos los microleccion', name: 'read all microlessons', audit: new Audit()},
        {_id: {method: 'update', path: '/microlesson'}, cod: 'mcr_up', description: 'actualiza un microleccion', name: 'update microlesson', audit: new Audit()},
        {_id: {method: 'remove', path: '/microlesson'}, cod: 'mcr_re', description: 'elimina un microleccion', name: 'remove microlesson', audit: new Audit()},

    ];
    const role: Role[] = [
        {_id: new ObjectId(), name: 'user', description: 'es el usuario basico', functions: ['usr_in', 'user_re', 'usr_up'], audit: new Audit(), isActive: true},
        {_id: new ObjectId(), name: 'admin', description: 'es el usuario basico', functions: ['usr_in', 'user_re', 'usr_up'], audit: new Audit(), isActive: true},
        {_id: new ObjectId(), name: 'controller', description: 'es el usuario basico', functions: ['usr_in', 'user_re', 'usr_up'], audit: new Audit(), isActive: true},
        {_id: new ObjectId(), name: 'read', description: 'es el usuario basico', functions: ['usr_in', 'user_re', 'usr_up'], audit: new Audit(), isActive: true},
        {_id: new ObjectId(), name: 'editor', description: 'es el usuario basico', functions: ['usr_in', 'user_re', 'usr_up'], audit: new Audit(), isActive: true},
    ];

    MongoConfig.db.collection('functions')
        .deleteMany({})
        .then(e => MongoConfig.db.collection('functions').insertMany(functions));
}


export default new Server().app;

