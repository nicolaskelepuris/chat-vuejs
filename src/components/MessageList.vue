<template>
  <ul class="list-group message-list border-bottom mb-4">
    <div class="message-item">
      <li
        class="list-group-item text-truncate p-3 h-100 m-1"
        v-for="message in currentRoom?.messages"
        :key="message.id"
        :class="{
          'list-group-item-secondary': message.isSender,
          'last-message':
            message === currentRoom.messages[currentRoom.messages.length - 1],
        }"
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
</template>

<script>
export default {
  updated() {
    // whenever data changes and the component re-renders, this is called.
    this.$nextTick(() => this.scrollToElement());
  },
  props: ["currentRoom"],
  methods: {
    joinRoom(targetUserId) {
      this.$emit("joinRoom", targetUserId);
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
    scrollToElement() {
      const el = this.$el.getElementsByClassName("last-message")[0];

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>

<style>
</style>