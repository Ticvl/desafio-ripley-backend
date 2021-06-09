import mongoose from 'mongoose';

const transferenciaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    destinatario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'destinatario',
        required: true
    },
    monto: {
        type: Number,
        required: true,
        min: 1
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

const Transferencia = mongoose.model('transferencia', transferenciaSchema);

module.exports = Transferencia;