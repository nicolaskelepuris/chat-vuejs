import { hostname } from '../infrastructure/api_config';
import axios from '../infrastructure/axios';
import { getTokenFromStorage } from '../infrastructure/auth_service';

const config = {
    headers: {
       Authorization: "Bearer " + getTokenFromStorage()
    }
}

export function getChatRooms(onError, onSuccess) {
    try {
        const path = 'chat-rooms';
        axios.get(hostname + path, config).then(response => {
            if (response?.data?.data != null) {
                onSuccess(response.data.data.items);
            } else {
                onError();
            }
        }).catch((error) => {
            onError();
            console.log(error);
        });
    } catch (error) {
        console.log(error);
    }
}

export function getChatRoomById(roomId, onError, onSuccess) {
    try {
        const path = 'chat-rooms/' + roomId;
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