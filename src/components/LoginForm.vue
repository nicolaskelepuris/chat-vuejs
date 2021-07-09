<template>
  <form>
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
form {
  max-width: 420px;
  height: 280px;
  margin: 30px auto;
  border-radius: 10px;
  text-align: center;
  padding: 40px;
  background: white;
}
label {
  display: inline-block;
  margin: 15px;
  letter-spacing: 1px;
}
input {
  display: block;
  width: 20%;
  padding: 10px;
  margin: auto;
  min-width: 240px;
  text-align: center;
}
button {
  background: #084baf;
  padding: 10px 20px;
  margin-top: 40px;
  color: white;
  border-radius: 3px;
}
.error {
  margin-top: 20px;
  color: red;
}
</style>