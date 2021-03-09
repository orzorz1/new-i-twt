// #TODO 将管理员的api迁移进来
import service from '../utils/request';

// 管理员修改信息
export function resetInfo(data) {
    return service({
      url: '/admin/user/single',
      method: "PUT",
      data
    })
  }