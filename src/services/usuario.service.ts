import { NextFunction, Response, Request } from "express";
import { UsuarioRepository } from "../repositorys/usuario.reposity";

const bcrypt = require('bcrypt');

export class UsuarioService {

    private usuarioRepository = new UsuarioRepository();

    constructor() {}

    public crearUsuario = async (req: Request, res: Response, next: NextFunction) => {

        if(!req.body.correo || !req.body.password) {            
            res.status(422).send({ error: 'Parámetros incompletos.' });
            return;
        }

        const usuario = await this.usuarioRepository.existeUsuario(req.body.correo);
        if(usuario) {
            res.status(500).send({ error: 'Error al intentar guardar información.' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        return await this.usuarioRepository.crearUsuario(req.body.correo, hashPassword)
            .then((result) => {
                res.status(200).send({
                    _id: result._id,
                    correo: result.correo
                });
            })
            .catch((error) => {
                next(error);
            });
    }
}