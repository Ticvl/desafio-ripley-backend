const usuarioModel = require('../models/usuario.schema');

export class AuthRepository {
    
    constructor() { }

    public login = async(correo: string) => {
        try {
            const user = await usuarioModel.findOne({ correo: correo });
            return user;
        }catch(error) {
            console.log('Repository - ', error);
        }
    }
}