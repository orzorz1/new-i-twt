<template>
  <v-container>
    <v-tabs centered fixed-tabs v-model="tab">
      <v-tabs-slider color="#1E88E5"> </v-tabs-slider>
      <v-tab href="#tab-1">个人账号</v-tab>
      <v-tab href="#tab-2">组织账号</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1" style="padding: 15px"
        ><v-banner width="85%" style="position: relative; margin: 0 auto"
          >自2017级起，曾在天津大学就读并已注册天外天个人账号的新生、新入职教师，只需登录已有账号升级绑定新的学/工号即可，无需重新注册。
          <template v-slot:actions="{ dismiss }">
            <v-btn text color="primary" @click="dismiss"> 确定 </v-btn>
          </template>
        </v-banner>
        <v-card
          tile
          flat
          style="width: 80%; position: relative; margin: 0 auto"
        >
          <v-card-title> 填写注册信息</v-card-title>
          <v-form ref="form1" v-model="valid" lazy-validation>
            <v-text-field
              v-model="username"
              :counter="30"
              :rules="usernameRules"
              label="用户名"
              placeholder="6-30个字符，以字母开头，可以是字母、数字、下划线"
              prepend-icon="mdi-account"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="密码"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              @blur="getPassword(password)"
              :rules="passwordRules"
              placeholder="请输入6位以上密码，区分大小写"
              prepend-icon="mdi-lock"
              required
            ></v-text-field>
            <v-text-field
              v-model="surepassword"
              label="确认密码"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
              :rules="surepasswordRules"
              placeholder="请再次输入您设置的密码"
              prepend-icon="mdi-lock"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="邮箱"
              :rules="emailRules"
              placeholder="用于找回您的密码，请牢记！"
              prepend-icon="mdi-email"
              required
            ></v-text-field>
            <v-divider class="mx-4"></v-divider>
            <v-text-field
              v-model="schoolnumber"
              label="学号/工资号"
              :rules="schoolnumberRules"
              prepend-icon="mdi-badge-account-horizontal"
              required
            ></v-text-field>
            <v-text-field
              v-model="idnumber"
              label="身份证号"
              :rules="idnumberRules"
              prepend-icon="mdi-card-account-details"
              hint="若最后一位为X，请大写"
              required
            ></v-text-field>
            <v-checkbox v-model="checkbox1" :rules="checkRules" required>
              <template v-slot:label>
                <p style="position: relative; top: 8px">
                  我已经阅读并同意
                  <a
                    target="_blank"
                    style="text-decoration: none"
                    href="https://i.twt.edu.cn/agreement.html"
                    @click.stop
                  >
                    《天外天用户协议》
                  </a>
                </p>
              </template>
            </v-checkbox>
            <v-btn
              class="mr-4"
              :loading="loading1"
              :disabled="loading1"
              color="secondary"
              @click="checkform1"
              width="80%"
              height="50"
              style="position: relative; left: 50%; transform: translateX(-50%)"
            >
              提交
            </v-btn>
          </v-form>
        </v-card>
      </v-tab-item>
      <v-tab-item value="tab-2">
        <v-banner width="85%" style="position: relative; margin: 0 auto"
          >组织账号是面向天津大学校内机关、部门、学院及各类社团、学生组织提供的特殊账号，可以在天外天相关系统中使用为组织提供的特殊功能。
          <template v-slot:actions="{ dismiss }">
            <v-btn text color="primary" @click="dismiss"> 确定 </v-btn>
          </template>
        </v-banner>
        <v-card
          tile
          flat
          style="width: 80%; position: relative; margin: 0 auto"
        >
          <v-card-title> 申请人信息</v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="accountName"
              prepend-icon="mdi-account"
              dense
              readonly
              filled
              required
            ></v-text-field>
            <v-text-field
              v-model="accountNumber"
              prepend-icon="mdi-badge-account-horizontal"
              dense
              readonly
              filled
              required
            ></v-text-field>
          </v-form>
        </v-card>
        <v-card
          tile
          flat
          style="width: 80%; position: relative; margin: 0 auto"
        >
          <v-card-title> 填写组织信息</v-card-title>
          <v-form ref="form2" v-model="valid" lazy-validation>
            <v-text-field
              v-model="organizationName"
              label="组织名称（请填写组织全称，不超过20字）"
              :counter="20"
              :rules="organizationNameRules"
              required
            ></v-text-field>
            <v-card-text style="color: #1e88e5"> 组织类型</v-card-text>
            <v-radio-group v-model="row" row>
              <v-radio label="学校机构" value="0"></v-radio>
              <v-radio label="学生组织" value="1"></v-radio>
            </v-radio-group>
            <v-checkbox v-model="checkbox2" :rules="checkRules" required>
              <template v-slot:label>
                <p style="position: relative; top: 8px">
                  我已经阅读并同意
                  <a
                    target="_blank"
                    style="text-decoration: none"
                    href="https://support.twt.edu.cn/topic/46/%E5%A4%A9%E5%A4%96%E5%A4%A9%E7%BB%84%E7%BB%87%E8%B4%A6%E5%8F%B7%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE"
                    @click.stop
                  >
                    《天外天组织账号用户协议》
                  </a>
                </p>
              </template>
            </v-checkbox>
            <v-btn
              class="mr-4"
              :loading="loading2"
              :disabled="loading2"
              color="secondary"
              @click="checkform2"
              width="80%"
              height="50"
              style="position: relative; left: 50%; transform: translateX(-50%)"
            >
              提交
            </v-btn>
          </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
