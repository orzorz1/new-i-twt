import axios from 'axios';
import Message from '@/components/message';
// import { getToken } from './auth'
import qs from 'querystring';

axios.defaults.withCredentials = true;

const app_key = 'chocolate';
const app_secret = 'c9da5207f1dffa45d9dac36e2a25792d3f934533';
const domain = 'testopen.twt.edu.cn';

const service = axios.create({
  // baseURL: 'http://open-api.twt.edu.cn/api',
  baseURL: 'http://testopen.twt.edu.cn/api',
  transformRequest: [
    (oldData, config) => {
      if (!config['Content-Type']) return qs.stringify(oldData);
      switch (config['Content-Type']) {
        case 'multipart/form-data':
          return oldData;
        default:
          return qs.stringify(oldData);
      }
    },
  ],
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    domain,
    'Access-Control-Allow-Credentials': 'true',
    ticket: window.btoa(`${app_key}.${app_secret}`),
  },
  withCredentials: true,
});

service.interceptors.request.use(
  (config) => {
    // config.headers['token'] = getToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const { data } = response;
      if (response.request.responseType === 'blob') {
        return data;
      }
      switch (data['error_code']) {
        case 0:
          return data;
        case 40001:
          // toLogin();
          Message.error(`${data['message']},请重新登陆`);
          return Promise.reject(data['message']);
        case 40002:
          Message.error(`该用户不存在`);
          return Promise.reject(data['message']);
        case 50007:
          Message.error(`用户名已存在`);
          return Promise.reject(data['message']);
        case 50014:
          Message.error(`手机号已存在`);
          return Promise.reject(data['message']);
        default:
          // Message.error(`${data['error_code'] + data['msg']},请联系管理员`);
          // alert(`${data['error_code'] + data['msg']},请联系管理员`)
          return Promise.reject(data['message']);
      }
    } else if (response.status === 500) {
      Message.error('500系统错误，请联系管理员');
    }
    return response;
  },
  (error) => {
    Message.error('发生未知错误，请联系管理员');
    return Promise.reject(error);
  }
);

export default service;
