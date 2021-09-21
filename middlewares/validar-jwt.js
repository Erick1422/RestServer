const jwt = require('jsonwebtoken');
const User = require('../models/usuario');

const validarJwt = async (req, res, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await User.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no registrado'
            })
        }

        if (!usuario.estado) {
            //401 -> No autorizado
            return res.status(401).json({
                msg: 'Usuario con estado false'
            })
        }
        req.user = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJwt
}