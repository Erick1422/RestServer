const { request, response } = require("express")

const esAdminRole = (req = request, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin verificar el token primero'
        });
    }

    const { rol, nombre } = req.user;
    if (rol !== 'admin') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        })
    }
    next();
}

const tieneRole = ( ...roles ) => {
    return (req, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin verificar el token primero'
            });
        }
        
        if ( !roles.includes(req.user.rol) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles} `
            })
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}