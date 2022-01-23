const { Categoria, Role, Usuario, Producto } = require('../models/')

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
}

const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({ correo })

    if (existeEmail) {
        throw new Error(`El email: ${correo} ya está registrado en la base de sdatos`)
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id)

    if (!existeUsuario) {
        throw new Error(`El Id: ${id} no existe`)
    }
}

const existeCategoriaPorID = async (id) => {
    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria) {
        throw new Error('La categoría no existe')
    }
}

const existeProductoPorID = async (id) => {
    const existeProducto = await Producto.findById(id)
    if (!existeProducto) {
        throw new Error('El producto no existe')
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion: ${coleccion} no es permitida, ${colecciones}`)
    }
    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorID,
    existeProductoPorID,
    coleccionesPermitidas
}