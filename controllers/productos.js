
const { response } = require('express');
const { isValidObjectId } = require('mongoose')
const { Producto } = require('../models');

const crearProducto = async (req, res = response) => {
    try {
        const { estado, usuario, ...body } = req.body;
        const productoDB = await Producto.findOne({ nombre: body.nombre })

        if (productoDB) {
            return res.status(400).json({
                msg: `La categoria ${productoDB.nombre}, ya existe`
            })
        }
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.user._id
        }

        const producto = new Producto(data);
        await producto.save();

        res.status(200).json({
            msg: 'Producto guardado',
            producto
        })

    } catch (error) {
        console.log(error)
    }
}

const obtenerProductos = async (req, res = response) => {
    //Paginación - total - populate
    const { limite = 5, desde = 0 } = req.query,
        query = { estado: true }

    const [productos, total] = await Promise.all([
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite)).
            populate({ path: 'categoria', select: 'nombre' }).
            populate({ path: 'usuario', select: 'nombre' }),
        Producto.countDocuments(query)
    ]);

    res.status(200).json({
        productos,
        total
    })
}

const obtenerProducto = async (req, res) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate({ path: 'usuario', select: 'nombre' })
        .populate({ path: 'categoria', select: 'nombre' });

    res.status(200).json({
        producto
    })
}

const actualizarProducto = async (req, res) => {
    //En caso de que envíen otros datos que no puedan actualizar en el body
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.user._id;
    /* 
    if (data.categoria) {
        console.log('No hay');
        if (!isValidObjectId(data.categoria) || data.categoria === "") {
            return res.status(400).json({
                msg: 'La categoría no es un id válido'
            });
        }
        //Comprobar si la categoria existe, analizar si hacerlo en forma de middeware o helper
    } */
    //Se asigna en true para que envíe el documento con la actualización
    const producto = await Producto.findByIdAndUpdate(req.params.id, data, { new: true })
    res.status(200).json({
        producto
    })
}

const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })

    res.status(200).json({
        msg: 'producto eliminada',
        producto
    })
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}