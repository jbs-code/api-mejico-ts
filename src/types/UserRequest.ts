import { Request } from "express"
import { Document } from "mongodb";

export interface UserRequest extends Request {
  usuario: Document;
}
