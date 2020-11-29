import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import axios from './http';
import './mock';
import './login';
import { Button, Menu, Form, Input, message } from 'ant-design-vue';

const app = createApp(App)
  .use(store)
  .use(router)
  .use(Button)
  .use(Menu)
  .use(Form)
  .use(Input);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$message = message;
app.mount('#app');
