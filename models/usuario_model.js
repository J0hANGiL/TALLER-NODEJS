const mongoose = require ('mongoose')

const usuarioSchema = new mongoose.Schema({
    email: {
        type:string,
        required: true
    },
    nombre: {
        type:string,
        required: true
    },
    password: {
        type:string,
        required: true
    },
    estado: {
        type:Boolean,
        default: true
    },
    imagen: {
        type:string,
        required: false
    }
});

module.exports = mongoose.model('usuario',usuarioSchema);