const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {
    const { nombre = 'No name', edad } = req.query;

    res.json({
        msg: "get API - controlador",
        nombre,
        edad
    });
}

const usuariosPost = (req, res = response) => {
    const body = req.body;
    res.json({
        body
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    //Parametros de segmento -> /route/:id
    res.json({
        msg: "put API - controlador",
        id
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "delete API"
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
