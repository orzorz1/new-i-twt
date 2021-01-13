<template>
  <v-navigation-drawer bottom v-model="show" app temporary>
    <!-- <v-list-item>
            <v-list-item-avatar>
                <v-img
                    src="https://randomuser.me/api/portraits/men/78.jpg"
                ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>John Leider</v-list-item-title>
            </v-list-item-content>
        </v-list-item> -->

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item-group v-model="selectedItem" mandatory color="primary">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="$router.push(item.path)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <v-list-item
          @click="logout"
        >
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
    items: [
      { title: "首页", icon: "mdi-home", path: "/home" },
      { title: "个人信息", icon: "mdi-account-edit", path: "/userInfo" },
      // {
      //   title: "账号注册",
      //   icon: "mdi-account-multiple-plus",
      //   path: "/create",
      // },
      // { title: '账号关联', icon: 'mdi-forum', path: '/account' },
    ],
  }),
  watch: {
    drawer: {
      handler() {
        this.show = this.drawer;
      },
      immediate: true,
    },
    "$route.path": {
      handler(val) {
        switch (val.split("/")[1]) {
          case "home":
            this.selectedItem = 0;
            break;
          case "userInfo":
            this.selectedItem = 1;
            break;
          default:
            this.selectedItem = 2;
        }
      },
      immediate: true,
    },
    show(val) {
      if (!val) {
        this.$emit("naviClose");
      }
    },
  },
  methods: {
    handleTo(x) {
      console.log(x);
    },
    logout() {
      removeToken();
      this.$router.push({ path: "/login" });
      Message.success("已登出当前账号");
    },
  },
};
</script>

<style></style>
