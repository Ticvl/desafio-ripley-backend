import { Router, NextFunction, Response, Request } from "express";
import { TransferenciaService } from "../services/transferencia.service";

export class Transferencia {

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
        let data = req.body;        
        return await this.transferenciaService
            .transferir(data.usuario, data.destinatario, data.monto)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        });
    }

    public obtenerTransferenciasPorUsuario = async (req: Request, res: Response, next: NextFunction) => {
        return await this.transferenciaService.obtenerTransferenciaPorUsuario(req.params.id)
        .then((result) => {
            if(!result) {
                res.status(404).send({ mensaje : 'No tienes transferencias asociadas.'});
            }
            res.status(200).send(result);
        })
        .catch((error) => {
            console.log('error controller');
            return error;
        }); 
    }

}
