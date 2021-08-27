<template>
    <v-container>
        <v-card elevation="1">
            <v-card-title class="text-center py-6">
                疫情填报
            </v-card-title>
            <v-divider class="mx-4"></v-divider>
            <v-tabs
                v-model="tab"
                class="px-4"
                background-color="transparent"
                color="#00A0E8"
                grow
            >
                <v-tab
                    v-for="item in items"
                    :key="item"
                >
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card
                        color="basil"
                        flat
                    >
                        <v-card-text>
                            <v-row>
                                <v-col cols="9" sm="4" md="3" class="left body-1">
                                    <v-text-field
                                        label="体温"
                                        autocomplete="off"
                                        v-model="healthData.temperature"
                                        append-icon="mdi-temperature-celsius"
                                        :rules="[(v) => !!v || '不能为空',
                                        (v) => /((^3[4-9])(\.\d+)?|^(4[0-4])(\.0+)?)$/.test(v) || '格式错误']"
                                        ref="temperature"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="9"
                                       sm="4"
                                       md="3"
                                       offset-md="3"
                                       offset-sm="2"
                                       class="left body-1">
                                    <v-select
                                        :items="locationStatus"
                                        v-model="curStatus"
                                        outlined
                                        label="当前状态"
                                        :rules="[(v) => !!v || '不能为空']"
                                        ref="locationStatus"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="9" sm="4" md="3" class="left body-1">
                                    <v-file-input
                                        prepend-icon="mdi-camera"
                                        accept="image/*"
                                        label="上传健康码"
                                        :rules="[(v) => !!v || '不能为空']"
                                        v-model="healthData.healthPic"
                                        ref="healthPic"
                                    ></v-file-input>
                                </v-col>
                                <v-col cols="9"
                                       sm="4"
                                       md="3"
                                       offset-md="3"
                                       offset-sm="2"
                                       class="left body-1">
                                    <v-file-input
                                        prepend-icon="mdi-camera"
                                        accept="image/*"
                                        v-model="healthData.pathPic"
                                        :rules="[(v) => !!v || '不能为空']"
                                        label="上传行程码"
                                        ref="pathPic"
                                    ></v-file-input>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="9" sm="4" md="3" class="left body-1">
                                    <v-btn class="mt-2" @click="getLocation"  block>获取定位</v-btn>
                                </v-col>
                                <v-col cols="9"
                                       sm="4"
                                       md="3"
                                       offset-md="3"
                                       offset-sm="2"
                                       class="left body-1">
                                    <v-text-field
                                        label="定位"
                                        autocomplete="off"
                                        disabled
                                        v-model="address"
                                        :rules="[(v) => !!v || '不能为空']"
                                        ref="address"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="10" offset="1" sm="2" offset-sm="4">
                                    <v-btn block color="primary" @click="submit">
                                        确认提交信息
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card
                        color="basil"
                        flat
                    >
                        <v-card-text>234</v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
        <div id="map-container" style="display: none"></div>
    </v-container>
</template>

<script>
import {postHealthInfo} from '@/api/user.js'
export default {
    name: "report",
    data: () => ({
        tab: null,
        curStatus: '',
        items: [
            '信息填报', '填报记录',
        ],
        locationStatus: ["在家", "在校", "在游"],
        address:'',
        healthData: {
            temperature: '',
            healthPic: null,
            pathPic: null,

        }
    }),
    methods: {
        submit() {
            let flag=true
            for (let ref in this.$refs){
                flag &&=this.$refs[ref].validate(true)
            }
            if(flag){
                let formData=new FormData()
                formData.append('provinceName',this.healthData.provinceName)
                formData.append('cityName',this.healthData.cityName)
                formData.append('regionName',this.healthData.regionName)
                formData.append('address',this.healthData.address)
                formData.append('longitude',this.healthData.longitude)
                formData.append('latitude',this.healthData.latitude)
                formData.append('healthCodeScreenshot',this.healthData.healthPic)
                formData.append('travelCodeScreenshot',this.healthData.pathPic)
                formData.append('curStatus',this.locationStatus.indexOf(this.curStatus))
                formData.append('temperature',this.healthData.temperature)
                postHealthInfo(formData)
            }else{
                this.$message.error('请填写全部信息')
            }
        },
        getLocation() {
            const self = this
            var AMap = window.AMap
            AMap.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                })
                geolocation.getCurrentPosition()
                AMap.event.addListener(geolocation, 'complete', onComplete);
                AMap.event.addListener(geolocation, 'error', onError);
                function onComplete(data) {
                    if(data.formattedAddress){
                        self.healthData.provinceName = data.addressComponent.province
                        self.healthData.cityName = data.addressComponent.city
                        self.healthData.regionName = data.addressComponent.district
                        self.healthData.longitude=data.position.lng
                        self.healthData.longitude=data.position.lat
                        self.healthData.address=data.formattedAddress
                        self.address=data.formattedAddress
                    }else{
                        self.$message.error('定位失败错误,请开启浏览器定位权限')
                    }
                }
                function onError() {
                    self.$message.error('定位失败错误,请开启浏览器定位权限')
                }
            })
        },

    }
}
</script>

<style scoped lang="scss">
.left {
    text-align: left;
}
</style>