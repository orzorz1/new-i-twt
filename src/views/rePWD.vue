<template>
    <v-card>
        <v-card-title>{{
            userInfo == null ? "重置密码" : "基本资料"
        }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text v-if="!userInfo">
            <v-row justify="center">
                <v-col cols="12" sm="3">
                    <v-textarea
                        autocomplete="off"
                        label="学工号"
                        auto-grow
                        outlined
                        rows="1"
                        row-height="15"
                        v-model="num"
                        dense
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="12" sm="3">
                    <v-btn color="primary" @click="getInfo(num)" block
                        >查询用户信息</v-btn
                    >
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-text v-else>
            <v-row>
                <v-col cols="9" sm="4" md="3" class="left body-1">
                    <v-text-field
                        label="学工号"
                        autocomplete="off"
                        v-model="userInfo.userNumber"
                        disabled
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
                        label="姓名"
                        autocomplete="off"
                        v-model="userInfo.realname"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="9" sm="4" md="3" class="left body-1">
                    <v-select
                        v-model="userInfo.campus"
                        :items="allCampus"
                        item-text="name"
                        item-value="name"
                        label="校区"
                        outlined
                        dense
                    ></v-select>
                </v-col>
                <v-col
                    cols="9"
                    sm="4"
                    md="3"
                    offset-md="3"
                    offset-sm="2"
                    class="left body-1"
                >
                    <v-select
                        v-model="userInfo.stuType"
                        :items="allType"
                        item-text="name"
                        item-value="name"
                        label="用户类型"
                        outlined
                        dense
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="9" sm="4" md="3" class="left body-1">
                    <v-select
                        v-model="userInfo.department"
                        :items="allDepartment"
                        item-text="name"
                        item-value="name"
                        label="学院"
                        outlined
                        dense
                    ></v-select>
                </v-col>
                <v-col
                    cols="9"
                    sm="4"
                    md="3"
                    offset-md="3"
                    offset-sm="2"
                    class="left body-1"
                >
                    <v-select
                        v-model="userInfo.major"
                        :items="majorBelongDepart"
                        item-text="name"
                        item-value="name"
                        label="专业"
                        outlined
                        dense
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="9" sm="4" md="3" class="left body-1">
                    <v-btn block color="primary" @click="changeInfo">
                        修改用户信息
                    </v-btn>
                </v-col>
                <v-col
                    cols="9"
                    sm="4"
                    md="3"
                    offset-md="3"
                    offset-sm="2"
                    class="left body-1"
                >
                    <v-btn block color="error" @click="handle">
                        重置密码为666666
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import { rePWD, getInfoByNum, getDepartmentAll, getAllMajor } from "@/api/user";
import { resetInfo } from '@/api/admin';
export default {
    name: "rePWD",
    data: () => ({
        num: "",
        userInfo: null,
        allType: [
            {
                name: "博士研究生",
                id: "1",
            },
            {
                name: "硕士研究生",
                id: "2",
            },
            {
                name: "本科生",
                id: "3",
            },
            {
                name: "留学生",
                id: "6",
            },
            {
                name: "教职工",
                id: "11",
            },
        ],
        allDepartment: [],
        allMajor: [],
        allCampus: [{ name: "北洋园校区" }, { name: "卫津路校区" }],
    }),
    methods: {
        handle() {
            rePWD({ userNumber: this.num }).then((res) => {
                this.$message.success(res.message);
            });
            this.$router.go(0)
        },
        getInfo(num) {
            if (num == "") {
                this.$message.error("请输入学号");
            } else {
                getInfoByNum(num).then((res) => {
                    if (res.result == null) {
                        this.$message.error("查询不到");
                    } else {
                        this.userInfo = res.result;
                    }
                });
            }
        },
        changeInfo() {
            let o = {
                userNumber: this.num,
                realname: this.userInfo.realname,
                campus: this.userInfo.campus,
            };
            this.allType.forEach((ele) => {
                if (ele.name == this.userInfo.stuType) {
                    o.stuType = ele.id;
                }
            });
            this.allDepartment.forEach((ele) => {
                if (ele.name == this.userInfo.department) {
                    o.departmentId = ele.id;
                }
            });
            this.allMajor.forEach((ele) => {
                if (ele.name == this.userInfo.major) {
                    o.majorId = ele.id;
                }
            });
            console.log(o)
            resetInfo(o).then((res)=>{
                this.$message.success(res.message)
            })
        },
    },
    created() {
        // getInfoByNum("3019244360").then((res) => {
        //     if (res.result == null) {
        //         this.$message.error("查询不到");
        //     } else {
        //         this.userInfo = res.result;
        //     }
        // });
        getDepartmentAll().then((res) => {
            this.allDepartment = res.result;
        });
        getAllMajor().then((res) => {
            this.allMajor = res.result;
        });
    },
    computed: {
        majorBelongDepart() {
            return this.allMajor.filter((ele) => {
                return ele.departmentName == this.userInfo.department;
            });
        },
    },
};
</script>

<style>
</style>
