import { Router } from "express";
import { Routes } from "../interfaces/Routes";
import { Category } from "../controllers/Category";
import { idCategoriaExiste, validarJWT } from "../helpers";
import { check } from "express-validator";
import { esAdminRol, validarCampos } from "../middlewares";

export class CategoryRoutes implements Routes{
    public path = '/categorias'
    public router = Router();
    public category = new Category();
    
    constructor(){
        this.init();
    }

    init(): void {
        this.router.get(this.path, this.category.getDocument);
        this.router.post(this.path, this.postMiddlewares(), this.category.postDocument);
        this.router.put(`${this.path}/:id`, this.putMiddlewares(), this.category.putDocument);
        this.router.delete(`${this.path}/:id`, this.deleteMiddlewares(), this.category.deleteDocument);
    }

    postMiddlewares(): any[] {
        return [
            validarJWT,
            check('nombre', 'Es necesario ingresar un nombre').notEmpty(),
            validarCampos
        ]
    }

    putMiddlewares(): any[] {
        return [
            validarJWT,
            check('id', 'EL id debe ser un id válido de mongo').isMongoId(),
            check('id').custom(idCategoriaExiste),
            check('nombre', 'Es necesario ingresar un nombre').notEmpty(),
            validarCampos
        ]
    }

    deleteMiddlewares(): any[] {
        return [
            validarJWT,
            esAdminRol,
            check('id', 'EL id debe ser un id válido de mongo').isMongoId(),
            check('id').custom(idCategoriaExiste),
            validarCampos
        ]
    }
}