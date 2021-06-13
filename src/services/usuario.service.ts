import { NextFunction, Response, Request } from "express";
import { UsuarioRepository } from "../repositorys/usuario.reposity";

const bcrypt = require('bcrypt');

export class UsuarioService {

    private usuarioRepository = new UsuarioRepository();

    constructor() {}

    public crearUsuario = async (req: Request, res: Response, next: NextFunction) => {

        if(!req.body.correo || !req.body.password || !req.body.rut) {            
            res.status(422).send({ error: 'Parámetros incompletos.' });
            return;
        }

        const usuario = await this.usuarioRepository.existeUsuario(req.body.rut);
        if(usuario) {
            res.status(409).send({ error: 'El recurso ya existe.' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        return await this.usuarioRepository.crearUsuario(req.body.correo, hashPassword, req.body.rut)
            .then((result) => {
                res.status(200).send({
                    _id: result._id,
                    correo: result.correo,
                    rut: result.rut
                });
            })
            .catch((error) => {
                next(error);
            });
    }
}