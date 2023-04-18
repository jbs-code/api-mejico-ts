import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/UserRequest";

export const esAdminRol = (req: Request, res: Response, next: NextFunction) => {
    const rol = (<UserRequest>req).usuario.rol;//Casteamos el request

    if(rol !== 'administrador'){
        return res.status(401).json({
            msg: 'El usuario debe ser administrador para realizar esta operación'
        });
    }

    next();
}
