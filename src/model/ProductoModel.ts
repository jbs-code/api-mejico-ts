import { Schema, model } from 'mongoose';
import { IProducto } from '../types/Model';

const productoSchema = new Schema<IProducto>({
    nombre: String,
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' },
    descripcion: String,
    costo: Number,
    disponibilidad: { type: Boolean, default: true },
    responsable: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    urlImg: {
        url: String,
        public_id: String
    },
    estado: { type: Boolean, default: true }
});

productoSchema.methods.toJSON = function () {
    const { __v, estado, ...resto } = this.toObject();
    return resto;
}

//Middlewares para que nos de el populate despues del save();
productoSchema.post('save', function (doc, next) {
    doc.populate('categoria', 'nombre').then(function () {
        next();
    });
});

productoSchema.post('save', function (doc, next) {
    doc.populate('responsable', 'nombre').then(function () {
        next();
    });
});

export const Producto = model<IProducto>('Producto', productoSchema);
