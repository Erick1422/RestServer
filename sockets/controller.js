const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const { ChatMensajes } = require("../models");

const chatMensajes = new ChatMensajes();

/**
 * @param {*} socket 
 * @param {*} io Representa todo el servidor de sockets
 * @returns undefined
 */
const socketController = async (socket = new Socket, io) => { // Solo para un entorno de desarrollo => new Socket

    const token = socket.handshake.headers['x-token'];
    const usuario = await comprobarJWT(token);
    if (!usuario) {
        return socket.disconnect();
    }

    // Agregar el usuario conectado
    chatMensajes.conectarUsuario(usuario);
    io.emit('usuarios-activos', chatMensajes.usuariosArr)
    socket.emit('recibir-mensajes', chatMensajes.ultimos10); // solo al socket/persona conectado

    // Conectarlo a una sala especial
    socket.join(usuario._id.toString()); //global -> socket.id y otra por el usuario._ids

    // Limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {
         //TODO: revisar porque se envía el id de esta forma. Molesta porque es tipo object
        chatMensajes.desconectarUsuario(usuario._id);
        io.emit('usuarios-activos', chatMensajes.usuariosArr);
    });

    socket.on('enviar-mensaje', ({ uid, mensaje }) => {
        // si existe es porque es un mensaje privado
        if (uid) {
            socket.to(uid).emit('mensaje-privado', { de: usuario.nombre, mensaje }) // Esto funciona por socket.join()
        } else {
            chatMensajes.enviarMensaje(usuario._id, usuario.nombre, mensaje);
            io.emit('recibir-mensajes', chatMensajes.ultimos10);
        }
    });

}

module.exports = {
    socketController
}