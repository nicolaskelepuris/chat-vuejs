<template>
  <div class="container">
    <div class="row gx-1">
      <div class="col-10">
        <input type="text" v-model="message" class="form-control" />
      </div>
      <div class="col-2">
        <button @click="sendMessage" class="btn btn-primary">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  sendMessageToRoom,
} from "../infrastructure/chat_client";
export default {
  data() {
    return {
      message: "",
    };
  },
  props: ['roomId'],
  methods: {
    sendMessage() {
      if (this.message && this.message.length > 0) {
        sendMessageToRoom(this.message, this.roomId);
        this.message = "";
      }
    },
  },
};
</script>

<style>
</style>