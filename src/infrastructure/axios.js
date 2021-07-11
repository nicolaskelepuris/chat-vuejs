import { logout } from '../infrastructure/auth_service';
const axios = require('axios');

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        logout();
    }
    return Promise.reject(error);
});

export default axios;
