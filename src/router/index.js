import Vue from "vue";
import VueRouter from "vue-router";
import { getToken, setToken } from "@/utils/auth";
import { userInfo } from "@/api/user.js";
import Message from "@/components/message/index.js"
import normalRoutes from "@/router/normalRoutes";
import adminRoutes from "@/router/adminRoutes";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

let routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("@/views/login"),
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
        component: () =>
            import ("@/views/create"),
        meta: {
            title: "注册",
            requireAuth: false,
            normalAuthPass: true,
        },
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import ("@/views/about"),
        meta: {
            title: "关于twt",
            requireAuth: false,
            normalAuthPass: true,
        },
    }
];
normalRoutes[0].children = normalRoutes[0].children.concat(
    adminRoutes
);
routes = routes.concat(normalRoutes)

const router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,
});
// router.$addRoutes = (params) => {
//   router.matcher = new VueRouter({ // 重置路由规则
//     routes
//   }).matcher
//   router.addRoutes(params) // 添加路由
// }

router.beforeEach(async(to, from, next) => {
    let { token } = to.query
    if (token !== undefined) {
        setToken(token)
    }
    // 设置标签页title
    window.document.title =
        to.meta.title == undefined ?
        "天外天个人中心" :
        `${to.meta.title} - 天外天个人中心`;
    // 访问权限设置
    if (to.meta.requireAuth) {
        let token = getToken();
        if (!token) {
            next({
                path: "/login",
                query: {
                    from: to.path,
                },
            });
        }
    }
    //更新basicInfo
    let updateFlag = /login/.test(to.path) || /create/.test(to.path) || /about/.test(to.path) || /login/.test(from.path)
    if (!updateFlag) {
        let x = await userInfo().then(res => {
            sessionStorage.setItem("basicInfo", JSON.stringify(res.result));
            let { telephone } = res.result
            if ((telephone === null || telephone === '') && to.path !== '/userInfo') {
                if (from.path === '/userInfo') {
                    next({
                        path: "/userInfo",
                        query: {
                            mustPhone: 1
                        }
                    }, Message.error('您还未填写手机号信息，请更新手机号'));
                } else {
                    next({
                        path: "/userInfo",
                        query: {
                            mustPhone: 1
                        }
                    });
                }
            }
        })
        console.log(x)
    }

    if (!to.meta.normalAuthPass) {
        let info = JSON.parse(sessionStorage.getItem("basicInfo"))
        if (info.role == "普通用户") {
            Message.error("没有权限访问该页面")
            next({
                path: "/home",
            });
            return
        }
    }
    next();
});

export default router;