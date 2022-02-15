const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarArchivo, mostrarArchivo} = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middlewares/');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongodb').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarArchivo);

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongodb').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarArchivo);

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongodb').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarArchivo);

module.exports = router;