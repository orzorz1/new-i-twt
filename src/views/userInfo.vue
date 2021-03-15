<template>
    <v-container>
        <v-card elevation="1">
            <v-card-title>基本资料</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-text v-if="showSke">
                <v-row>
                    <v-col cols="12" sm="4" md="3">
                        <v-avatar rounded color="blue" size="100">
                            {{ basicInfo.realname }}
                        </v-avatar>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="9" sm="4" md="3" align-self="center">
                        <v-file-input
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="选择头像"
                            prepend-icon="mdi-camera"
                            label="头像"
                            disabled
                        ></v-file-input>
                    </v-col>
                    <!-- <v-col cols="6" align-self="center">
                        <v-btn dense>更换头像</v-btn>
                    </v-col> -->
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="6" class="left body-1">
                        用户ID：{{ basicInfo.userNumber }}
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="left body-1">
                        姓名：{{ basicInfo.realname }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="6" class="left body-1">
                        角色：{{ basicInfo.role }}
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="left body-1">
                        性别：{{ basicInfo.gender }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="6" class="left body-1">
                        学院：{{ basicInfo.department }}
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="left body-1">
                        专业：{{ basicInfo.major }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="6" class="left body-1">
                        类型：{{ basicInfo.stuType }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="9" sm="4" md="3" class="left body-1">
                        <v-text-field
                            label="昵称"
                            autocomplete="off"
                            v-model="basicInfo.nickname"
                            :rules="[(v) => !!v || '不能为空']"
                            ref="nickname"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col
                        cols="9"
                        sm="4"
                        md="3"
                        offset-md="3"
                        offset-sm="2"
                        class="left body-1"
                    >
                        <v-text-field
                            label="邮箱"
                            autocomplete="off"
                            v-model="basicInfo.email"
                            :rules="emailRules"
                            ref="email"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="10" offset="1" sm="2" offset-sm="4">
                        <v-btn block color="primary" @click="updateInfo">
                            更新信息
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="9" sm="4" md="3" class="left body-1">
                        <v-text-field
                            label="手机"
                            autocomplete="off"
                            v-model="basicInfo.telephone"
                            :rules="phoneRules"
                            ref="telephone"
                        >
                            <template v-slot:append>
                                <v-btn @click="sendVerifyCode" text
                                    >发送验证码</v-btn
                                >
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col
                        cols="9"
                        sm="4"
                        md="3"
                        offset-md="3"
                        offset-sm="2"
                        class="left body-1"
                    >
                        <v-text-field
                            label="验证码"
                            :rules="[(v) => !!v || '不能为空']"
                            autocomplete="off"
                            v-model="Vcode"
                            ref="vcode"
                            require
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="10" offset="1" sm="2" offset-sm="4">
                        <v-btn block color="primary" @click="updatePhone">
                            更新手机号
                        </v-btn>
                    </v-col>
                </v-row>
                <v-divider class="mx-4"></v-divider>
            </v-card-text>
            <v-card-title>密码修改</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="9" sm="4" md="3" class="left body-1">
                        <v-text-field
                            label="新密码"
                            autocomplete="off"
                            v-model="newPWD"
                            :rules="newPWDRules"
                            type="password"
                            ref="pwd"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="9"
                        sm="4"
                        md="3"
                        offset-md="3"
                        offset-sm="2"
                        class="left body-1"
                    >
                        <v-text-field
                            label="确认新密码"
                            autocomplete="off"
                            v-model="rePWD"
                            :rules="[diffPWD]"
                            type="password"
                            ref="repwd"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="10" offset="1" sm="2" offset-sm="4">
                        <v-btn block color="error" @click="changePWD">
                            确认修改密码
                        </v-btn>
                    </v-col>
                </v-row>
                <v-divider class="mx-4"></v-divider>
            </v-card-text>
            <v-card-title>转专业申请</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="9" sm="6" md="4">
                        <v-select
                            v-model="changeMajorSelect.destDepartmentId"
                            :items="department"
                            item-text="name"
                            item-value="id"
                            label="转入的学院"
                            outlined
                            dense
                        ></v-select>
                    </v-col>
                    <v-col
                        cols="9"
                        sm="6"
                        md="4"
                        offset-md="2"
                        offset-sm="0"
                        class="left body-1"
                    >
                        <v-select
                            :disabled="changeMajorSelect.destDepartmentId == ''"
                            v-model="changeMajorSelect.destMajorId"
                            :items="major"
                            item-text="name"
                            item-value="id"
                            label="转入的专业"
                            outlined
                            dense
                        ></v-select>
                    </v-col>
                    <v-col cols="10" offset="1" sm="2" offset-sm="4">
                        <v-btn block color="error" @click="changeMajor">
                            申请修改专业
                        </v-btn>
                    </v-col>
                </v-row>
                <v-divider class="mx-4"></v-divider>
            </v-card-text>
            <v-card-title>我的转专业申请记录</v-card-title>
            <v-card-text>
                <v-row
                    class="ml-1"
                    v-for="(item, index) in appAll"
                    :key="index"
                >
                    转入专业：{{ item.destDepartment.name }}&nbsp; 转入学院：{{
                        item.destMajor.name
                    }}&nbsp; 申请状态：{{ getStatus(item.status) }}
                </v-row>
            </v-card-text>
            <v-skeleton-loader
                v-if="!showSke"
                type="table-heading, list-item-two-line, list-item-three-line, list-item-two-line, list-item-three-line"
            ></v-skeleton-loader>
        </v-card>
    </v-container>
</template>

<script>
import {
    // changeInfo,
    changePhone,
    changePWD,
    getVcode,
    getDepartmentAll,
    getMajorByDepartment,
    changeMajor,
    getApplicationStatus,
    updateNickname,
    updateEmail,
} from "@/api/user.js";
export default {
    name: "userInfo",
    data: () => ({
        Vcode: "",
        basicInfo: JSON.parse(sessionStorage.getItem("basicInfo")),
        formHasErrors: false,
        newPWD: "",
        rePWD: "",
        emailRules: [
            (value) => !!value || "不能为空",
            (value) => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || "格式错误";
            },
        ],
        phoneRules: [
            (value) => !!value || "不能为空",
            (value) => {
                return (
                    /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(
                        value
                    ) || "格式错误"
                );
            },
        ],
        newPWDRules: [
            (v) => !!v || "不能为空",
            (v) => (v && v.length >= 6) || "密码的长度须大于6个字符",
        ],
        showSke: false,
        major: [],
        department: [],
        changeMajorSelect: { destDepartmentId: "", destMajorId: "" },
        appAll: [],
    }),
    mounted() {
        this.showSke = true;
        getDepartmentAll().then((res) => {
            this.department = res.result;
        });
        // setTimeout(() => {
        //     this.showSke = true;
        // }, 100);
        getApplicationStatus().then((res) => {
            this.appAll = res.result;
        });
    },
    computed: {
        form() {
            return {
                email: this.basicInfo.email,
                telephone: this.basicInfo.telephone,
            };
        },
    },
    watch: {
        "changeMajorSelect.destDepartmentId": {
            handler(newVal) {
                getMajorByDepartment(newVal).then((res) => {
                    this.major = res.result.majors;
                    if (this.major.length === 0) {
                        this.changeMajorSelect.destMajorId = 0;
                    }
                });
            },
        },
    },
    methods: {
        updateInfo() {
            if (this.basicInfo.nickname == "") {
                this.$refs["nickname"].validate(true);
            } else {
                updateNickname({ username: this.basicInfo.nickname }).then(
                    (res) => {
                        this.$message.success(`昵称修改${res.message}`);
                    }
                );
            }
            if (
                this.form.email == "" ||
                !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    this.form.email
                )
            ) {
                this.$refs["email"].validate(true);
            } else {
                updateEmail({ email: this.form.email }).then((res) => {
                    this.$message.success(`邮箱修改${res.message}`);
                });
            }
        },
        getStatus(s) {
            if (s == 1) {
                return "申请成功";
            } else if (s == 2) {
                return "申请失败";
            } else {
                return "审核中";
            }
        },
        changeMajor() {
            changeMajor(this.changeMajorSelect)
                .then(() => {
                    this.$message.success("申请成功，请联系辅导员通过");
                })
                .catch((e) => {
                    this.$message.error(e);
                });
        },
        sendVerifyCode() {
            let data = { phone: this.form.telephone };
            getVcode(data)
                .then(() => {
                    // console.log(value);
                    this.$message.success(`短信发送成功`);
                })
                .catch((value) => {
                    console.log(value);
                });
        },
        diffPWD() {
            return this.rePWD == this.newPWD || "重复密码不一致";
        },
        updatePhone() {
            this.formHasErrors = false;
            if (
                this.form.telephone == "" ||
                !/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,6,7,8]|8[0-9]|9[1,8,9])\d{8}$/.test(
                    this.form.telephone
                )
            ) {
                this.formHasErrors = true;
                this.$refs["telephone"].validate(true);
            }
            if (this.Vcode == "") {
                this.formHasErrors = true;
                this.$refs["vcode"].validate(true);
            }
            if (!this.formHasErrors) {
                let f = {
                    code: this.Vcode,
                    phone:this.form.telephone
                };
                changePhone(f).then(() => {
                    this.$message.success(`修改信息成功`);
                    this.$router.go(0);
                });
            }
        },
        changePWD() {
            if (
                this.newPWD == "" ||
                this.newPWD.length < 6 ||
                this.newPWD != this.rePWD
            ) {
                this.$message.error("新密码格式有误");
                this.$refs["pwd"].validate(true);
                this.$refs["repwd"].validate(true);
            } else {
                changePWD({ password: this.newPWD }).then(() => {
                    this.$message.success("修改密码成功");
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.center {
    text-align: center;
}
.left {
    text-align: left;
}

.major-row {
    margin: 16px 0px 24px 0px;
    color: black;
}
</style>