<template>
  <LoginForm @submit="onSubmit" :loginError="loginError" />
  <router-link :to="{ name: 'Register' }">Create an account</router-link>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import { login } from "../infrastructure/auth_service";

export default {
  data() {
    return {
      loginError: null
    };
  },
  components: {
    LoginForm,
  },
  methods: {
    onSubmit(loginData) {
      login(loginData, (errorMessage) => { this.loginError = errorMessage });
    },
  },
};
</script>

<style>
</style>