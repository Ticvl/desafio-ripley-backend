import { Router, NextFunction, Response, Request } from "express";
import { TransferenciaService } from "../services/transferencia.service";

export class TransferenciaController {

    public router = Router();
    private transferenciaService = new TransferenciaService();

    constructor() {
        this.iniciarRutas();
    }

    private iniciarRutas() {
        this.router.post('/transferir', this.transferirMonto);
        this.router.get('/obtener/:id', this.obtenerTransferenciasPorUsuario);
    }

    public transferirMonto = async (req: Request, res: Response, next: NextFunction) => {  
        console.log('TransferenciaController - transferirMonto');
        return await this.transferenciaService.transferirMonto(req, res, next);
    }

    public obtenerTransferenciasPorUsuario = async (req: Request, res: Response, next: NextFunction) => {
        console.log('TransferenciaController - obtenerTransferenciaPorUsario');
        return await this.transferenciaService.obtenerTransferenciasPorUsuario(req, res, next);
    }

}
