
const { request, response } = require('express')
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {

    const { correo, password } = req.body;
    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario / password no son correctos - correo'
            })
        }

        //Si el Usuario esta activo
        if (!usuario.estado) {
            return res.status(404).json({
                msg: 'Usuario / password no son correctos - estado: false'
            })
        }

        //Verificar la contraseña
        const validPassword = bcrypt.compareSync( password, usuario.password );
        if (!validPassword) {
            return res.status(404).json({
                msg: 'Usuario / password no son correctos - password '
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el admin'
        })
    }
}

module.exports = {
    login
}