<template>
  <CreateAccountForm @submit="onSubmit" :error="error" :success="success" />
  <router-link :to="{ name: 'Login' }"
    >Já tem uma conta? Login</router-link
  >
</template>

<script>
import CreateAccountForm from "../components/CreateAccountForm.vue";
import { createAccount } from "../infrastructure/user_service";

export default {
  data() {
    return {
      error: null,
      success: false,
    };
  },
  components: {
    CreateAccountForm,
  },
  methods: {
    onSubmit(data) {
      createAccount(
        data,
        (errorMessage) => {
          this.error = errorMessage;
        },
        () => {
          this.success = true;
        }
      );
    },
  },
};
</script>

<style>
</style>