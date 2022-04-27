<template>
    <v-app>
        <Header :hasNavi="false"/>
        <Footer/>
        <v-main class="blue-grey lighten-5">
            <v-container style="padding: 0">
                <v-row justify="center" no-gutters>
                    <v-col xl="9" lg="10" md="12" sm="12" xs="12">
                        <v-container>
                            <v-tabs centered fixed-tabs v-model="tab">
                                <v-tabs-slider color="#1E88E5"></v-tabs-slider>
                                <v-tab href="#tab-1">个人账号</v-tab>
                                <!-- 临时关闭 -->
                                <!-- <v-tab href="#tab-2" disabled>组织账号</v-tab> -->
                            </v-tabs>
                            <v-tabs-items v-model="tab">
                                <v-tab-item value="tab-1" style="padding: 15px">
                                    <!-- <v-banner width="85%" style="position: relative; margin: 0 auto"
                                              >自2017级起，曾在天津大学就读并已注册天外天个人账号的新生、新入职教师，只需登录已有账号升级绑定新的学/工号即可，无需重新注册。
                                              <template v-slot:actions="{ dismiss }">
                                                <v-btn text color="primary" @click="dismiss"> 确定 </v-btn>
                                              </template>
                                            </v-banner> -->
                                    <v-card
                                        tile
                                        flat
                                        style="width: 80%; position: relative; margin: 0 auto"
                                    >
                                        <v-card-title>填写注册信息</v-card-title>
                                        <v-form ref="form1" v-model="valid" lazy-validation>
                                            <v-text-field
                                                autocomplete="new-password"
                                                v-model="username"
                                                :counter="30"
                                                :rules="usernameRules"
                                                label="用户名"
                                                placeholder="6-30个字符，以字母开头，可以是字母、数字、下划线"
                                                prepend-icon="mdi-account"
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                autocomplete="new-password"
                                                v-model="password"
                                                label="密码"
                                                type="password"
                                                @blur="getPassword(password)"
                                                :rules="passwordRules"
                                                placeholder="请输入6位以上密码，区分大小写"
                                                prepend-icon="mdi-lock"
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="surepassword"
                                                label="确认密码"
                                                type="password"
                                                :rules="surepasswordRules"
                                                placeholder="请再次输入您设置的密码"
                                                prepend-icon="mdi-lock"
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="phone"
                                                label="手机号"
                                                :rules="phoneNumberRules"
                                                prepend-icon="mdi-cellphone"
                                                placeholder="请输入手机号"
                                                required
                                            >
                                                <template v-slot:append>
                                                    <v-btn
                                                        :disabled="sendTime !== 30"
                                                        @click="sendVerifyCode"
                                                        text
                                                    >
                                                        {{
                                                            sendTime === 30
                                                                ? "发送验证码"
                                                                : `${sendTime}s后重试`
                                                        }}
                                                    </v-btn>
                                                </template>
                                            </v-text-field>
                                            <v-text-field
                                                v-model="verifycode"
                                                label="验证码"
                                                :rules="verifyRules"
                                                prepend-icon="mdi-shield-check"
                                                placeholder="请输入获取的验证码"
                                                required
                                            ></v-text-field>
                                            <v-text-field
                                                v-model="email"
                                                label="邮箱"
                                                :rules="emailRules"
                                                placeholder="请输入用于找回密码的邮箱"
                                                prepend-icon="mdi-email"
                                                required
                                            ></v-text-field>
                                            <v-divider
                                                style="
                          margin-top: 10px;
                          margin-bottom: 15px;
                          width: 150%;
                        "
                                            ></v-divider>
                                            <v-text-field
                                                v-model="schoolnumber"
                                                label="学号/工资号"
                                                :rules="schoolnumberRules"
                                                prepend-icon="mdi-badge-account-horizontal"
                                                placeholder="请输入您的学号/工资号"
                                                required
                                            ></v-text-field>

                                            <v-select
                                                prepend-icon="mdi-account-check"
                                                :items="credentialsTypes"
                                                label="证件类型"
                                                v-model="credentialsType"
                                            ></v-select>
                                            <!-- 身份证 -->
                                            <v-text-field
                                                v-if="credentialsType == '1'"
                                                v-model="idnumber"
                                                label="证件号"
                                                :rules="idnumberRules"
                                                prepend-icon="mdi-card-account-details"
                                                placeholder="若最后一位为X，请大写"
                                                required
                                            >
                                            </v-text-field>
                                            <!-- 台湾 -->
                                            <v-text-field
                                                v-if="credentialsType == '2'"
                                                v-model="idnumber"
                                                label="证件号"
                                                :rules="twCardRules"
                                                prepend-icon="mdi-card-account-details"
                                                placeholder=""
                                                required
                                            >
                                            </v-text-field>
                                            <!-- 港澳通行证 -->
                                            <v-text-field
                                                v-if="credentialsType == '3'"
                                                v-model="idnumber"
                                                label="证件号"
                                                :rules="hkmacaoCardRules"
                                                prepend-icon="mdi-card-account-details"
                                                placeholder=""
                                                required
                                            >
                                            </v-text-field>
                                            <!-- 护照 -->
                                            <v-text-field
                                                v-if="credentialsType == '4'"
                                                v-model="idnumber"
                                                label="证件号"
                                                :rules="passportRules"
                                                prepend-icon="mdi-card-account-details"
                                                placeholder=""
                                                required
                                            >
                                            </v-text-field>
                                            <!-- 香港身份证 -->
                                            <v-text-field
                                                v-if="credentialsType == '5'"
                                                v-model="idnumber"
                                                label="证件号"
                                                :rules="hkIdRules"
                                                prepend-icon="mdi-card-account-details"
                                                placeholder="请输入"
                                                required
                                            >
                                            </v-text-field>
                                            <!-- 澳门身份证 -->
                                            <v-text-field
                                                v-if="credentialsType == '6'"
                                                v-model="idnumber"
                                                label="证件号"
                                                :rules="macaoIdRules"
                                                prepend-icon="mdi-card-account-details"
                                                placeholder="输入时省略括号"
                                                required
                                            >
                                            </v-text-field>
                                            <v-checkbox
                                                v-model="checkbox1"
                                                :rules="checkRules"
                                                required
                                            >
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
                                                color="primary"
                                                @click="checkform1"
                                                width="80%"
                                                height="50"
                                                style="
                          position: relative;
                          left: 50%;
                          transform: translateX(-50%);
                        "
                                            >
                                                提交
                                            </v-btn>
                                        </v-form>
                                    </v-card>
                                </v-tab-item>
                                <!-- <v-tab-item value="tab-2" style="padding: 15px">
                                        <v-banner width="85%" style="position: relative; margin: 0 auto">
                                          组织账号是面向天津大学校内机关、部门、学院及各类社团、学生组织提供的特殊账号，可以在天外天相关系统中使用为组织提供的特殊功能。
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
                                              style="width: 95%; position: relative; margin: 0 auto"
                                              required
                                            ></v-text-field>
                                            <v-card-text style="color: #1e88e5; font-size: 18px">
                                              组织类型</v-card-text
                                            >
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
                                      </v-tab-item> -->
                            </v-tabs-items>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import {register, verifyCode} from "@/api/user";
