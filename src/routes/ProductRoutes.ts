import { Router } from "express";
import { Routes } from "../interfaces/Routes";
import { Product } from "../controllers/Product";
import { idCategoriaExiste, idProductoExiste, validarJWT } from "../helpers";
import { check } from "express-validator";
import { esAdminRol, validarCampos } from "../middlewares";

export class ProductRoutes implements Routes{
    public path = '/productos';
    public router = Router();
    private producto = new Product();

    constructor(){
        this.init();
    }

    init(): void {
        this.router.get(this.path, this.producto.getDocument);
        this.router.post(this.path, this.postMiddlewares(), this.producto.postDocument);
        this.router.put(`${this.path}/:id`, this.putMiddlewares(), this.producto.putDocument);
        this.router.delete(`${this.path}/:id`, this.deleteMiddlewares(), this.producto.deleteDocument);
    }

    postMiddlewares(): any[] {
        return [
            validarJWT,
            check('nombre', 'Es necesario ingresar un nombre').notEmpty(),
            check('categoria', 'El id debe ser un id válido de mongo').isMongoId(),
            check('categoria').custom(idCategoriaExiste),
            check('descripcion', 'Es necesario ingresar una descripción').notEmpty(),
            check('costo', 'Es necesario ingresar el precio').notEmpty(),
            check('costo', 'El precio debe ser numérico').isNumeric(),
            check('disponibilidad', 'Indique si está disponible: true o false').isBoolean(),
            validarCampos
        ]
    }

    putMiddlewares(): any[] {
        return [
            validarJWT,
            check('id', 'Debe ingresar un id valido de mongo').isMongoId(),
            check('id').custom(idProductoExiste),
            check('categoria', 'Debe ingresar un id valido de mongo').isMongoId(),
            check('categoria').custom(idCategoriaExiste),
            check('disponibilidad', 'Indique si está disponible: true o false').isBoolean(),
            validarCampos
        ]
    }

    deleteMiddlewares(): any[] {
        return [
            validarJWT,
            check('id', 'Debe ingresar un id valido de mongo').isMongoId(),
            check('id').custom(idProductoExiste),
            esAdminRol,
            validarCampos
        ]
    }
}