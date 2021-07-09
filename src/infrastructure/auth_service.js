const axios = require('axios');

const hostname = 'https://chat-signalr-teste.azurewebsites.net/api/';
const path = 'auth/login';

export function login(loginData, callback) {
    try {
        console.log('FEZ A REQUEST');
        axios.post(hostname + path, loginData).then(response => callback(response));
    } catch (error) {
        console.log('error during login');
    }
}
