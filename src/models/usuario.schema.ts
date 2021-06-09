import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({    
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;