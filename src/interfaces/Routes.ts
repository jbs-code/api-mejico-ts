import { Router } from "express";

export interface Routes {
    router: Router;
    path: string;

    init(): void;
    postMiddlewares?(): any[];
    putMiddlewares?(): any[];
    deleteMiddlewares?(): any[];
}