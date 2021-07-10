<template>
  <CreateAccountForm
    @submit="onSubmit"
    @changedInput="onChangeInput"
    :error="error"
    :success="success"
  />
  <div class="mt-2">
    <router-link :to="{ name: 'Login' }">Já tem uma conta? Login</router-link>
  </div>
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
    onChangeInput() {
      this.error = null;
    },
  },
};
</script>

<style>
</style>