const transferenciaModel = require('../models/transferencia.schema');
const destinatarioModel = require('../models/destinatario.schema');

export class TransferenciaService {

    constructor() {}

    public transferir = async (usuario: string, destinatario: any, monto: number) => {
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
            return;
        }
    }

    public obtenerTransferenciaPorUsuario = async (id: string) => {
        try {
            const transferencia = await transferenciaModel
                .find({"usuario": {"$eq": id }})
                .populate("destinatario");        
            return transferencia;            
        }
        catch(error) {
            console.log('error service');
            return new Error('error');
        }
    }

 
}