import { Request, Response } from "express";
import { Categoria } from "../model/CategoriaModel";
import { UserRequest } from "../types/UserRequest";
import { Document } from "../interfaces/Document";

export class Category implements Document {

    public async getDocument(req: Request, res: Response) {
        const { limite = 20, desde = 0 } = req.query;

        const [total, categorias] = await Promise.all([
            Categoria.countDocuments({ estado: true }),
            Categoria.find({ estado: true }).populate('responsable', 'nombre').limit(Number(limite)).skip(Number(desde))
        ]);

        res.json({
            total,
            categorias
        });
    }

    public async postDocument(req: Request, res: Response) {
        const { nombre, estado } = req.body;
        const responsable = (<UserRequest>req).usuario._id;

        const categoriaExiste = await Categoria.findOne({ nombre: nombre.toUpperCase() });

        if (categoriaExiste) {
            return res.status(400).json({
                msg: `La categoría ${nombre} ya existe`
            });
        }

        const categoria = new Categoria({ nombre: nombre.toUpperCase(), estado, responsable });

        await categoria.save();

        res.json({
            categoria
        });
    }

    public async putDocument(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre } = req.body;
        const responsable = (<UserRequest>req).usuario._id;

        const existeCategoria = await Categoria.findOne({ nombre: nombre.toUpperCase() });

        if (existeCategoria) {
            return res.status(400).json({
                msg: `La categoría ${nombre} ya existe en la base de datos`
            })
        }

        const categoria = await Categoria.findByIdAndUpdate(id, { nombre: nombre.toUpperCase(), responsable }, { new: true }).populate('responsable', 'nombre');

        res.json({
            msg: 'Categoría actualizada',
            categoria,
        });
    }

    public async deleteDocument(req: Request, res: Response) {
        const { id } = req.params;

        const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true }).populate('responsable', 'nombre');

        res.json({
            msg: 'Categoría borrada',
            categoria
        });
    }
}
