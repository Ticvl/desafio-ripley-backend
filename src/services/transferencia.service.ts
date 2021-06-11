import { NextFunction, Response, Request } from "express";
import { TransferenciaRepository } from "../repositorys/transferencia.repository";

export class TransferenciaService {

    private transferenciaRepository = new TransferenciaRepository();

    constructor() {}

    public transferirMonto = async (req: Request, res: Response, next: NextFunction) => {
        console.log('Service - transferirMonto');
        const transferencia = req.body;        
        return await this.transferenciaRepository
            .transferir(transferencia.usuario, transferencia.destinatario, transferencia.monto)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.send(error);
            });
    }

    public obtenerTransferenciasPorUsuario = async (req: Request, res: Response, next: NextFunction) => {
        console.log('Service - obtenerTransferenciaPorUsario');
        const usuario = req.params.id;
        return await this.transferenciaRepository.obtenerTransferenciaPorUsuario(usuario)
            .then((result) => {
                if(!result) {
                    res.status(404).send({ mensaje : 'No tienes transferencias asociadas.'});
                }
                res.status(200).send(result);
            })
            .catch((error) => {
                console.log('Error -> ', error);
                return error;
            }); 
    }

 
}