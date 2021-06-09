import { Router, NextFunction, Response, Request } from "express";
import { UsuarioService } from "../services/usuario.service";


export class Usuario {

    public router = Router();
    private usuarioService = new UsuarioService();

    constructor() {
        this.inicializarRutas();
    }

    inicializarRutas() {
        this.router.post('/crear', this.crearUsuario);
    }

    public crearUsuario = async (req: Request, res: Response, next: NextFunction) => {
        return await this.usuarioService.crearUsuario(req.body.correo, req.body.password)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
    }
}