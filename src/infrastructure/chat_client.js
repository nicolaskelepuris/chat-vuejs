const signalR = require("@microsoft/signalr");
import { chatWebSocketHostName } from '../infrastructure/api_config';
import { getTokenFromStorage } from '../infrastructure/auth_service';

let connection;

export function connect(onReceiveMessage, onOpenRoom) {
    try {
        connection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Debug)
            .withUrl(chatWebSocketHostName + '?access_token=' + getTokenFromStorage())
            .withAutomaticReconnect()
            .build();
    } catch (error) {
        console.log(error);
    }


    connection.on("ReceiveMessage", (chatMessage, roomId) => {
        onReceiveMessage(chatMessage, roomId);
    });

    connection.on("OpenRoom", roomId => {
        onOpenRoom(roomId);
    });

    connection.start();
}

export function sendMessageToRoom(message, roomId) {
    connection.invoke('SendMessage', message, roomId);
}

export function joinPrivateRoom(targetUserId) {
    connection.invoke('JoinPrivateRoom', targetUserId);
}

export function leavePrivateRoom(roomId) {
    connection.invoke('LeavePrivateRoom', roomId);
}