let thePassword = "";
export default {
  name: "create",
  data: () => ({
    tab: null,
    row: null,
    valid: true,
    show1: false,
    show2: false,
    username: "",
    password: "",
    surepassword: "",
    email: "",
    schoolnumber: "",
    idnumber: "",
    accountName: "刘宏伟",
    accountNumber: "3020205094",
    organizationName: "",
    usernameRules: [
      (v) => !!v || "请输入您想要的用户名",
      (v) =>
        (v && v.length >= 6 && v.length <= 30) || "用户名的长度须为6-30个字符",
      (v) =>
        (v && ((v[0] >= "a" && v[0] <= "z") || (v[0] >= "A" && v[0] <= "Z"))) ||
        "用户名须以字母开头",
      (v) =>
        (v && v.replace(/\w/g, "") == "") || "用户名须由数字、字母或下划线组成",
    ],
    passwordRules: [
      (v) => !!v || "请输入您想要的密码",
      (v) => (v && v.length >= 6) || "密码的长度须大于6个字符",
    ],
    surepasswordRules: [
      (v) => !!v || "请确定您的密码",
      (v) => v == thePassword || "两次输入的密码不相符",
    ],
    emailRules: [
      (v) => !!v || "请输入您的邮箱",
      (v) =>
        (v &&
          (function (x) {
            let s = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            return s.test(x);
          })(v)) ||
        "请您输入正确的邮箱",
    ],
    schoolnumberRules: [
      (v) => !!v || "请输入您的学号/工资号",
      (v) =>
        v.replace(/[^0-9]/g, "").length == v.length ||
        "请输入正确的学号/工资号",
    ],
    idnumberRules: [
      (v) => !!v || "请输入您的身份证号",
      (v) =>
        (v.length == 18 &&
          v.replace(/[^0-9]/g, "").length >= 17 &&
          (v[17] == "X" || (v[17] >= "0" && v[17] <= "9"))) ||
        "请输入正确的身份证号",
    ],
    organizationNameRules: [
      (v) => !!v || "请输入组织的名称",
      (v) => v.length <= 20 || "组织名称须不超过20字",
    ],
    checkRules: [(v) => v],
    checkbox1: false,
    checkbox2: false,
    loading1: false,
    loading2: false,
  }),
  methods: {
    checkform1() {
      this.loading1 = true;
      if (!this.$refs.form1.validate()) this.loading1 = false;
    },
    checkform2() {
      this.loading2 = true;
      this.$refs.form2.validate();
      if (!this.$refs.form2.validate()) this.loading2 = false;
    },
    getPassword(p) {
      thePassword = p;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>