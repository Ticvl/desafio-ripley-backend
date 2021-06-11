import { json, NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthMiddleware {

    private authService = new AuthService();

    constructor() { }

    public auth = async (req: Request, res: Response, next: NextFunction) => {
        
        const jwtToken = req.header('Authorization');
        if(!jwtToken) {
            return res.status(401).send('Acceso denegado. Favor enviar un token.');
        }
        try {
            const payload = await this.authService.verificarJWT(jwtToken);
            next();
        } catch (error) {
            res.status(400).send('Acceso denegado. Token inválido');
        }

    }
}