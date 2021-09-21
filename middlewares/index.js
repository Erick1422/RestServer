// Siempre va a buscar este archivo
const validarJWT = require('../middlewares/validar-jwt');
const ValidarRoles = require('../middlewares/validar-roles');
const validarCampos = require('../middlewares/validar-campos');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...ValidarRoles
}