import { AppException } from "../exceptions/app.exception";

const usuarioModel = require('../models/usuario.schema');

export class UsuarioRepository {

    constructor() {}

    crearUsuario = async (correo: string, password: string) => {
        console.log('UsuarioRepository - crearUsuario');
        try {        
            const usuario = new usuarioModel({
                correo: correo,
                password: password
            });
            return await usuario.save();
        }
        catch(error) {
            throw new AppException(500, 'Error al intentar guardar información');
        }
    }
}