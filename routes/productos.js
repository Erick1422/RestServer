const { Router } = require('express');
const { check } = require('express-validator')

const {
    crearProducto,
    obtenerProductos,
    actualizarProducto,
    eliminarProducto,
    obtenerProducto
} = require('../controllers/productos');
const { existeProductoPorID, existeCategoriaPorID } = require('../helpers/db-validators');
const { validarCampos, validarJwt, esAdminRole } = require('../middlewares');

const router = Router();

router.post('/', [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongodb válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorID),
    validarCampos
],
    crearProducto)

router.get('/', obtenerProductos)

router.get('/:id', [
    check('id', 'No es un id de mongodb válido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
],
    obtenerProducto)

//Relizar una validación a la categoría, ya que se debe comprobar si existe, sin obligar
//a que la agreguens
router.put('/:id', [
    validarJwt,
    check('id', 'No es un id de mongodb válido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
],
    actualizarProducto)

router.delete('/:id', [
    validarJwt,
    esAdminRole,
    check('id', 'No es un id de mongodb válido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
],
    eliminarProducto)

module.exports = router;