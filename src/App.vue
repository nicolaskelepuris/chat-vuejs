<template>
  <VueElementLoading :active="isLoading" is-full-screen />
  <router-view />
</template>

<script>
import VueElementLoading from "vue-element-loading";
const axios = require('axios');
export default {
  data() {
    return {
      refCount: 0,
      isLoading: false,
    };
  },
  methods: {
    setLoading(isLoading) {
      if (isLoading) {
        this.refCount++;
        this.isLoading = true;
      } else if (this.refCount > 0) {
        this.refCount--;
        this.isLoading = this.refCount > 0;
      }
    },
  },
  components: {
    VueElementLoading,
  },
  created() {
    axios.interceptors.request.use(
      (config) => {
        this.setLoading(true);
        return config;
      },
      (error) => {
        this.setLoading(false);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        this.setLoading(false);
        return response;
      },
      (error) => {
        this.setLoading(false);
        return Promise.reject(error);
      }
    );
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
body {
  margin: 0;
  background: #eee;
  height: 100%;
}
html {
  height: 100%;
}
</style>
