import mongoose from 'mongoose';

const destinatarioSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    numeroTelefono: {
        type: String,
        required: true
    },
    bancoDestino: {
        type: String,
        required: true
    },
    tipoCuenta: {
        type: String,
        required: true
    },
    numeroCuenta: {
        type: String,
        required: true
    }
});

const Destinatario = mongoose.model('destinatario', destinatarioSchema);

module.exports = Destinatario;