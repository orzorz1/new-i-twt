import service from '../utils/request';

// 账密登录
export function login(data) {
  return service({
    url: 'auth/common',
    method: "post",
    data
  })
}

// 验证码登录
export function loginWithPhone(data) {
  return service({
    url: 'auth/phone',
    method: "post",
    data
  })
}

// 获取登录短信验证码
export function loginVerifyCode(data) {
  return service({
    url: '/auth/phone/msg',
    method: 'post',
    data,
  });
}

// 获取注册短信验证码
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

// 可升级类型
export function upgradeOption() {
  return service({
    url: '/upgrade',
    method: 'get'
  })
}

// 账号升级
export function upgrade(data) {
  return service({
    url: '/upgrade',
    method: 'put',
    data
  })
}

// 获取当前用户信息
export function userInfo() {
  return service({
    url: '/user/single',
    method: 'get'
  })
}