<template>
  <div class="container bg-light p-4 border border-dark h-80">
    <div class="row h-100">
      <div class="col-3 h-100">
        <ul class="list-group h-100">
          <li
            class="list-group-item text-truncate p-3 m-1 text-align-start"
            v-for="room in rooms"
            :key="room.id"
          >
            <h5 class="mb-3 text-truncate text-align-start">
              {{ getRoomName(room) }}
            </h5>
            <small>{{ getRoomLastMessage(room) }}</small>
          </li>
        </ul>
      </div>
      <div class="col-9 h-100">
        <ul class="list-group h-100">
          <div class="message-item">
            <li
              class="list-group-item text-truncate p-3 m-1"
              v-for="message in getCurrentRoomMessages()"
              :key="message.id"
              :class="{ 'list-group-item-secondary': message.isSender }"
            >
              <div class="row">
                <div class="col-3 text-align-start text-truncate">
                  {{ message.sender.nickname }}
                  <div class="text-truncate">{{ getMessageTime(message) }}</div>
                </div>
                <div class="col-9 text-align-start text-truncate">{{ message.message }}</div>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getChatRooms,
  getChatRoomMessages,
} from "../infrastructure/chat_service";
export default {
  data() {
    return {
      rooms: [],
      getRoomsError: null,
      getRoomMessagesError: null,
      currentRoom: null,
    };
  },
  mounted() {
    this.getRooms();
  },
  methods: {
    getRooms() {
      getChatRooms(
        () => {
          this.getRoomsError = true;
        },
        (rooms) => {
          this.rooms.push(...rooms);
          this.currentRoom = this.rooms.find((r) => r.type == 1);
          this.getRoomMessages(this.currentRoom.id);
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
    getRoomName(room) {
      if (room.type == 1) {
        return "Geral";
      } else {
        const userId = localStorage.getItem("user").id;
        return room.users.find((u) => u.id != userId).nickname;
      }
    },
    getRoomLastMessage(room) {
      if (room.messages != null) {
        return room.messages[room.messages.length - 1].message;
      } else {
        return "";
      }
    },
    getCurrentRoomMessages() {
      if (this.currentRoom != null) {
        return this.currentRoom.messages;
      } else {
        return [];
      }
    },
    getMessageTime(message){
      const date = new Date(message.sentAt + 'Z');
      return date.toLocaleString('pt-BR');
    }
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
.list-group {
  overflow-y: scroll;
}
.message-item {
  height: 100px;
}
</style>