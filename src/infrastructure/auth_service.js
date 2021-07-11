import Router from '../router';
import { hostname } from '../infrastructure/api_config';
import axios from '../infrastructure/axios';

const TOKEN = 'token';
const USER = 'user';

export function login(loginData, onError) {
    try {
        const path = 'auth/login';
        axios.post(hostname + path, loginData).then(response => {
            if (response?.data?.data != null) {
                localStorage.setItem(USER, JSON.stringify(response.data.data.user));
                localStorage.setItem(TOKEN, JSON.stringify(response.data.data.token));
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
    localStorage.removeItem(USER);
    localStorage.removeItem(TOKEN);
    Router.push({ name: "Login" });
}

export function getTokenFromStorage() {
    return JSON.parse(localStorage.getItem(TOKEN));
}

export function getUserFromStorage() {
    return JSON.parse(localStorage.getItem(USER));
}
