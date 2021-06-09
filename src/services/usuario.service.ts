const usuarioModel = require('../models/usuario.schema');

export class UsuarioService {

    constructor() {}

    crearUsuario = async (correo: string, password: string) => {
        
        const usuario = new usuarioModel({
            correo: correo,
            password: password
        });

        const result = usuario.save();
        return result;
    }
}