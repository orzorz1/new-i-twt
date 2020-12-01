import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './auth'
import qs from 'querystring';
//  import { toError, toLogin } from "../router";

const service = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
    transformRequest: [(oldData, config) => {
        if (!config['Content-Type']) return qs.stringify(oldData);
        switch (config['Content-Type']) {
            case 'multipart/form-data':
                return oldData;
            default:
                return qs.stringify(oldData)
        }
    }],
    timeout: 60000
});

service.interceptors.request.use(config => {
    config.headers['token'] = getToken();
    return config
}, error => {
    return Promise.reject(error);
});

service.interceptors.response.use(response => {
    if (response.status === 200) {
        const {data} = response;
        if (response.request.responseType === 'blob') {
            return data
        }
        switch (data["error_code"]) {
            case 0:
                return data;
            case 1001:
                // toLogin();
                Message({
                    message: `${data["msg"]},请重新登陆`,
                    type: "error",
                    duration: 5000
                });
                return Promise.reject(data["msg"]);
            case 1002:
                return Promise.reject(data["msg"]);
            default:
                Message({
                    message: data["msg"],
                    type: "error",
                    duration: 5000
                });
                return data;
                //return Promise.reject(data["msg"])
        }
    } else if (response.status === 500) {
        Message({
            message: "系统错误，请联系管理员修复",
            type: "error",
            duration: 5000
        });
    }
    return response
},
    error => {
        if (error.message === "Network Error") {
            // toError();
        } else {
            Message({
                message: error.message,
                type: 'error',
                duration: 5000
            });
        }

        return Promise.reject(error)
    });

export default service