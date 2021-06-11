import { AppException } from "../exceptions/app.exception";

const destinatarioModel = require('../models/destinatario.schema');

export class DestinatarioRepository {   

    constructor() { }

    guardarDestinatarios = async (destinatario: any) => {
        console.log('DestinatarioRepository - guardarDestinatarios');
        try {
            const nuevoDestinatario = new destinatarioModel({ ...destinatario });        
            return await nuevoDestinatario.save();
        }
        catch(error) {
            throw new AppException(500, 'Error al intentar guardar información');
        }    
    }

    obtenerDestinatarios = async (id: string) => {
        console.log('DestinatarioRepository - obtenerDestinatarios');
        try {
            return await destinatarioModel.find({ "usuario": { "$eq" : id } });
        }
        catch(error) {
            throw new AppException(500, 'Error al intentar obtener información');
        }        
    }
}