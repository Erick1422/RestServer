const { model, Schema } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ]
    },
    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatorio' ]
    },
    image: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//Elimina las propieadades indicadas y retornamos el resto de información
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject()
    return usuario;
}


module.exports = model("Usuario", UsuarioSchema)