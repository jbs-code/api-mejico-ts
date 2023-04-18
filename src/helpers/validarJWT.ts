import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../model/UsuarioModel';
import { JwtPayload } from '../types/JwtPayload';
import { UserRequest } from '../types/UserRequest';

export const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');

    //Validamos que el token sea ingresado
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición - Debe iniciar sesión"
        });
    }

    //validamos el token y buscamos a usuario
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: "No existe el usuario en la Base de datos - Token no válido"
            });
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Usuario sin permisos - estado: false"
            });
        }

        //Agregamos al request los datos del usuario
        (<UserRequest>req).usuario = usuario;//Casteamos el request

        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Token no válido"
        });
    }
}
