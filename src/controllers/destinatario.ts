import { Router, NextFunction, Response, Request } from "express";
import { DestinatarioService } from '../services/destinatario.service';

export class Destinatario {

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
        let data = req.body;
        return await this.destinatarioService
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

    private obtenerDestinatarios = async (req: Request, res: Response, next: NextFunction) => {
        return await this.destinatarioService.obtenerDestinatarios(req.params.id)
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



