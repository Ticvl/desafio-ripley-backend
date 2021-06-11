const transferenciaModel = require('../models/transferencia.schema');

export class TransferenciaRepository {

    constructor() {}

    public transferir = async (usuario: string, destinatario: any, monto: number) => {
        console.log('Repository - transferir');
        try {
            const estadoTransferencia = new transferenciaModel({
                usuario: usuario,
                destinatario: destinatario,
                monto: monto
            });            
            const result = await estadoTransferencia.save();
            return result;
        }
        catch(error) {
            console.log(error);
        }
    }

    public obtenerTransferenciaPorUsuario = async (id: string) => {
        console.log('Repository - obtenerTransferenciaPorUsuario');
        throw new Error('este es un error');

        /*
        try {
            const transferencia = await transferenciaModel
                .find({"usuario": {"$eq": id }})
                .populate("destinatario");        
            return transferencia;            
        }
        catch(error) {
            console.log('error service');
        }
        */
    }

 
}