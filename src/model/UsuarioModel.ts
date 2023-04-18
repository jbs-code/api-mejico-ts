import { Schema, model } from 'mongoose';
import { IUser } from '../types/Model';


const usuarioSchema = new Schema<IUser>({
  nombre:  String,
  email: String,
  password: String,
  rol: {type: String, default: "usuario"},
  estado: {type: Boolean, default: true},
  
});

usuarioSchema.methods.toJSON = function(){
  const { password, estado, __v, ...resto } = this.toObject();
  return resto;
}

export const Usuario = model<IUser>('Usuario', usuarioSchema);
