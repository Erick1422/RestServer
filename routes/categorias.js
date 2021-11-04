const { Router } = require('express');
const { check } = require('express-validator');

const { 
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria, 
    actualizarCategoria, 
    eliminarCategoria 
} = require('../controllers/categorias');

const { existeCategoriaPorID } = require('../helpers/db-validators');

const { validarJwt, validarCampos, esAdminRole } = require('../middlewares')

const router = Router();

/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorías - Público
router.get('/', obtenerCategorias);

//Obtener una categoría por id - público
router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
],
 obtenerCategoria);

//Crear categoría - privado - cualquier persona con un token válido
router.post('/', [
    validarJwt,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar registro por id - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJwt,
    check('id', 'No es un id Válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    check('nombre', 'Agregue un nombre para realizar la actualización').not().isEmpty(),
    validarCampos
],
 actualizarCategoria);

//Borrar una categoría - Admin
router.delete('/:id', [
    validarJwt,
    esAdminRole,
    check('id', 'No es un id Válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], eliminarCategoria);

module.exports = router;