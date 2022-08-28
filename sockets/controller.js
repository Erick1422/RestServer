const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");

// Solo para un entorno de desarrollo => new Socket
const socketController = async (socket = new Socket) => {
    const token = socket.handshake.headers['x-token'];
    let usuario = await comprobarJWT(token);
    if (!usuario) {
        return socket.disconnect();
    }
    console.log('se conecto:', usuario.nombre);
}

module.exports = {
    socketController
}