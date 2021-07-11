<template>
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
        :class="{ 'bg-light': room.id == currentRoomId }"
      >
        <div class="justify-content-between d-flex">
          <div>
            <h5 class="mb-3 text-truncate text-align-start float-left">
              {{ getRoomName(room) }}
            </h5>
          </div>
          <div v-if="room.type != 1" class="float-right">
            <button
              @click.stop="leaveRoom(room.id)"
              type="button"
              class="close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <small>{{ getRoomLastMessage(room) }}</small>
      </li>
    </div>
  </ul>
</template>

<script>
import { getUserFromStorage } from "../infrastructure/auth_service";
export default {
  props: ["rooms", "currentRoomId"],
  methods: {
    setCurrentRoom(room) {
      this.$emit("setCurrentRoom", room);
    },
    leaveRoom(roomId) {
        this.$emit("leaveRoom", roomId);
    },
    getRoomName(room) {
      if (room.type == 1) {
        return "Geral";
      } else {
        const userId = getUserFromStorage().id;

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
  },
};
</script>

<style>
</style>