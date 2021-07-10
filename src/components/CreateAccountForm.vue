<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col"></div>
      <form class="card p-5 bg-light col-6">
        <div class="row align-items-center">
          <div class="col"></div>
          <div class="col-8">
            <label class="form-label mt-5" for="formNickname">Nickname</label>
            <input
              id="formNickname"
              class="form-control text-center"
              required
              v-model="nickname"
              @change="onChangeInput"
            />

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
              Criar conta
            </button>

            <br />

            <div v-if="error" class="alert-danger mt-2" role="alert">
              {{ error }}
            </div>
            <div v-if="success" class="alert-success mt-2" role="alert">
              Sucesso!
              <router-link :to="{ name: 'Login' }">Fazer login</router-link>
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
      nickname: "user10",
      email: "user10@email.com",
      password: "senhatop",
    };
  },
  props: ["error", "success"],
  methods: {
    onSubmit() {
      this.$emit("submit", {
        nickname: this.nickname,
        email: this.email,
        password: this.password,
      });
    },
    onChangeInput() {
      this.$emit("changedInput");
    },
  },
};
</script>

<style>
.createAccountForm {
  height: 360px;
}
</style>