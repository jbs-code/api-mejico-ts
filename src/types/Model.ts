import { Types } from "mongoose";

export interface IUser {
    nombre: string;
    email: string;
    password: string;
    rol?: string;
    estado: boolean;
  }

export interface ICategoria {
    nombre: string;
    estado: boolean;
    responsable: Types.ObjectId;
}

export interface Url {
  url: string;
  public_id: string;
}

export interface IProducto {
  nombre: string;
  categoria: Types.ObjectId;
  descripcion: string;
  costo: number;
  disponibilidad: boolean;
  responsable: Types.ObjectId;
  urlImg: Url;
  estado: boolean;
}