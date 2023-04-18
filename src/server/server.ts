
import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import { dbConnection } from '../database/config';
import { Routes } from '../interfaces/Routes';

export class Server {
    public app: Express;
    public port: number;

    constructor(
        private routes: Routes[]
    ) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.initDataBase();
        this.middlewares();
        this.initRoutes(this.routes);
    }

    async initDataBase() {
        await dbConnection();
    }

    middlewares() {
        //directorio público
        this.app.use(express.static(path.join(__dirname, '../public')));

        //Implementación de cors
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());
    }

    initRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}