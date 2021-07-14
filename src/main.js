import App from './App.vue';
import router from './router';
import { createApp, h } from 'vue';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap';

const app  = createApp({
    render: ()=>h(App)
});

app.use(router).mount('#app')