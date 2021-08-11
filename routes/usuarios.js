const { Router } = require('express');
const router = Router();
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

router.get('/', usuariosGet);

router.post('/', usuariosPost);

router.put('/', usuariosPut);

router.delete('/', usuariosDelete);

module.exports = router;