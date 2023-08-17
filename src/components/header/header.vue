<template>
  <v-app-bar app flat height="80px">
    <v-app-bar-nav-icon v-if="hasNavi" @click="open"></v-app-bar-nav-icon>
    <div class="space-div"></div>
    <v-avatar class="twt-logo" tile>
      <img src="@/assets/logo.png" alt="twt" />
    </v-avatar>
    <v-toolbar-title class="twt-title">个人中心</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y auto>
      <template v-slot:activator="{ on }">
        <v-btn depressed v-on="on">
          {{ username }}
        </v-btn>
      </template>
      <v-card flat class="drop-card">
        <v-list-item>
          <v-list-item-avatar color="grey darken-3">
            <v-img alt="avatar" :src="avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-text class="realname">{{ realname }}</v-list-item-text>
            <v-list-item-text>{{ userNumber }}</v-list-item-text>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-row align="center" justify="end">
            <v-btn text @click="logout"> 退出 </v-btn>
          </v-row>
        </v-list-item>
      </v-card>
    </v-menu>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="text-h5">账号升级提醒</span>
        </v-card-title>
        <v-card-text>
          您的账号状态可升级为：<b>{{ upgradeInfo }}</b>
        </v-card-text>
        <v-card-text> 点击确定即可前往详情页面 </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="toUpgrade"> 确定 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import Message from "@/components/message";
import { removeToken } from "@/utils/auth";
import defaultAvatar from "@/assets/avatar.png";
export default {
  name: "Header",
  props: {
    hasNavi: Boolean,
  },
  data: () => ({
    drawer: true,
    username: "",
    realname: "",
    userNumber: "",
    stuType: "",
    avatar: defaultAvatar,
    upgradeInfo: "",
    dialog: false,
  }),
  methods: {
    open() {
      this.$emit("naviOpen");
    },
    logout() {
      removeToken();
      this.$router.push({ path: "/login" });
      sessionStorage.removeItem("basicInfo");
      Message.success("已登出当前账号");
    },
    toUpgrade() {
      this.dialog = false;
      this.$router.push({ path: "/upgrade" });
    },
  },
  created() {
    let info = JSON.parse(sessionStorage.getItem("basicInfo"));
    if (info.upgradeNeed && info.upgradeNeed.length) {
      this.upgradeInfo = info.upgradeNeed[0].name;
      this.dialog = true;
    }
    this.username = info.nickname;
    this.realname = info.realname;
    this.userNumber = info.userNumber;
    this.stuType = info.stuType;
    if (info.avatar) {
      this.avatar = info.avatar;
    }
  },
  watch: {
    "$router.path": {
      handler() {
        this.$forceUpdate();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/utils/main.scss";
.space-div {
  width: getVw(24);
}
.twt-title {
  margin-left: 10px;
}
.drop-card {
  padding: 16px;
  font-size: 16px;
  .realname {
    font-weight: bold;
  }
  .brief {
    font-size: 14px;
  }
  .func {
    display: flex;
    justify-content: flex-end;
  }
}

@media screen and (max-width: 700px) {
  .twt-title {
    font-size: 16px;
    margin-left: 0;
  }
  .twt-logo {
    height: 32px !important;
    width: 32px !important;
  }
}
</style>
