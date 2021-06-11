import { Router, NextFunction, Response, Request } from "express";
import { DestinatarioService } from '../services/destinatario.service';

export class DestinatarioController {

    public router = Router();
    private destinatarioService = new DestinatarioService();

    constructor() {
        this.iniciarRutas();
    }

    private iniciarRutas() {
        this.router.post('/guardar', this.guardarDestinatario);
        this.router.get('/listado/:id', this.obtenerDestinatarios);
    }

    private guardarDestinatario = async (req: Request, res: Response, next: NextFunction) => {
        return await this.destinatarioService.guardarDestinatario(req, res, next);
    }

    private obtenerDestinatarios = async (req: Request, res: Response, next: NextFunction) => {
        return await this.destinatarioService.obtenerDestinatarios(req, res, next);
    }

}



