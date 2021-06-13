import { AppException } from "../exceptions/app.exception";

const usuarioModel = require('../models/usuario.schema');

export class UsuarioRepository {

    constructor() {}

    crearUsuario = async (correo: string, password: string, rut: string) => {
        console.log('UsuarioRepository - crearUsuario');
        try {        
            const usuario = new usuarioModel({
                correo: correo,
                password: password,
                rut: rut
            });
            return await usuario.save();
        }
        catch(error) {
            throw new AppException(500, 'Error al intentar guardar información');
        }
    }

    existeUsuario = async (rut: string) => {
        try {
            return await usuarioModel.findOne({ rut: rut });
        } catch(error) {
            throw new AppException(500, 'Error al intentar obtener información');
        }

    }
}