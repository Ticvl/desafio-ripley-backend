import { AppException } from "../exceptions/app.exception";

const transferenciaModel = require('../models/transferencia.schema');

export class TransferenciaRepository {

    constructor() {}

    public transferir = async (transferencia: any) => {
        console.log('TransferenciaRepository - transferir');
        try {
            const estadoTransferencia = new transferenciaModel({ ...transferencia });            
            return await estadoTransferencia.save();
        }
        catch(error) {
            throw new AppException(500, 'Error al intentar guardar información');
        }
    }

    public obtenerTransferenciaPorUsuario = async (idUsuario: string) => {
        console.log('TransferenciaRepository - obtenerTransferenciaPorUsuario');
        try {
            const transferencia = await transferenciaModel
                .find({"usuario": {"$eq": idUsuario }})
                .populate("destinatario");        
            return transferencia;            
        }
        catch(error) {
            throw new AppException(500, 'Error al intentar obtener información');
        }
    }

 
}