import { NextFunction, Request, Response } from "express";
import { CategoryRequest } from "../types/CategoryRequest";
import { Categoria } from "../model/CategoriaModel";

export const categoriaPorNombre = async(req: Request, res: Response, next: NextFunction) => {
    const nombre = req.params.categoria;

    const categoria = await Categoria.findOne({nombre: nombre.toUpperCase(), estado: true});

    if(!categoria){
        return res.status(400).json({
            msg: `No se encontró la categoría ${nombre}.`
        });
    }

    (<CategoryRequest>req).categoriaId = categoria._id.toString();

    next();
}
