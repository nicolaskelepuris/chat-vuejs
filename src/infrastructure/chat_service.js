import { hostname } from '../infrastructure/api_config';
const axios = require('axios');

export function getChatRooms(onError, onSuccess) {
    try {
        const path = 'chat-rooms';
        const config = {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('token').replaceAll('"', '')
            }
        }
        axios.get(hostname + path, config).then(response => {
            if (response?.data?.data != null) {
                onSuccess(response.data.data.items);
            } else {
                onError();
            }
        }).catch(() => onError());
    } catch (error) {
        console.log(error);
    }
}

export function getChatRoomById(roomId, onError, onSuccess) {
    try {
        const path = 'chat-rooms/' + roomId;
        const config = {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('token').replaceAll('"', '')
            }
        }
        axios.get(hostname + path, config).then(response => {
            if (response?.data?.data != null) {
                onSuccess(response.data.data);
            } else {
                onError();
            }
        }).catch(() => onError());
    } catch (error) {
        console.log(error);
    }
}

export function getChatRoomMessages(roomId, onError, onSuccess) {
    try {
        const path = 'chat-rooms/' + roomId + '/messages';
        const config = {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('token').replaceAll('"', '')
            }
        }
        axios.get(hostname + path, config).then(response => {
            if (response?.data?.data != null) {
                onSuccess(response.data.data.items);
            } else {
                onError();
            }
        }).catch(() => onError());
    } catch (error) {
        console.log(error);
    }
}