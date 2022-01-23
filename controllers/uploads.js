const path = require('path');
const fs = require('fs');
const { response, request } = require("express");
const { subirArchivo } = require('../helpers');

const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req, res = response, next) => {
    try {
        //Imagenes
        // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({
            msg: 'File upload: ' + nombre
        })
    } catch (msg) {
        res.status(400).json({ msg })
    }
}

const actualizarArchivo = async (req = request, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(500).json({
                    msg: `No existe un usuario con el id: ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(500).json({
                    msg: `No existe un producto con el id: ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: 'No se ha válidado esto'
            })
    }

    // LImpiar imágenes previas
    if (modelo.img) {
        //Hay que borrar la imagen
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();
    res.json(modelo);
}

const mostrarArchivo = (req, res = response) => {
    
    const {id, coleccion} = req.params;
    
    res.json({
        id, coleccion
    })
}

module.exports = {
    cargarArchivo,
    actualizarArchivo,
    mostrarArchivo
}