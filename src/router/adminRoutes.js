let adminRoutes = [
    {
      path: 'majorManage',
      name: 'majorManage',
      component: () => import("@/views/majorManage"),
      meta: {
        title: "转专业申请管理",
        requireAuth: true,
        normalAuthPass: false,
        icon:'mdi-head-check-outline'
      },
    },
    {
      path: 'rePWD',
      name: 'rePWD',
      component: () => import('@/views/rePWD'),
      meta: {
        title: "重置用户信息",
        requireAuth: true,
        normalAuthPass: false,
        icon:'mdi-account-convert'
      },
    },
  {
    path: 'reportManage',
    name: 'reportManage',
    component: () => import('@/views/report/reportManage'),
    meta: {
      title: "疫情填报管理",
      requireAuth: true,
      normalAuthPass: false,
      icon:'mdi-list-status'
    },
  }
  ]
  export default adminRoutes
