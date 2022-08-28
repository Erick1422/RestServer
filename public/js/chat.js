
let usuario = null;
let socket = null;

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
    const socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });
    
}

const main = async () => {

    await validarJWT();
}

main();

// const socket = io();