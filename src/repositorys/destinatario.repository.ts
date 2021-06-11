const destinatarioModel = require('../models/destinatario.schema');

export class DestinatarioRepository {   

    constructor() { }

    guardarDestinatarios = async (usuario: string,
                                nombre: string, 
                                rut: string,  
                                correo: string, 
                                numeroTelefono: string, 
                                bancoDestino: string, 
                                tipoCuenta: string, 
                                numeroCuenta: string) => {
        try {
            const destinatario = new destinatarioModel({
                usuario: usuario,
                nombre: nombre,
                rut: rut,
                correo: correo,
                numeroTelefono: numeroTelefono,
                bancoDestino: bancoDestino,
                tipoCuenta: tipoCuenta,
                numeroCuenta: numeroCuenta
            });        
            const result = await destinatario.save();
            return result;
        }
        catch(error) {
            throw new Error('error');
        }    
    }

    obtenerDestinatarios = async (id: string) => {
        try {
            console.log('entramos aqui', id);
            const listaDestinatarios = await destinatarioModel.find({ "usuario": { "$eq" : id } });
            return listaDestinatarios;
        }
        catch(error) {
            console.log('error destinatario service');
        }        
    }
}