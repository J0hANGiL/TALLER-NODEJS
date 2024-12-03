const express = require('express');
const Curso = require('../models/curso_logic');
const ruta = express.Router();

ruta.get('/', (req, res) => {
    let resultado = logic.listarCursosActivos();
    resultados.then(cursos =>{
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    })
    res.json('respuesta a peticion GET de CURSOS funcionando correctamente...');
});

//Funcion asincrona para crear un objeto de tipo usuario
async function crearCurso(body) {
    let curso = new Curso ({
        titulo: body.titulo,
        descripcion: body.descripcion,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    });
    return await curso.save();
}

//Endpoint de tipo POST para el recurso CURSO
ruta.post('/', (req, res) => {
    let resultado = logic.crearCurso(req.body);

    resultado.then(user => {
        res.json({
            curso
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});

async function actualizarCurso(id, body) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    }, { new: true });
    return curso;
}

ruta.put('/:id', (req, res) => {
    let resultado = logic.actualizarCurso(req.params.id, req.body);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});

async function desactivarcurso(id) {
    let curso = await Usuario.findByAndUpdate(id, {
        $set: {
            estado: false
        }
    }, { new: true });
    return curso;
}

ruta.delete('/:id', (req, res) => {
    let resultado = logic.desactivarCurso(req.params.id);
    resultado.then(curso =>{
        res.json(curso)
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});

async function listarCursosActivos(){
    let cursos = await curso.find({"estado": true});
    return cursos;
}


module.exports = ruta;