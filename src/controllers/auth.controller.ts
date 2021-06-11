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
    }

    private login = async (req: Request, res: Response, next: NextFunction) => {
        return await this.authService.login(req, res , next);
    }
    
}