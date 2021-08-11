const { response } = require('express')

const usuariosGet = (req, res = response) => {
    res.json({
        msg: "get API - controlador"
    });
}

const usuariosPost = (req, res = response) => {
    res.json({
        msg: "post API - controlador"
    });
}

const usuariosPut = (req, res = response) => {
    res.json({
        msg: "put API - controlador"
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
