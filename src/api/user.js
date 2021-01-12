import service from '../utils/request';

// 获取短信验证码
export function verifyCode(data) {
  return service({
    url: '/register/phone/msg',
    method: 'post',
    data,
  });
}

// 注册
export function register(data) {
  return service({
    url: '/register',
    method: 'post',
    data,
  });
}
