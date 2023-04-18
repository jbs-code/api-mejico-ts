import { Router } from "express";
import { Routes } from "../interfaces/Routes";
import { Search } from "../controllers/Search";
import { categoriaPorNombre } from "../middlewares";

export class SearchRoutes implements Routes{
    public path = '/buscar/productos';
    public router = Router();
    private search = new Search();

    constructor(){
        this.init();
    }

    init(){
        this.router.get(`${this.path}/:categoria`, this.getMiddlewares(), this.search.getProductosPorCategoria);
        this.router.get(`${this.path}/disponibles/:categoria`, this.getMiddlewares(), this.search.getProductosPorCategoriaDisponibles);
        this.router.get(`${this.path}/nombre/:nombre`, this.search.getProductosPorNombre);

    }

    getMiddlewares(){
        return [
            categoriaPorNombre
        ]
    }
}