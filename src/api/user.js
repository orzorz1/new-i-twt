import request from '../utils/request'

//志愿活动获得所有数据
export function register(data) {
    return request({
        url: '/api/user/register',
        method: 'post',
        data
    })
}