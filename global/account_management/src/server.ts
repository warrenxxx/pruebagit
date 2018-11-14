import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {AccountController} from './controller/account.controller';
import config from '../../enviroments.json';
import zeedData from '../../zeed.data.json';
import MongoConfig from '../../common/src/config/mongo.config';


const controller = new AccountController();

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
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
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
        this.app.use('/account', controller.router);
    }


    public initDatabase(): void {
        MongoConfig.connect(config.mongo.url, config.mongo.db).then(e => {
            console.log('Connect to db', e);
        });
    }

    public initPasspotRoutes(): void {
    }
}

export default new Server().app;

