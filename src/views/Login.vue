<template>
  <LoginForm
    class="m-60"
    @submit="onSubmit"
    @changedInput="onChangeInput"
    :loginError="loginError"
  />
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import { login } from "../infrastructure/auth_service";

export default {
  data() {
    return {
      loginError: null,
    };
  },
  components: {
    LoginForm,
  },
  methods: {
    onSubmit(loginData) {
      login(loginData, (errorMessage) => {
        this.loginError = errorMessage;
      });
    },
    onChangeInput() {
      this.loginError = null;
    },
  },
};
</script>

<style>
</style>