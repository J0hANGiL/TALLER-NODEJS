const express = require('express');
const Curso = require('../models/usuario_model');
const joi = require('@hapi/joi');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    res.json('respuesta a peticion GET de USUARIOS funcionando correctamente...');
});

module.exports = ruta;
