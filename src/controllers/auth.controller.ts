import { NextFunction, Request, Response, Router } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    
    public router = Router();
    private authService = new AuthService();

    constructor() { 
        this.inicializarRutas();
    }

    private inicializarRutas() {
        this.router.post('/login', this.login);
        this.router.post('/registrar', this.registrar);
    }

    private login = async (req: Request, res: Response, next: NextFunction) => {
        console.log('AuthController - login');
        return await this.authService.login(req, res , next);
    }

    private registrar = async (req: Request, res: Response, next: NextFunction) => {
        console.log('AuthController - registro')
        return await this.authService.registrarUsuario(req, res , next);
    }
    
}