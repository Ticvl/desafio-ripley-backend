const usuarioModel = require('../models/usuario.schema');

export class UsuarioRepository {

    constructor() {}

    crearUsuario = async (correo: string, password: string) => {
        try {        
            const usuario = new usuarioModel({
                correo: correo,
                password: password
            });
            const result = usuario.save();
            return result;
        }
        catch(error) {
            
        }
    }
}