<template>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body{
  margin: 0;
  background: #eee;
}
form {
  max-width: 420px;
  margin: 30px auto;
  border-radius: 10px;
  text-align: center;
  padding: 40px;
  background: white;
}
label {
  display: inline-block;
  margin: 15px;
  letter-spacing: 1px;
}
input {
  display: block;
  width: 20%;
  padding: 10px;
  margin: auto;
  min-width: 240px;
  text-align: center;
}
button {
  background: #084baf;
  padding: 10px 20px;
  margin-top: 40px;
  color: white;
  border-radius: 3px;
}
.error {
  margin-top: 20px;
  color: red;
}
.success {
  margin-top: 20px;
  color: rgb(101, 212, 101);
}
</style>
