﻿import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import { Routes } from "./routes/crmRoutes"

class Server {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://localhost/WatchmakersDB';

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app)
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}

export default new Server().app;