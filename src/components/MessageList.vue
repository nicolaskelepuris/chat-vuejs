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
        <div>
          <div
            class="d-flex flex-column text-truncate"
            :class="{
              'align-self-start': !message.isSender,
              'align-self-end': message.isSender,
            }"
          >
            <div
              class="d-flex flex-row"
              :class="{
                'justify-content-between': !message.isSender,
                'justify-content-end': message.isSender,
              }"
            >
              <div
                @click="joinRoom(message.sender.id)"
                class="text-align-start h5"
                :class="{
                  hover: !message.isSender,
                }"
                data-bs-toggle="tooltip"
                title="Abrir chat"
              >
                {{ message.sender.nickname }}
              </div>
            </div>
            <div
              class="d-flex flex-row pt-1"
              :class="{
                'justify-content-between': !message.isSender,
                'justify-content-end': message.isSender,
              }"
            >
              <div class="text-align-start text-truncate pe-5">
                {{ message.message }}
              </div>
              <div class="text-truncate message-time">
                {{ getMessageTime(message) }}
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  </ul>
</template>

<script>
export default {
  updated() {
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
.message-time {
  min-width: 150px;
}
</style>