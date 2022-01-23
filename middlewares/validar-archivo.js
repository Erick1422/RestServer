

const validarArchivoSubir = (req, res = response, next) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No existe la propiedad <archivo> en el cuerpo de la petición' });
        return;
    }
    next();
}

module.exports = {
    validarArchivoSubir
}