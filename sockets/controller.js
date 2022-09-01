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

    // Limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario._id); // revisar porque se envía el id de esta forma
        io.emit('usuarios-activos', chatMensajes.usuariosArr);
    });

    socket.on('enviar-mensaje', ({ uid, mensaje }) => {
        chatMensajes.enviarMensaje(usuario._id, usuario.nombre, mensaje);
        io.emit('recibir-mensajes', chatMensajes.ultimos10);
    });

}

module.exports = {
    socketController
}