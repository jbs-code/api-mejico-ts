import { Request, Response } from "express";
import { Document } from "../interfaces/Document";
import { Usuario } from '../model/UsuarioModel';
import bcrypt from 'bcrypt';
import { IUser } from "../types/Model";

//Revisar...
export class User implements Document {
    public async getDocument(req: Request, res: Response) {
        const query = { estado: true };
        const { limite = 20, desde = 0 } = req.query;

        //optimizamos nuestras tareas asíncronas con Promise.all
        const [total, users] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query).
                limit(Number(limite)).
                skip(Number(desde))
        ]);

        res.json({
            total,
            users
        });
    }

    public async postDocument(req: Request, res: Response) {
        const usuario: IUser = {
            nombre: req.body.nombre.toUpperCase(),
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            estado: req.body.estado,
            rol: req.body.rol?.toLowerCase()
        }

        const user = new Usuario(usuario);

        //Encriptamos password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(usuario.password, salt);

        await user.save();

        res.json({
            user
        });
    }

    public async putDocument(req: Request, res: Response) {
        const { id } = req.params;

        const { _id, nombre, email, password, estado, rol, ...resto } = req.body;

        if (password) {//encriptamos la nueva password en caso de que sea enviada una
            const salt = bcrypt.genSaltSync();
            resto.password = bcrypt.hashSync(password, salt);
        }

        if (rol) {
            resto.rol = rol.toLowerCase();
        }

        const user = await Usuario.findByIdAndUpdate(id, resto, { new: true });//new: true es para obtener el user actualizado

        res.json({
            user
        });
    }

    public async deleteDocument(req: Request, res: Response) {
        const { id } = req.params;

        const user = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });
      
        res.json({
          user
        });
    }

}