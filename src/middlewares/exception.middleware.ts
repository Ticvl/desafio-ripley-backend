import { NextFunction, Response, Request } from "express";
import { AppException } from "../exceptions/app.exception";

export class ExceptionMiddleware {

    constructor() { }

    public exception = (error: AppException, req: Request, res: Response, next: NextFunction) => {
        
        const status = error.codigo || 500;
        const message = error.mensaje || 'Algo salió mal.';

        res.status(status).send(message);
    }
}