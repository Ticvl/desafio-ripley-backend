import { NextFunction, Response, Request } from "express";
import { DestinatarioRepository } from "../repositorys/destinatario.repository";

const destinatarioModel = require('../models/destinatario.schema');

export class DestinatarioService {   

    private destinatarioRepository = new DestinatarioRepository();

    constructor() { }

    public guardarDestinatario = async (req: Request, res: Response, next: NextFunction) => {
        let data = req.body;
        return await this.destinatarioRepository
            .guardarDestinatarios(data.usuario,
                                data.nombre, 
                                data.rut, 
                                data.correo, 
                                data.numeroTelefono,
                                data.bancoDestino, 
                                data.tipoCuenta, 
                                data.numeroCuenta)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error);
        });
    }

    public obtenerDestinatarios = async (req: Request, res: Response, next: NextFunction) => {
        return await this.destinatarioRepository.obtenerDestinatarios(req.params.id)
        .then((result) => {
            if(!result){
                res.status(404).send("No existen destinatarios asociados");
            }
            res.status(200).send(result);
        })
        .catch((error) => {
            console.log(error);
        });
    }
}
