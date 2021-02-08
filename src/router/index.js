import Vue from "vue";
import VueRouter from "vue-router";
import { getToken } from "@/utils/auth";
import { userInfo } from "@/api/user.js";
import Message from "@/components/message"

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
    meta: {
      title: "登录",
      requireAuth: false,
      keepAlive: true,
      normalAuthPass: true,
    },
  },
  {
    path: "/create",
    name: "create",
    component: () => import("@/views/create"),
    meta: {
      title: "注册",
      requireAuth: false,
      normalAuthPass: true,
    },
  },
  {
    path: "/",
    name: "index",
    component: () => import("@/views/index"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/MainView"),
        meta: {
          title: "首页",
          requireAuth: true,
          normalAuthPass: true,
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
        },
      }
      ,
      {
        path: 'majorManage',
        name: 'majorManage',
        component: () => import("@/views/majorManage"),
        meta: {
          title: "转专业申请管理",
          requireAuth: true,
          normalAuthPass: false,
        },
      }
    ],
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/views/404"),
    meta: {
      title: "404",
      requireAuth: false,
      normalAuthPass: true,
    },
  },
];

const router = new VueRouter({
  routes,
});



router.beforeEach((to, from, next) => {
  // 设置标签页title
  window.document.title =
    to.meta.title == undefined
      ? "天外天个人中心"
      : `${to.meta.title} - 天外天个人中心`;
  // 访问权限设置
  if (to.meta.requireAuth) {
    let token = getToken();
    // console.log(token);
    if (!token) {
      next({
        path: "/login",
        query: {
          from: to.fullPath,
        },
      });
    }
  }
  if (!to.meta.normalAuthPass) {
    let info =JSON.parse(sessionStorage.getItem("basicInfo"))
    if(info.role=="普通用户") {
      Message.error("没有权限访问")
      return 
    }
  }
  //更新basicInfo
  if (!/login/.test(from.path) && !/login/.test(to.path)) {
    userInfo().then(res => {
      sessionStorage.setItem("basicInfo", JSON.stringify(res.result));
    })
  }
  next();
});

export default router;