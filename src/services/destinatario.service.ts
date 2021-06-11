import { NextFunction, Response, Request } from "express";
import { DestinatarioRepository } from "../repositorys/destinatario.repository";

const destinatarioModel = require('../models/destinatario.schema');

export class DestinatarioService {   

    private destinatarioRepository = new DestinatarioRepository();

    constructor() { }

    public guardarDestinatario = async (req: Request, res: Response, next: NextFunction) => {
        if(!req.body.usuario || !req.body.nombre || !req.body.rut || !req.body.correo
            || !req.body.numeroTelefono || !req.body.bancoDestino || !req.body.tipoCuenta || !req.body.numeroCuenta) {
            res.status(422).send({ error: 'Campos incompletos' });
            return;
        }
        return await this.destinatarioRepository.guardarDestinatarios(req.body)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((error) => {
                next(error);
            });
    }

    public obtenerDestinatarios = async (req: Request, res: Response, next: NextFunction) => {
        if(!req.params.id) {
            res.status(422).send({ error: 'Parámetros incompletos.' });
            return;
        }
        return await this.destinatarioRepository.obtenerDestinatarios(req.params.id)
            .then((result) => {
                if(!result){
                    res.status(404).send("No existen destinatarios asociados");
                }
                res.status(200).send(result);
            })
            .catch((error) => {
                next(error);
            });
    }
}
