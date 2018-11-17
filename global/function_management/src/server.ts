import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import {FunctionController} from './controller/function.controller';
import config from '../../enviroments.json';
import MongoConfig from '../../common/src/config/mongo.config';


const controller = new FunctionController();

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
        this.app.use('/functions', controller.router);
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

