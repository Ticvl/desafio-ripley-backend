import { NextFunction, Request, Response, Router } from "express";
import { BancoService } from "../services/banco.service";

export class BancoController {

    public router = Router();
    private bancoService = new BancoService();

    constructor() { 
        this.inicializarRutas();
    }

    inicializarRutas() {
        this.router.get('/listado-bancos', this.obtenerBancos);
    }

    private obtenerBancos = async (req: Request, res: Response, next: NextFunction) => {
        console.log('BancoController - obtenerBancos');
        return await this.bancoService.obtenerBancos(req, res, next);
    }
}