let normalRoutes = [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/index"),
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("@/views/MainView"),
          meta: {
            title: "首页",
            requireAuth: true,
            normalAuthPass: true,
            icon:'mdi-home'
          },
        },
        {
          path: "upgrade",
          name: "upgrade",
          component: () => import("@/views/upgrade"),
          meta: {
            title: "账号升级",
            requireAuth: true,
            normalAuthPass: true,
            icon:'mdi-account-supervisor'
          },
        },
        {
          path: "userInfo",
          name: "userInfo",
          component: () => import("@/views/userInfo"),
          meta: {
            title: "个人信息",
            requireAuth: true,
            normalAuthPass: true,
            icon:'mdi-account-details'
          },
        },
        {
          path: "account",
          name: "account",
          component: () => import("@/views/account"),
          meta: {
            title: "账号关联",
            requireAuth: true,
            normalAuthPass: true,
            icon:'mdi-link-variant'
          },
        },
        {
          path: "report",
          name: "report",
          component: () => import("@/views/report/report"),
          meta: {
            title: "健康填报",
            requireAuth: true,
            normalAuthPass: true,
            icon:'mdi-alert-octagon'
          },
        }
      ]
    },
    // 请将404放在最后
    {
        path: "*",
        name: "404",
        component: () => import("@/views/404"),
        meta: {
          title: "404",
          requireAuth: false,
          normalAuthPass: true,
        },
      }
  ]

  export default normalRoutes
