import axios from 'axios';
import { message, Modal } from 'ant-design-vue';
import store from '@/store';
import router from '@/router';
const instance = axios.create({
  baseURL: '//localhost:3000',
  timeout: 3000
});

// request拦截器
instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    const now = +new Date();
    const tokenExpires = localStorage.getItem('token_expires');
    if (tokenExpires) {
      if (+tokenExpires >= now) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
        }
      } else {
        store.commit('DELETE_TOKEN');
      }
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.resolve({
      code: -400,
      msg: error
    });
  }
);

// respone拦截器
instance.interceptors.response.use(
  response => {
    if (response.data.code === -401) {
      store.commit('DELETE_TOKEN');
      Modal.error({
        title: '登录失效',
        content: '登录状态已过期，请重新登录！',
        onOk() {
          router.push('/login');
        }
      });
    }
    return response.data;
  },
  error => {
    console.log('err' + error); // for debug
    message.error(error.message);
    return Promise.resolve({
      code: -400,
      msg: error
    });
  }
);

export default instance;
