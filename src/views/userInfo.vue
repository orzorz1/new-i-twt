<template>
    <v-container>
        <v-card elevation="1">
            <v-card-title>基本资料</v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-card-text v-if="showSke">
                <v-row>
                    <v-col cols="12" sm="4" md="3">
                        <v-avatar tile color="blue" size="100">
                            <img
                                src="https://cdn.vuetifyjs.com/images/john.jpg"
                                alt="John"
                            />
                        </v-avatar>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="9" sm="4" md="3" align-self="center">
                        <v-file-input
                            :rules="rules"
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="选择头像"
                            prepend-icon="mdi-camera"
                            label="头像"
                        ></v-file-input>
                    </v-col>
                    <!-- <v-col cols="6" align-self="center">
                        <v-btn dense>更换头像</v-btn>
                    </v-col> -->
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="6" class="left body-1">
                        昵称：BenchBeach
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="left body-1">
                        姓名：高树韬
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="6" class="left body-1">
                        账号：3019244360
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="left body-1">
                        性别：男
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="6" class="left body-1">
                        学院：智能与计算学部
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="left body-1">
                        专业：计算机科学
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="9" sm="4" md="3" class="left body-1">
                        <v-text-field
                            label="手机"
                            autocomplete="off"
                            v-model="cellphone"
                            :rules="phoneRules"
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
                            label="邮箱"
                            autocomplete="off"
                            v-model="email"
                            :rules="emailRules"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="10" offset="1" sm="4" offset-sm="4">
                        <v-btn block color="primary"> 更新信息 </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-skeleton-loader
                v-else
                type="table-heading, list-item-two-line, list-item-three-line, list-item-two-line, list-item-three-line"
            ></v-skeleton-loader>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "userInfo",
    data: () => ({
        cellphone: "13662110876",
        email: "1779227906@qq.com",
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
        showSke:false
    }),
    mounted(){
        setTimeout(()=>{this.showSke=true},2000)
    }
};
</script>

<style lang="scss" scoped>
.center {
    text-align: center;
}
.left {
    text-align: left;
}
</style>