import Router from '../router';
import { hostname } from '../infrastructure/api_config';
const axios = require('axios');

export function login(loginData, onError) {
    try {
        const path = 'auth/login';
        axios.post(hostname + path, loginData).then(response => {
            if (response?.data?.data != null) {
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                localStorage.setItem('token', JSON.stringify(response.data.data.token));
                Router.push({ name: "Home" });
            } else {
                onError(response?.data?.error?.message);
            }
        }).catch((error) => onError(error.response.data.error.message));
    } catch (error) {
        console.log(error);
    }
}

export function logout() {
    localStorage.removeItem('user');
    localStorage.setItem('token');
    Router.push({ name: "Login" });
}