import Footer from "@/components/footer/footer.vue";
import Header from "@/components/header/header.vue";
// import Navigation from "@/components/navigation/navagation";
import Message from "@/components/message";

let thePassword = "";
export default {
    name: "create",
    components: {
        Footer,
        Header,
        // Navigation,
    },
    data: () => ({
        drawer: false,
        tab: null,
        row: null,
        valid: true,
        credentialsType: "1",
        credentialsTypes: [
            {
                text: "中华人民共和国居民身份证",
                value: "1",
            },
            {
                text: "台湾居民来往大陆通行证",
                value: "2",
            },
            {
                text: "港澳居民来往内地通行证",
                value: "3",
            },
            {
                text: "护照",
                value: "4",
            },
            {
                text: "香港居民身份证",
                value: "5",
            },
            {
                text: "澳门居民身份证",
                value: "6",
            },
        ],
        username: "",
        password: "",
        surepassword: "",
        email: "",
        schoolnumber: "",
        idnumber: "",
        phone: "",
        accountName: "",
        accountNumber: "",
        verifycode: "",
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
            (v) => {
                return (
                    v.length >= 6 ||
                    "请输入正确的学号/工资号"
                );
            },
        ],
        idnumberRules: [
            (v) => !!v || "请输入您的证件号码",
            (v) =>
                (v.length == 18 &&
                    v.replace(/[^0-9]/g, "").length >= 17 &&
                    (v[17] == "X" || (v[17] >= "0" && v[17] <= "9"))) ||
                "请输入正确的中华人民共和国居民身份证号码",
        ],
        twCardRules: [
            (v) => !!v || "请输入您的证件号码",
            (v) => {
                const reg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/;
                return reg.test(v.trim()) || "请输入正确的台湾居民来往大陆通行证号码";
            },
        ],
        hkmacaoCardRules: [
            (v) => !!v || "请输入您的证件号码",
            (v) => {
                const reg = /^[H|h|M|m](\d{8}|\d{10})$/;
                return reg.test(v.trim()) || "请输入正确的港澳居民来往内地通行证号码";
            },
        ],
        passportRules: [
            (v) => !!v || "请输入您的证件号码",
            (v) => {
                const reg =
                    /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
                return reg.test(v.trim()) || "请输入正确的护照号码";
            },
        ],
        hkIdRules: [
            (v) => !!v || "请输入您的证件号码",
            (v) => {
                const reg = /^[A-Z]{1,2}[0-9]{6,10}\([0-9A-Z]\)$/;
                return reg.test(v.trim()) || "请输入正确的香港居民身份证号码";
            },
        ],
        macaoIdRules: [
            (v) => !!v || "请输入您的证件号码",
            (v) => {
                const reg = /^[1|5|7][0-9]{6}\([0-9A-Z]\)$/;
                return reg.test(v.trim()) || "请输入正确的澳门居民身份证号码";
            },
        ],
        phoneNumberRules: [
            (v) => !!v || "请输入手机号",
            (v) =>
                (v &&
                    (function (x) {
                        let s =
                            /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
                        return s.test(x);
                    })(v)) ||
                "请您输入正确的手机号",
        ],
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
        organizationNameRules: [
            (v) => !!v || "请输入组织的名称",
            (v) => v.length <= 20 || "组织名称须不超过20字",
        ],
        checkRules: [(v) => v],
        checkbox1: false,
        checkbox2: false,
        loading1: false,
        loading2: false,
        sendTime: 30,
    }),
    methods: {
        checkform1() {
            this.loading1 = true;
            if (!this.$refs.form1.validate()) {
                this.loading1 = false;
                this.$message.error("表单填写有误，请根据提示信息修改表单内容");
            }
            console.log(this.loading1);
            if (this.loading1) {
                let data = {
                    userNumber: this.schoolnumber,
                    nickname: this.username,
                    phone: this.phone,
                    verifyCode: this.verifycode,
                    password: this.password,
                    email: this.email,
                    idNumber: this.idnumber,
                };
                register(data)
                    .then(() => {
                        this.loading1 = false;
                        Message.success(
                            `注册成功，恭喜成为天外天用户，后续您可以通过账号/学号(工资号)/邮箱/手机号登录`
                        );
                        setTimeout(() => {
                            this.$router.push({path: "/login"});
                        }, 1500);
                    })
                    .catch((err) => {
                        Message.error(err);
                        this.loading1 = false;
                    });
                this.$refs.form1.resetValidation();
            }
        },
        checkform2() {
            this.loading2 = true;
            this.$refs.form2.validate();
            if (!this.$refs.form2.validate()) this.loading2 = false;
        },
        getPassword(p) {
            thePassword = p;
        },
        sendVerifyCode() {
            let data = {phone: this.phone};
            if (this.phone.length === 11) {
                this.sendTime--;
                let sendInterval = setInterval(() => {
                    this.sendTime--;
                    if (this.sendTime === 0) {
                        clearInterval(sendInterval);
                        this.sendTime = 30;
                    }
                }, 1000);
                verifyCode(data)
                    .then((value) => {
                        console.log(value);
                        Message.success(`短信发送成功`);
                    })
                    .catch((value) => {
                        console.log(value);
                    });
            } else {
                this.$message.error("请输入11位手机号");
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
