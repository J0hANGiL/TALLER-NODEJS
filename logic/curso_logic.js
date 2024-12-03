const curso = require('/../models/curso_model');

async function crearCurso(body) {
    let usuario = new Usuario({
        titulo: body.titulo,
        descripcion: body.descripcion,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    });
    return await usuario.save();
}

async function actualizarCurso(id, body) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    }, { new: true });
    return curso;
}

async function desactivarcurso(id) {
    let curso = await Usuario.findByAndUpdate(id, {
        $set: {
            estado: false
        }
    }, { new: true });
    return curso;
}

async function listarCursosActivos(){
    let cursos = await curso.find({"estado": true});
    return cursos;
}

module.exports = {
    crearCurso,
    actualizarCurso,
    desactivarcurso,
    listarCursosActivos
}