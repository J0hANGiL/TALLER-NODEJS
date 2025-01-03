const express = require('express');
const Curso = require('../models/usuario_logic');
const joi = require('@hapi/joi');

ruta.get('/', (req,res)=>{
    let resultado = logic.listaUsuariosActivos();
    resultado.then(usuarios =>{
        res.json(usuarios)
    }).catch(err =>{
        res.status(400).json(
            {
                err
            }
        )
    })
    res.json('respuesta a peticion GET de USUARIOS funcionando correctamente...');
});

//validaciones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[A-Za-záéíóú ]{3,30}$/),

    password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/),

    email: Joi.string()
    .email({minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } }) 
});

//Endpoint de tipo POST para el recurso USUARIOS
ruta.post('/', (req,res)=>{
    let body = req.body;

    const {error, value} = logic.schema.validate({nombre: body.nombre, email: body.email});
    if(!error){
        let resultado = logic.crearUsuario(body);

        resultado.then( user =>{
            res.json({
                valor: user
            })
        }).catch( err =>{
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }
});

//Funcion asincrona para crear un objeto de tipo usuario
async function crearUsuario(body){
    let usuario = new Usuario({
        email     : body.email,
        nombre    : body.nombre,
        password  : body.password
    });
    return await usuario.save();
}

//endpoint de tipo PUT para actualizar los datos del usuario
ruta.put('/:email', (req, res) => {
    const {error, value} = logic.schema.validate({nombre: req.body.nombre });
    if(!error){
        let resultado = logic.actualizarUsuario(req.params.email, req.body);
        resultado.then(valor =>{
            res.json({
                valor
            })
        }).catch(err => {
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }
});

async function actualizarUsuario(email, body){
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            nombre : body.nombre,
            password : body.password
        }
    },{new: true});
    return usuario;
}

//endpoint de tipo delete para el recurso USUARIOS 
ruta.delete('/:email', (req, res) => {
        let resultado = logic.desactivarUsuario(req.params.email);
        resultado.then(valor =>{
            res.json({
                valor
            })
        }).catch(err => {
            res.status(400).json({
                err
            })
        });
});

async function desactivarUsuario(email){
    let usuario = await Usuario.findOneAndUpdate({"email": email},{
        $set: {
            estado: false 
        }
    }, {new: true });
    return usuario;
}

//funcion asincrona para listar todos los usuarios activos
async function listaUsuarioActivos(){
    let usuarios = await Usuario.find({"estado": true});
    return usuarios;
}

module.exports = ruta;
