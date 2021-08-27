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
//修改个人信息
export function changeInfo(data) {
  return service({
    url: '/user/single',
    method: 'put',
    data
  })
}
//修改密码
export function changePWD(data) {
  return service({
    url: '/password/person/reset',
    method: 'put',
    data
  })
}
// 获取全部学院
export function getDepartmentAll(params) {
  return service({
    url: '/department/all',
    method: 'get',
    params
  })
}
//根据学院获取专业
export function getMajorByDepartment(id) {
  return service({
    url: `/major/department/${id}`,
    method: 'get',
  })
}
// 获取全部专业
export function getAllMajor(){
  return service({
    url:'/major/all',
    method: 'get'
  })
}
// 申请修改专业
export function changeMajor(data) {
  return service({
    url: '/user/major',
    method: 'post',
    data
  })
}
// 获取转专业申请名单
export function getApplicaton() {
  return service({
    url: '/application',
    method: 'get'
  })
}

//通过或拒绝转专业名单
//status 1通过 2拒绝
export function motifiedApplicaton(data) {
  return service({
    url: '/application',
    method: 'post',
    headers:{
      'Content-Type': 'application/json'
    },
    data
  })
}
//重置密码
export function rePWD(data){
  return service({
    url:'/super/resetpwd',
    method:"post",
    data
  })
}
// 获取转专业申请情况
export function getApplicationStatus(){
  return service({
    url:'/user/major',
    method:'get'
  })
}

//超管查询学生名单
export function getInfoByNum(userNumber){
  return service({
    url:`/admin/user/${userNumber}`,
    method:'get'
  })
}

//修改昵称
export function updateNickname(data){
  return service({
    url:`/user/single/username`,
    method:'PUT',
    data
  })
}

//修改邮箱
export function updateEmail(data){
  return service({
    url:`/user/single/email`,
    method:'PUT',
    data
  })
}

//更新手机号获取验证码
export function getVcode(data){
  return service({
    url:`/user/phone/msg`,
    method:'POST',
    data
  })
}

//更新手机号
export function changePhone(data){
  return service({
    url:`/user/single/phone`,
    method:'PUT',
    data
  })
}

//健康信息填报
export function postHealthInfo(data){
  return service({
    url:`/returnSchool/record`,
    headers:{
      'Content-Type': 'multipart/form-data'
    },
    method:'POST',
    data
  })
}

// #TODO 对接口进行分类