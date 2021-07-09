<template>
  <form class="loginForm">
    <label>Email</label>
    <input type="email" required v-model="email" />

    <label>Password</label>
    <input type="password" required v-model="password" />

    <button @click.prevent="onSubmit">Login</button>
    <div v-if="loginError" class="error">{{ loginError }}</div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "user1@email.com",
      password: "senhatop",
    };
  },
  props: ["loginError"],
  methods: {
    onSubmit() {
      this.$emit("submit", { email: this.email, password: this.password });
    },
  },
};
</script>

<style>
.loginForm {
  height: 270px;
}
</style>