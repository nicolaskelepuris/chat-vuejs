<template>
  <form class="d-flex m-4">
    <input class="float-left" type="button" value="Logout" @click="onLogout" />
  </form>
</template>

<script>
import { logout } from "../infrastructure/auth_service";
export default {
  methods: {
    onLogout() {
      logout();
    },
  },
};
</script>

<style>
</style>