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
      login(loginData, (response) => {
        if (response?.data?.data != null) {
          this.$router.push({ name: "Home" });
        } else {
          this.loginError = response?.data?.error?.message;
        }
      });
    },
  },
};
</script>

<style>
</style>