const { response } = require('express')

const usuariosGet = (req, res = response) => {

    res.json({
        msg: "get API - controlador"
    });
}

module.exports = {
    usuariosGet
}
