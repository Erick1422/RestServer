const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const { 
    validarCampos,
    validarJwt,
    esAdminRole,
    tieneRole
 } = require('../middlewares')
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password debe de ser de más de 6 letras').isLength({min: 6}),
    // check('rol', 'Rol no válido').isIn(['admin', 'user']),
    check('rol').custom(esRolValido),
    check('correo').custom(emailExiste), //BUSCAR SOBRE ESTA FUNCIÓN (custom)
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    validarJwt,
    //esAdminRole,
    tieneRole('ventas', 'admin'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

//router.patch('/:id', usuarios);

module.exports = router;