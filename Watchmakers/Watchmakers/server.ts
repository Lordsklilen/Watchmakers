import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
var session = require('express-session');
import * as cookieParser from "cookie-parser";
import { Routes } from "./routes/crmRoutes";
const path = require('path');

class Server {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://user2137:qwerty123@cluster0-shard-00-00-ghqta.gcp.mongodb.net:27017,cluster0-shard-00-01-ghqta.gcp.mongodb.net:27017,cluster0-shard-00-02-ghqta.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

    constructor() {
        this.app = express();
        
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use('/', express.static('html'));
        this.app.use((err, req, res, next) => {
            if(err.name === 'UnauthorizedError') {
              res.status(err.status).send({message:"dsdf"});
              return;
            }
         next();
        });
        this.app.use(cookieParser());
        this.app.use(session({
            Authorization:"Nie dla psa! dla pana to",
            key: 'user_sid',
            secret: 'somerandonstuffs',
            resave: false,
            saveUninitialized: false,
            cookie: {
                expires: 600000
            }
        }));
        
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}

export default new Server().app;