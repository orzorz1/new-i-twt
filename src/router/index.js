import Vue from "vue";
import VueRouter from "vue-router";
import { getToken } from "@/utils/auth";

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
    },
  },
  {
    path: "/create",
    name: "create",
    component: () => import("@/views/create"),
    meta: {
      title: "注册",
      requireAuth: false,
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
        },
      },
      {
        path: "upgrade",
        name: "upgrade",
        component: () => import("@/views/upgrade"),
        meta: {
          title: "账号升级",
          requireAuth: true,
        },
      },
      {
        path: "userInfo",
        name: "userInfo",
        component: () => import("@/views/userInfo"),
        meta: {
          title: "个人信息",
          requireAuth: true,
        },
      },
      {
        path: "account",
        name: "account",
        component: () => import("@/views/account"),
        meta: {
          title: "账号关联",
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/views/404"),
    meta: {
      title: "404",
      requireAuth: false,
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
  next();
});

export default router;
