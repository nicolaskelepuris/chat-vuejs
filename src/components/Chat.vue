<template>
  <div class="container bg-light p-2 border border-dark h-80">
    <div class="row h-100">
      <div class="col-3 h-100">
        <RoomList @setCurrentRoom="setCurrentRoom" @leaveRoom="leaveRoom" :rooms="rooms" :currentRoomId="currentRoom?.id" />
      </div>
      <div class="col-9 h-100">
        <MessageList :currentRoom="currentRoom" @joinRoom="joinRoom"/>
        <SendMessageForm :roomId="currentRoom?.id" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getChatRooms,
  getChatRoomMessages,
  getChatRoomById,
} from "../infrastructure/chat_service";
import {
  connect,
  joinPrivateRoom,
  leavePrivateRoom,
} from "../infrastructure/chat_client";
import SendMessageForm from "./SendMessageForm.vue";
import MessageList from "./MessageList.vue";
import RoomList from "./RoomList.vue";
export default {
  components: {
    SendMessageForm,
    MessageList,
    RoomList,
  },
  data() {
    return {
      rooms: [],
      getRoomsError: null,
      getRoomMessagesError: null,
      currentRoom: null,
      message: "",
    };
  },
  mounted() {
    this.getRooms();
    connect(
      (chatMessage, roomId) => {
        this.rooms.find((r) => r.id == roomId).messages.push(chatMessage);
      },
      (roomId) => {
        this.openChatRoom(roomId);
      }
    );
  },
  methods: {
    getRooms() {
      getChatRooms(
        () => {
          this.getRoomsError = true;
          console.log("falha ao carregar salas");
        },
        (rooms) => {
          this.rooms.push(...rooms);
          this.currentRoom = this.rooms.find((r) => r.type == 1);
          this.rooms.forEach((room) => {
            this.getRoomMessages(room.id);
          });
        }
      );
    },
    openChatRoom(roomId) {
      getChatRoomById(
        roomId,
        () => {},
        (chatRoom) => {
          this.rooms.push(chatRoom);
          this.currentRoom = chatRoom;
          this.getRoomMessages(roomId);
        }
      );
    },
    getRoomMessages(roomId) {
      getChatRoomMessages(
        roomId,
        () => {
          this.getRoomMessagesError = true;
        },
        (messages) => {
          let room = this.rooms.find((r) => r.id == roomId);
          if (room.messages != null) {
            room.messages.push(...messages);
          } else {
            room.messages = messages;
          }
        }
      );
    },
    joinRoom(targetUserId) {
      let room = this.rooms.find((r) =>
        r.users.find((u) => u.id == targetUserId)
      );
      if (room != null) {
        this.currentRoom = room;
      } else {
        joinPrivateRoom(targetUserId);
      }
    },
    setCurrentRoom(room) {
      this.currentRoom = room;
    },
    leaveRoom(roomId) {
      this.setCurrentRoom(this.rooms.find((r) => r.type == 1));
      leavePrivateRoom(roomId);
      this.rooms = this.rooms.filter((r) => r.id != roomId || r.type == 1);
    },
  },
};
</script>

<style>
.text-align-start {
  text-align: start;
}
.h-80 {
  height: 80%;
}
.h-10 {
  height: 10%;
}
.list-group {
  overflow-y: scroll;
}
.message-item {
  height: 85px;
}
.room {
  height: 100px;
}
.hover:hover {
  cursor: pointer;
}
.message-list {
  height: calc(100% - 80px);
}
</style>