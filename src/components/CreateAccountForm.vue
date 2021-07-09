<template>
  <form class="createAccountForm">
    <label>Nickname</label>
    <input required v-model="nickname" />

    <label>Email</label>
    <input type="email" required v-model="email" />

    <label>Password</label>
    <input type="password" required v-model="password" />

    <button @click.prevent="onSubmit">Criar conta</button>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">
        Sucesso!
        <router-link :to="{ name: 'Login' }">Fazer login</router-link>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      nickname: "user10",
      email: "user10@email.com",
      password: "senhatop",
    };
  },
  props: ["error", "success"],
  methods: {
    onSubmit() {
      this.$emit("submit", { nickname: this.nickname, email: this.email, password: this.password });
    },
  },
};
</script>

<style>
.createAccountForm {
  height: 360px;
}
</style>