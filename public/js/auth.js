'use strict;'

const formLogin = document.querySelector('form');

// Las rutas cambian dependiendo de la forma de ingresar (google o login normal)
let url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://nodeapp-cafe.herokuapp.com/api/auth/';

formLogin.addEventListener('submit', async (e) => {

    e.preventDefault();
    const formData = {};
    for (let element of formLogin.elements) {
        if (element.name.length > 0) {
            formData[element.name] = element.value;
        }
    }
    try {
        // Error acáaaaaa
        const resp = await fetch(url + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const { token, msg } = await resp.json();
        if (msg) {
            return console.log(msg);
        }
        localStorage.setItem('token', token);
        window.location = 'chat.html'

    } catch (error) {
        console.log(error);
    }
});


function handleCredentialResponse(response) {
    //Google TOken : ID_TOKEN
    const body = { id_token: response.credential };
    fetch(url + 'google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(({ token }) => {
            localStorage.setItem('token', token)
            window.location = 'chat.html'
        })
        .catch(console.warn)
}

// Revisar el cierre de sesión
const button = document.getElementById('google_signout')
button.onclick = () => {
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem('token'), done => {
        localStorage.clear();
        location.reload();
    });

}