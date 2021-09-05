const Rol = require('../models/role');
const Usuario = require('../models/usuario')

const esRolValido =  async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    console.log(existeRol) 

    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
}

const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({ correo })

     if ( existeEmail ) {
        throw new Error(`El email: ${correo} ya está registrado en la base de sdatos`)
     }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById( id )

     if ( !existeUsuario ) {
        throw new Error(`El Id: ${id} no existe`)
     }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}