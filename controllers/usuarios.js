const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    //Desestructuración de arreglos
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req = reqNuest, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar the password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json(usuario);
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...datosExtra } = req.body;

    if (password) {
        //Encriptar the password
        const salt = bcryptjs.genSaltSync();
        datosExtra.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, datosExtra);
    //Parametros de segmento -> /route/:id
    res.json({
        msg: "put API - controlador",
        usuario
    });
}

//N0 se borrra de db debido a la integridad 
const usuariosDelete = async (req = request, res = response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
