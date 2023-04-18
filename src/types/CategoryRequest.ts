import { Request } from "express"

export interface CategoryRequest extends Request{
    categoriaId: string;
}