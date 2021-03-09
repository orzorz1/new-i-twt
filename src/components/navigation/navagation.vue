<template>
    <v-navigation-drawer bottom v-model="show" app temporary>
        <v-list-item>
            <v-list-item-avatar>
                <v-avatar
                    @click="delayTo('#/userInfo')"
                    color="blue"
                    style="color: black"
                    size="100"
                >
                    <v-icon dark> mdi-account-circle </v-icon>
                </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>{{ realname }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list nav dense>
            <v-list-item-group v-model="selectedItem" mandatory color="primary">
                <v-list-item
                    v-for="item in items"
                    :key="item.meta.title"
                    @click="$router.push(item.name)"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.meta.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{
                            item.meta.title
                        }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <template v-slot:append>
            <v-list-item @click="logout">
                <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>退出登录</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-navigation-drawer>
</template>

<script>
import Message from "@/components/message";
import { removeToken } from "@/utils/auth";
export default {
    name: "navigation",
    props: {
        drawer: Boolean,
    },
    data: () => ({
        show: false,
        selectedItem: "",
        items: [],
    }),
    watch: {
        drawer: {
            handler() {
                this.show = this.drawer;
            },
            immediate: true,
        },
        "$route.name": {
            handler(val) {
                this.freshInfo()
                this.getItems();
                this.items.forEach((ele, index) => {
                    if (ele.name == val) {
                        this.selectedItem = index;
                    }
                });
            },
            immediate: true,
        },
        show(val) {
            if (!val) {
                this.$emit("naviClose");
            }
        },
    },
    created() {
        this.freshInfo()
    },
    methods: {
        freshInfo(){
                    const info = JSON.parse(window.sessionStorage.getItem("basicInfo"));
        this.realname = info.realname;
        },
        getItems() {
            const { role } = JSON.parse(sessionStorage.getItem("basicInfo"));
            let data = [];
            this.$router.options.routes.forEach((ele) => {
                if (ele.name == "index") {
                    data = ele.children;
                }
            });
            if (role == "普通用户") {
                this.items = data.filter((ele) => {
                    return ele.meta.normalAuthPass;
                });
            } else {
                this.items = data;
            }
        },
        handleTo(x) {
            console.log(x);
        },
        logout() {
            removeToken();
            this.$router.push({ path: "/login" });
            sessionStorage.removeItem("basicInfo");
            Message.success("已登出当前账号");
        },
    },
};
</script>

<style></style>
