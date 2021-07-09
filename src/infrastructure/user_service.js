import { hostname } from '../infrastructure/api_config';
const axios = require('axios');

export function createAccount(data, onError, onSuccess) {
    try {
        const path = 'users';
        axios.post(hostname + path, data).then(response => {
            if (response?.data?.data != null) {
                onSuccess();
            } else {
                onError(response?.data?.error?.message);
            }
        }).catch((error) => onError(error.response.data.error.message));
    } catch (error) {
        console.log(error);
    }
}