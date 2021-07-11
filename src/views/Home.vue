<template>
  <div class="container bg-light p-2 border border-dark h-80">
    <div class="row h-100">
      <div class="col-3 h-100">
        <ul class="list-group h-100">
          <div class="room">
            <li
              class="
                list-group-item
                text-truncate
                p-3
                m-1
                h-100
                text-align-start
                hover
              "
              @click="setCurrentRoom(room)"
              v-for="room in rooms"
              :key="room.id"
            >
              <div class="justify-content-between d-flex">
                <div>
                  <h5 class="mb-3 text-truncate text-align-start float-left">
                    {{ getRoomName(room) }}
                  </h5>
                </div>
                <div v-if="room.type != 1" class="float-right">
                  <button @click.stop="leaveRoom(room.id)" type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <small>{{ getRoomLastMessage(room) }}</small>
            </li>
          </div>
        </ul>
      </div>
      <div class="col-9 h-100">
        <ul class="list-group message-list border-bottom mb-4">
          <div class="message-item">
            <li
              class="list-group-item text-truncate p-3 h-100 m-1"
              v-for="message in currentRoom?.messages"
              :key="message.id"
              :class="{ 'list-group-item-secondary': message.isSender }"
            >
              <div class="row">
                <div
                  @click="joinRoom(message.sender.id)"
                  class="col-3 text-align-start"
                >
                  <div class="text-truncate hover">
                    {{ message.sender.nickname }}
                  </div>
                  <div class="text-truncate">
                    {{ getMessageTime(message) }}
                  </div>
                </div>
                <div class="col-9 text-align-start text-truncate">
                  {{ message.message }}
                </div>
              </div>
            </li>
          </div>
        </ul>
        <div class="container">
          <div class="row gx-1">
            <div class="col-10">
              <input type="text" v-model="message" class="form-control" />
            </div>
            <div class="col-2">
              <button @click="sendMessage" class="btn btn-primary">
                Enviar
              </button>
            </div>
          </div>
        </div>
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
  sendMessageToRoom,
  leavePrivateRoom
} from "../infrastructure/chat_client";
export default {
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
    getRoomName(room) {
      if (room.type == 1) {
        return "Geral";
      } else {
        const userId = JSON.parse(localStorage.getItem("user")).id;

        return room.users.find((u) => u.id !== userId).nickname;
      }
    },
    getRoomLastMessage(room) {
      if (room.messages) {
        let message = room.messages[room.messages.length - 1];
        if (message) {
          return message.sender.nickname + ": " + message.message;
        }
      }

      return "";
    },
    getMessageTime(message) {
      let dateStr;
      if (!message.sentAt.includes("Z")) {
        dateStr = message.sentAt + "Z";
      } else {
        dateStr = message.sentAt;
      }
      const date = new Date(dateStr);
      return date.toLocaleString("pt-BR");
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
    sendMessage() {
      if (this.message && this.message.length > 0) {
        sendMessageToRoom(this.message, this.currentRoom.id);
        this.message = "";
      }
    },
    leaveRoom(roomId){
      this.setCurrentRoom(this.rooms.find(r => r.type == 1));
      leavePrivateRoom(roomId);
      this.rooms = this.rooms.filter(r => r.id != roomId || r.type == 1);
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
.h-90 {
  height: 90%;
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
.margin-auto {
  margin: auto;
}
.message-list {
  height: calc(100% - 80px);
}
</style>