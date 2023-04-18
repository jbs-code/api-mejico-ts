import { Router } from "express";
import { check } from "express-validator";
import { User } from "../controllers/User";
import { Routes } from "../interfaces/Routes";
import { esAdminRol, validarCampos } from "../middlewares";
import { emailExiste, idUsuarioExiste, validarJWT } from "../helpers";

export class UserRoutes implements Routes {
    public path = '/usuarios';
    public router = Router();
    private user = new User();

    constructor() {
        this.init();
    }

    init() {
        this.router.get(this.path, this.user.getDocument);
        this.router.post(this.path, this.postMiddlewares(), this.user.postDocument);
        this.router.put(`${this.path}/:id`, this.putMiddlewares(), this.user.putDocument);
        this.router.delete(`${this.path}/:id`, this.deleteMiddlewares(), this.user.deleteDocument);
    }

    postMiddlewares() {
        return [
            check('nombre', 'Es necesario que ingrese su nombre').notEmpty(),
            check('email', 'El email no es válido').isEmail(),
            check('email').custom(emailExiste),
            check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
            validarCampos
        ]
    }

    putMiddlewares() {
        return [
            validarJWT,
            check('id', 'Debe ingresar un id valido de mongo').isMongoId(),
            check('id').custom(idUsuarioExiste),
            check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
            validarCampos
        ]
    }

    deleteMiddlewares() {
        return [
            validarJWT,
            check('id', 'Debe ingresar un id valido de mongo').isMongoId(),
            check('id').custom(idUsuarioExiste),
            esAdminRol,
            validarCampos
        ]
    }
}

