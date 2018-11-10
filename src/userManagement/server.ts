import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';


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

    }

    public initPasspotRoutes(): void {

    }
}

// export
export default new Server().app;
