<template>
  <LoginForm :onSubmit="onSubmit" />
  <router-link :to="{ name: 'Register' }">Create an account</router-link>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  components: {
    LoginForm,
  },
  methods: {
    onSubmit() {
      console.log("submit");
    },
  },
};
</script>

<style>

</style>