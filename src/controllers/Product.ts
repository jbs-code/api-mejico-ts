import { Request, Response } from "express";
import { Document } from "../interfaces/Document";
import { Producto } from "../model/ProductoModel";
import { UserRequest } from "../types/UserRequest";
import { subirImagen } from "../helpers";

export class Product implements Document {

    public async getDocument(req: Request, res: Response) {
        const { limite = 20, desde = 0 } = req.query;

        const [total, productos] = await Promise.all([
            Producto.countDocuments({ estado: true }),
            Producto.find({ estado: true }).limit(Number(limite)).skip(Number(desde)).populate('responsable', 'nombre')
        ]);

        res.json({
            total,
            productos
        });
    }

    public async postDocument(req: Request, res: Response) {
        const { nombre, categoria, descripcion, costo, disponibilidad, url } = req.body;
        const responsable = (<UserRequest>req).usuario._id;

        const urlImg = {
            url: '',
            public_id: ''
        }

        if (url) {
            const imagen = await subirImagen(url);
            const publicId = imagen.public_id.split('Mejico/');

            urlImg.url = imagen.secure_url;
            urlImg.public_id = publicId[1] || '';
        }

        const producto = new Producto({
            nombre: nombre.toUpperCase(),
            categoria,
            descripcion,
            costo,
            disponibilidad,
            responsable,
            urlImg
        });

        await producto.save();

        res.json({
            producto
        });
    }

    //Por el hecho de que necesitamos el puclic_id de la imagen que ya tenemos en BBDD para 
    //hacer la actualización en caso de que nos manden una url; aprovechamos esa llamada para hacer
    //todas las actulizaciones. Es por esto que utilizamos el producto.save() en lugar de producto.findByIdAndUpdate()
    public async putDocument(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, categoria, descripcion, costo, disponibilidad, url } = req.body;
        const responsable = (<UserRequest>req).usuario._id;

        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(500).json({
                msg: "Algo salió mal, comuníquese con el administrador."
            });
        }

        if (url) {
            const imagen = await subirImagen(url, producto.urlImg.public_id);
            producto.urlImg.url = imagen.secure_url;
        }

        producto.nombre = nombre.toUpperCase() || producto.nombre;
        producto.categoria = categoria || producto.categoria;
        producto.descripcion = descripcion || producto.descripcion;
        producto.costo = costo || producto.costo;
        producto.disponibilidad = disponibilidad;
        producto.responsable = responsable;

        const productoActualizado = await producto.save();

        res.json({
            productoActualizado
        });
    }

    public async deleteDocument(req: Request, res: Response) {
        const { id } = req.params;

        const producto = await Producto.findByIdAndUpdate(id, { estado: false })
            .populate('categoria', 'nombre')
            .populate('responsable', 'nombre');

        res.json({
            msg: 'Producto borrado',
            producto
        });
    }
}