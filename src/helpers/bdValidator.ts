import { Categoria } from "../model/CategoriaModel";
import { Producto } from "../model/ProductoModel";
import { Usuario } from "../model/UsuarioModel";

export const emailExiste = async (email = '') => {
    const emailExist = await Usuario.findOne({ email });

    if (emailExist) {
        throw new Error(`El email ${email} ya existe.`);
    }
}

export const idUsuarioExiste = async (id = "") => {
    const uid = await Usuario.findOne({_id: id, estado: true});

    if (!uid) {
        throw new Error(`El id ${id} no está disponible en la base de datos.`);
    }
}

export const idCategoriaExiste = async (id = '') => {
    const uid = await Categoria.findOne({_id: id, estado: true});

    if (!uid) {
        throw new Error(`El id ${id} no está disponible en la base de datos.`);
    }
}

export const idProductoExiste = async (id = '') => {
    const uid = await Producto.findOne({_id: id, estado: true});
    
    if (!uid) {
        throw new Error(`El id ${id} no está disponible en la base de datos.`);
    }
}

// export const idRolExiste = async (id = '') => {
//     const uid = await Rol.findOne({_id: id, estado: true});

//     if (!uid) {
//         throw new Error(`El id ${id} no está disponible en la base de datos.`);
//     }
// }