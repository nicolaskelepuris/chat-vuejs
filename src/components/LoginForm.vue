<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col"></div>
      <form class="card p-5 bg-light col-6">
        <div class="row align-items-center">
          <div class="col"></div>
          <div class="col-8">
            <label class="form-label mt-5" for="formEmail">Email</label>
            <input
              type="email"
              class="form-control text-center"
              required
              v-model="email"
              id="formEmail"
              @change="onChangeInput"
            />
            <label class="form-label mt-5" for="formPassword">Password</label>
            <input
              type="password"
              class="form-control text-center"
              required
              v-model="password"
              id="formPassword"
              @change="onChangeInput"
            />
            <button @click.prevent="onSubmit" class="btn btn-primary mt-4 mb-2">
              Login
            </button>
            <br />
            <router-link :to="{ name: 'Register' }"
              >Criar uma conta</router-link
            >

            <div v-if="loginError" class="alert-danger mt-2" role="alert">
              {{ loginError }}
            </div>
          </div>
          <div class="col"></div>
        </div>
      </form>
      <div class="col"></div>
    </div>
  </div>
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
    onChangeInput() {
      this.$emit("changedInput");
    },
  },
};
</script>

<style>
</style>