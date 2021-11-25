const { response } = require("express");
const { Categoria } = require("../models");

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre })

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.user._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json({
        categoria
    })

}

const obtenerCategorias = async (req, res = response) => {
    //Paginación - total - populate
    const { limite = 5, desde = 0 } = req.query,
        query = { estado: true }

    const [categorias, total] = await Promise.all([
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite)).
            populate({ path: 'usuario', select: 'nombre' }),
        Categoria.countDocuments(query)
    ]);

    res.status(200).json({
        categorias,
        total
    })
}

const obtenerCategoria = async (req, res) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id)
        .populate({ path: 'usuario', select: 'nombre' });
        
    res.status(200).json({
        categoria
    })
}

const actualizarCategoria = async (req, res) => {

    //En caso de que envíen otros datos que no puedan actualizar en el body
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.user._id;

    const categoriaDB = await Categoria.findOne({ nombre: data.nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe`
        })
    }
    //Se asigna en true para que envíe el documento con la actualización
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, data, { new: true })
    res.status(200).json({
        categoria
    })
}

const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.status(200).json({
        msg: 'Categoria eliminada',
        categoria
    })
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
}