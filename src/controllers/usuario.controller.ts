import { Router, NextFunction, Response, Request } from "express";
import { UsuarioService } from "../services/usuario.service";


export class UsuarioController {

    public router = Router();
    private usuarioService = new UsuarioService();

    constructor() {
        this.inicializarRutas();
    }

    inicializarRutas() {
        this.router.post('/crear', this.crearUsuario);
    }

    public crearUsuario = async (req: Request, res: Response, next: NextFunction) => {
        return await this.usuarioService.crearUsuario(req, res , next);
    }
}