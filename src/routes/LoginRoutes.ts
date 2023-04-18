import { Router } from 'express';
import { login } from '../controllers/login';
import { Routes } from '../interfaces/Routes';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares';

export class LoginRoutes implements Routes{
    public path = '/login';
    public router = Router();

    constructor(){
        this.init();
    }

    init(){
        this.router.post(this.path, this.postMiddlewares(), login);
    }

    postMiddlewares() {
        return [
            check('email', 'Debe ingresar un email válido').isEmail(),
            check('password', 'EL password es obligatorio').not().isEmpty(),
            validarCampos,
        ]
    }

}