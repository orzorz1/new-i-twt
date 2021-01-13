<template>
  <v-app class="bg">
    <v-content>
      <v-container py-5>
        <v-layout align-center justify-center py-3>
          <v-flex xs12 sm8 md4>
            <v-card flat class="px-2 pb-3 login-card">
              <v-card-text>
                <v-layout justify-center pt-2>
                  <v-avatar size="60px">
                    <img src="@/assets/logo.png" alt="twt" />
                  </v-avatar>
                </v-layout>
                <v-layout justify-center py-3>
                  <div class="headline">天外天账户登录</div>
                </v-layout>
                <v-tabs centered fixed-tabs v-model="tab">
                  <v-tabs-slider color="#1E88E5"> </v-tabs-slider>
                  <v-tab href="#tab-1">密码登录</v-tab>
                  <v-tab href="#tab-2">短信登录</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                  <v-tab-item value="tab-1" style="paddingtop: 15px">
                    <v-form>
                      <v-text-field
                        name="username"
                        label="邮箱/用户名/学号"
                        type="text"
                        required
                        v-model="username"
                        :rules="usernameRules"
                      ></v-text-field>
                      <v-text-field
                        id="password"
                        name="密码"
                        label="密码"
                        :append-icon="showPsw ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPsw = !showPsw"
                        :type="showPsw ? 'text' : 'password'"
                        required
                        v-model="password"
                        :rules="passwordRules"
                      ></v-text-field>
                    </v-form>
                    <v-card-actions>
                      <v-btn block color="info" @click="loginCommon"
                        >登录</v-btn
                      >
                    </v-card-actions>
                  </v-tab-item>
                  <v-tab-item value="tab-2" style="paddingtop: 15px">
                    <v-form>
                      <v-text-field
                        name="phone"
                        label="手机号"
                        type="text"
                        required
                        v-model="phone"
                        :rules="phoneRules"
                      >
                        <template v-slot:append>
                          <v-btn @click="sendVerifyCode" text>发送验证码</v-btn>
                        </template>
                      </v-text-field>
                      <v-text-field
                        id="verify"
                        name="验证码"
                        label="验证码"
                        type="text"
                        required
                        v-model="verify"
                        :rules="verifyRules"
                      ></v-text-field>
                    </v-form>
                    <v-card-actions>
                      <v-btn block color="info" @click="loginPhone">登录</v-btn>
                    </v-card-actions>
                  </v-tab-item>
                </v-tabs-items>
                <div class="func-group">
                  <a href="/create">注册账号</a>
                  <a href="/find">找回账号/密码</a>
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { login, loginWithPhone, loginVerifyCode } from "@/api/user";
import Message from "@/components/message";
import { getUrlParam } from "@/utils/common";
import { setToken } from "@/utils/auth";

export default {
  name: "login",
  data() {
    return {
      from: "",
      showPsw: false,
      tab: "",
      username: "",
      usernameRules: [(v) => !!v || "请输入邮箱/用户名/学号"],
      password: "",
      passwordRules: [(v) => !!v || "请输入密码"],
      phone: "",
      phoneRules: [
        (v) => !!v || "请输入手机号",
        (v) =>
          (v &&
            (function (x) {
              let s = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
              return s.test(x);
            })(v)) ||
          "请您输入正确的手机号",
      ],
      verify: "",
      verifyRules: [
        (v) => !!v || "请输入验证码",
        (v) =>
          (v &&
            (function (x) {
              let s = /^\d{6}$/;
              return s.test(x);
            })(v)) ||
          "请您输入合法的验证码",
      ],
    };
  },
  methods: {
    loginCommon() {
      console.log(this.username, this.password);
      let data = {
        account: this.username,
        password: this.password,
      };
      login(data)
        .then((value) => {
          console.log(value);
          Message.success(`登录成功`);
          setToken(value.result.token);
          this.from = getUrlParam("from");
          if (this.from) {
            this.$router.push({ path: this.from });
          } else {
            this.$router.push({ path: "/home" });
          }
        })
        .catch((value) => {
          console.log(value);
        });
    },
    loginPhone() {
      console.log(this.phone, this.verify);
      let data = {
        phone: this.phone,
        code: this.verify,
      };
      loginWithPhone(data)
        .then((value) => {
          console.log(value);
          Message.success(`登录成功`);
          setToken(value.result.token);
          this.from = getUrlParam("from");
          if (this.from) {
            this.$router.push({ path: this.from });
          } else {
            this.$router.push({ path: "/home" });
          }
        })
        .catch((value) => {
          console.log(value);
        });
    },
    sendVerifyCode() {
      let data = { phone: this.phone };
      loginVerifyCode(data)
        .then((value) => {
          console.log(value);
          Message.success(`短信发送成功`);
        })
        .catch((value) => {
          console.log(value);
        });
    },
  },
  created() {
    this.from = getUrlParam("from");
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background: #026fce;
  background-image: linear-gradient(
    45deg,
    #3481d1 1%,
    #0073d8 48%,
    #004ea2 97%
  );
  .login-card {
    margin-top: 20%;
  }
  .func-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
    a {
      text-decoration: none;
    }
  }
}
</style>