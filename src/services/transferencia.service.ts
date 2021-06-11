import { NextFunction, Response, Request } from "express";
import { TransferenciaRepository } from "../repositorys/transferencia.repository";

export class TransferenciaService {

    private transferenciaRepository = new TransferenciaRepository();

    constructor() {}

    public transferirMonto = async (req: Request, res: Response, next: NextFunction) => {
        console.log('TransferenciaService - transferirMonto'); 
        if(!req.body.usuario || !req.body.destinatario || !req.body.monto) {
            res.status(422).send({ error: 'Campos incompletos' });
            return;
        }
        return await this.transferenciaRepository.transferir(req.body)
            .then((result) => {
                res.status(201).send(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    public obtenerTransferenciasPorUsuario = async (req: Request, res: Response, next: NextFunction) => {
        console.log('TransferenciaService - obtenerTransferenciaPorUsario');
        if(!req.params.id) {
            res.status(422).send({ error: 'Parámetros incompletos.' });
            return;
        }
        return await this.transferenciaRepository.obtenerTransferenciaPorUsuario(req.params.id)
            .then((result) => {
                if(!result) {
                    res.status(404).send({ mensaje : 'No tienes transferencias asociadas.'});
                }
                res.status(200).send(result);
            })
            .catch((error) => {
                next(error);
            }); 
    }

 
}