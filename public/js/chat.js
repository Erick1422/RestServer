
let usuario = null;
let socket = null;

// Referencias HTML
const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');

// Validar el token del localStorage
const validarJWT = async () => {

    const token = localStorage.getItem('token') || '';
    if (token.length <= 10) {
        window.location.href = 'index.html';
        // throw new Error('No hay token en el servidor');
    }
    const resp = await fetch('/api/auth/', {
        headers: { 'x-token': token }
    });
    const { user, token: tokenDB } = await resp.json();
    localStorage.setItem('item', tokenDB);
    usuario = user;
    document.title = usuario.nombre;

    await conectarSocket();
}

const conectarSocket = async () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('socket conectado');
    });

    socket.on('disconnect', () => {
        console.log('socket desconectado');
    });

    socket.on('recibir-mensajes', agregarMensajes);
    socket.on('usuarios-activos', agregarUsuarios);

    /**
     * Todo: Se podría mejorar, haciendo clickeable cada usuario y enviarlo a una sala privada
     */
    socket.on('mensaje-privado', (payload) => {
        console.log('privado:', payload);
    });
}

txtMensaje.addEventListener('keyup', (e) => {
    const mensaje = e.target.value;
    const uid = txtUid.value;

    if (e.keyCode !== 13) return;
    if (mensaje.length === 0) return;

    // Es recomendable siempre enviar un objeto, así sea una sola propiedad
    socket.emit('enviar-mensaje', { mensaje, uid });
    e.target.value = '';
    txtUid.value = '';
});

const agregarUsuarios = (usuarios = []) => {
    let usersHtml = '';
    usuarios.forEach(({ nombre, uid }) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${nombre}</h5>
                    <span class="fs-6 text-muted">${uid}</span>
                </p>
            </li>
        `
    });
    ulUsuarios.innerHTML = usersHtml;
}

const agregarMensajes = (mensajes = []) => {
    let mensajesHtml = '';
    mensajes.forEach(({ nombre, mensaje }) => {
        mensajesHtml += `
            <li>
                <p>
                    <h5 class="text-primary">${nombre}</h5>
                    <span>${mensaje}</span>
                </p>
            </li>
        `
    });
    ulMensajes.innerHTML = mensajesHtml;
}

const main = async () => {

    await validarJWT();
}

main();

// const socket = io();