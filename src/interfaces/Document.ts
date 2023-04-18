import { Request, Response } from "express";

export abstract class Document{
    abstract getDocument(req: Request, res: Response): void;
    abstract postDocument(req: Request, res: Response): void;
    abstract putDocument(req: Request, res: Response): void;
    abstract deleteDocument(req: Request, res: Response): void;
}