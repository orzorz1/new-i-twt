import axios from 'axios';
import Message from '@/components/message';
import qs from 'querystring';
import router from "@/router"
import { getToken, removeToken } from "@/utils/auth";

axios.defaults.withCredentials = true;

const app_key = 'apple';
const app_secret = '41f339507099d27853abedf9bd10250b566595ef';
const domain = 'i.twt.edu.cn';

const service = axios.create({
    // baseURL: 'http://open-api.twt.edu.cn/api',
    // baseURL: 'https://api.twt.edu.cn/api',
    baseURL: 'https://api.twt.edu.cn/api',
    transformRequest: [
        (oldData, config) => {
            if (!config['Content-Type']) {
                config['Content-Type'] = 'application/x-www-form-urlencoded'
                return qs.stringify(oldData);
            }
            switch (config['Content-Type']) {
                case 'multipart/form-data':
                    return oldData;
                case 'application/json':
                    return JSON.stringify(oldData)
                default:
                    return qs.stringify(oldData);
            }
        },
    ],
    timeout: 120000,
    headers: {
        domain,
        'Access-Control-Allow-Credentials': 'true',
        ticket: window.btoa(`${app_key}.${app_secret}`),
    },
    withCredentials: true,
});

service.interceptors.request.use(
    (config) => {
        if (config.certainBaseUrl) {
            config.baseURL = config.certainBaseUrl;
            config.withCredentials = false;
            config.headers['Access-Control-Allow-Credentials'] = 'false'
        }
        if (config.certainToken) {
            config.headers['token'] = config.certainToken;
        } else {
            config.headers['token'] = getToken();
        }
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
            if (response.config.certainBaseUrl) {
                return Promise.resolve(data);
            }
            // 登录状态无效，跳转至登录页
            if (data['error_code'] === 40001 || data['error_code'] === 40005) {
                let fromPath = window.location.href.split('#')[1].split('?')[0]
                removeToken()
                if (!fromPath) {
                    fromPath = '/home'
                }
                router.push({
                    path: "/login",
                    query: {
                        from: fromPath,
                    },
                })
            }
            switch (data['error_code']) {
                case 0:
                    return Promise.resolve(data);
                case 40001:
                    Message.warning(`${data['message']},请重新登陆`);
                    return Promise.reject(data['message']);
                case 40002:
                    Message.error(`该用户不存在`);
                    return Promise.reject(data['message']);
                case 40004:
                    Message.error(`用户名或密码错误`);
                    return Promise.reject(data['message']);
                case 40005:
                    //Message.warning(`登录超时，请重新登录`);
                    return Promise.reject(data['message']);
                case 40007:
                    //Message.warning(`登录超时，请重新登录`);
                    return Promise.reject(data['message']);
                case 50001:
                    Message.error(`数据库错误`);
                    return Promise.reject(data['message']);
                case 50002:
                    Message.error(`逻辑错误错误`);
                    return Promise.reject(data['message']);
                case 50003:
                    Message.error(`无效的URL`);
                    return Promise.reject(data['message']);
                case 50004:
                    Message.error(`秘钥错误`);
                    return Promise.reject(data['message']);
                case 50005:
                    Message.error(`学号和身份证号不匹配`);
                    return Promise.reject(data['message']);
                case 50006:
                    Message.error(`用户名或邮箱已存在`);
                    return Promise.reject(data['message']);
                case 50007:
                    Message.error(`用户名已存在`);
                    return Promise.reject(data['message']);
                case 50008:
                    Message.error(`邮箱已存在`);
                    return Promise.reject(data['message']);
                case 50009:
                    Message.error(data['message']);
                    return Promise.reject(data['message']);
                case 50010:
                    Message.error(`发送失败，请稍后重试`);
                    return Promise.reject(data['message']);
                case 50011:
                    Message.error(`验证失败`);
                    return Promise.reject(data['message']);
                case 50012:
                    Message.error(`邮箱或手机号格式错误`);
                    return Promise.reject(data['message']);
                case 50013:
                    Message.error(data['message']);
                    return Promise.reject(data['message']);
                case 50014:
                    Message.error(data['message']);
                    return Promise.reject(data['message']);
                case 50015:
                    Message.error(data['message']);
                    return Promise.reject(data['message']);
                case 50016:
                    Message.error(`无效的学院名称`);
                    return Promise.reject(data['message']);
                default:
                    Message.error(`错误码 ${data['error_code'] +' '+ data['message']}`);
                    return Promise.reject(data['message']);
            }
        } else if (response.status === 500) {
            Message.error('500系统错误，请联系管理员');
        }
        return response;
    },
    (error) => {
        Message.error('网络问题，请稍后重试');
        return Promise.reject(error);
    }
);

export default service;