import axios from 'axios';
import { message } from 'ant-design-vue';
const instance = axios.create({
  baseURL: 'localhost:8000',
  timeout: 3000
});

// request拦截器
instance.interceptors.request.use(
  config => {
    // Do something before request is sent
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
  response => response.data,
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
