import { Routes } from './interfaces/Routes';
import { CategoryRoutes, LoginRoutes, ProductRoutes, SearchRoutes, UserRoutes } from './routes';
import { Server } from './server/server';
import dotenv from 'dotenv';
dotenv.config();

const routes: Routes[] = [
    new LoginRoutes(),
    new UserRoutes(),
    new CategoryRoutes(),
    new ProductRoutes(),
    new SearchRoutes()
];

const server = new Server(routes);
server.listen();