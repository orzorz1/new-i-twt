import axios from 'axios';
import service from '../utils/request';
import { getToken } from "@/utils/auth";

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

// 党建账号升级
export function upgradeParty(data) {
    return service({
        url: '/upgrade/party',
        method: 'post',
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
export function getAllMajor() {
    return service({
        url: '/major/all',
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
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}
//重置密码
export function rePWD(data) {
    return service({
        url: '/super/resetpwd',
        method: "post",
        data
    })
}
// 获取转专业申请情况
export function getApplicationStatus() {
    return service({
        url: '/user/major',
        method: 'get'
    })
}

//超管查询学生名单
export function getInfoByNum(userNumber) {
    return service({
        url: `/admin/user/${userNumber}`,
        method: 'get'
    })
}

//修改昵称
export function updateNickname(data) {
    return service({
        url: `/user/single/username`,
        method: 'PUT',
        data
    })
}

//修改邮箱
export function updateEmail(data) {
    return service({
        url: `/user/single/email`,
        method: 'PUT',
        data
    })
}

//更新手机号获取验证码
export function getVcode(data) {
    return service({
        url: `/user/phone/msg`,
        method: 'POST',
        data
    })
}

//更新手机号
export function changePhone(data) {
    return service({
        url: `/user/single/phone`,
        method: 'PUT',
        data
    })
}

//健康信息填报
export function postHealthInfo(data) {
    return service({
        url: `/returnSchool/record`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        data
    })
}

//获取健康信息填报历史记录
export function getHealthInfo() {
    return service({
        url: `/returnSchool/record`,
        method: 'GET'
    })
}

//注销账号
export function logOff() {
    return service({
        url: `/auth/logoff`,
        method: 'POST'
    })
}

// 在未登录情况下重置用户密码
export function rePWDByID(data) {
    return service({
        url: `/password/resetByBasicInfo`,
        method: 'POST',
        data
    })
}

//查询评教资格，并获得辅导员姓名和学院名称
export function getEvaluateInfo(params) {
    return service({
        url: `/checkin`,
        method: 'GET',
        certainBaseUrl: 'https://evaluation.twtstudio.com/api',
        params
    })
}

//保存评教信息
export function postEvaluateInfo(data) {
    return service({
        url: `/upload`,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        certainBaseUrl: 'https://evaluation.twtstudio.com/api',
        data
    })
}

//上传学院问卷
export function postCollegeEvaluateInfo(data) {
    return service({
        url: `/college`,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        certainBaseUrl: 'https://evaluation.twtstudio.com/api',
        data
    })
}

//问题反馈
export function postEvaluateFeedback(data) {
    return service({
        url: `/feedback`,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        certainBaseUrl: 'https://evaluation.twtstudio.com/api',
        data
    })
}

//获取求实论坛token
export async function updateForumToken() {
    let data
    let instance = axios.create({ withCredentials: false })
    data = (await instance
        .get(
            "https://qnhd.twt.edu.cn/api/v1/f/auth/token?token=" + getToken()
        )).data
    return data;
}

//求实论坛账号升级
export function upgradeForum(data, token) {
    return axios.create({
        withCredentials: false,
        baseURL: 'https://qnhd.twt.edu.cn/api/v1/f',
    })({
        url: '/user/update_num',
        method: 'POST',
        headers: {
            token: token
        },
        data
    })
}

// 导出Excel
export function downloadExcelByDate(fromDate, toDate) {
    return service({
        url: `/returnSchool/exportExcel/${fromDate}/${toDate}`,
        method: 'GET',
        responseType: 'blob'
    })
}

//修改昵称
export function updateWbyNickname(a, b) {
    let instance = axios.create({ withCredentials: false, headers: { token: b } })
    instance
        .post(
            "https://qnhd.twt.edu.cn/api/v1/f/user/name", a

        )

}

var datt
    //从微北洋获取token
export async function getWbyToken(a, b) {
    let instance = axios.create({ withCredentials: false })
    datt = (await instance
        .get(
            "https://qnhd.twt.edu.cn/api/v1/f/auth/passwd?user=" + a + "&password=" + b
        )).data
    console.log(datt)
    return datt;


    // return serviceForWby({
    //     url:'/api/v1/f/auth/passwd',
    //     method:'GET',
    //     params
    // })
}

// #TODO 对接口进行分类