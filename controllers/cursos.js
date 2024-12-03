const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();

ruta.get('/', (req, res) => {
    res.json('respuesta a peticion GET de CURSOS funcionando correctamente...');
});

//Funcion asincrona para crear un objeto de tipo usuario
async function crearCurso(body) {
    let usuario = new Usuario({
        titulo: body.titulo,
        descripcion: body.descripcion,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    });
    return await usuario.save();
}

//Endpoint de tipo POST para el recurso CURSO
ruta.post('/', (req, res) => {
    let resultado = crearCurso(req.body);

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
    let resultado = actualizarCurso(req.params.id, req.body);
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
    let resultado = desactivarCurso(req.params.id);
    resultado.then(curso =>{
        res.json(curso)
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});

module.exports = ruta;