import { AppException } from "../exceptions/app.exception";

const usuarioModel = require('../models/usuario.schema');

export class AuthRepository {
    
    constructor() { }

    public login = async(correo: string) => {
        console.log('AuthRepository - login');
        try {
            const user = await usuarioModel.findOne({ correo: correo });
            return user;
        } catch(error) {
            throw new AppException(500, 'Error al intentar obtener información');
        }
    }
}