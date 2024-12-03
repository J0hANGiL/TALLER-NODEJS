const mongoose = require ('mongoose')

const cursoSchema = new mongoose.Schema({
    titulo: {
        type:string,
        required: true
    },
    descripcion: {
        type:string,
        required: false
    },
    estado: {
        type:Boolean,
        default: true
    },
    imagen: {
        type:string,
        required: false
    },
    alumnos: {
        type:number,
        default: 0
    },
    calificacion: {
        type: number,
        required: 0
    },
});

module.exports = mongoose.model('Curso',cursoSchema);