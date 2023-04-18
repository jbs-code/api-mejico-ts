import { Schema , model } from "mongoose";
import { ICategoria } from "../types/Model";

const categoriaSchema = new Schema<ICategoria>({
    nombre: {
        type: String,
        unique: true,
        required: [true, "El nombre es necesario"]
    },
    estado: {
        type: Boolean,
        default: true,
    },
    responsable: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
    }
});

categoriaSchema.methods.toJSON = function(){
    const { __v, ...resto } = this.toObject();
    return resto;
}

export const Categoria = model<ICategoria>('Categoria', categoriaSchema);
